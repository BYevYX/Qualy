CREATE TABLE pictures_archive (
    id                          INTEGER NOT NULL,
    name                        VARCHAR(100) NOT NULL,
    original_name               VARCHAR(100) NOT NULL,
    release_date                DATE NOT NULL,
    description                 VARCHAR(500) NOT NULL,
    duration                    INTEGER,
    start_timestamp             INTEGER,
    end_timestamp               INTEGER,
    post_credits_scene_timestamp INTEGER,
    operation_type              TEXT NOT NULL CHECK (operation_type IN ('DELETE', 'TRUNCATE')),
    deleted_at                  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_by                  TEXT DEFAULT current_user,
   
    CONSTRAINT pk_pictures_archive PRIMARY KEY (id, deleted_at)
);


CREATE OR REPLACE FUNCTION archive_deleted_picture()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO pictures_archive (
        id, name, original_name, release_date, description,
        duration, start_timestamp, end_timestamp, post_credits_scene_timestamp,
        operation_type
    ) VALUES (
        OLD.id, OLD.name, OLD.original_name, OLD.release_date, OLD.description,
        OLD.duration, OLD.start_timestamp, OLD.end_timestamp, OLD.post_credits_scene_timestamp,
        'DELETE'
    );
   
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION archive_truncated_pictures()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO pictures_archive (
        id, name, original_name, release_date, description,
        duration, start_timestamp, end_timestamp, post_credits_scene_timestamp,
        operation_type
    )
    SELECT
        id, name, original_name, release_date, description,
        duration, start_timestamp, end_timestamp, post_credits_scene_timestamp,
        'TRUNCATE'
    FROM pictures;
   
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_archive_picture
BEFORE DELETE ON pictures
FOR EACH ROW
EXECUTE FUNCTION archive_deleted_picture();


CREATE TRIGGER tr_archive_truncate_pictures
BEFORE TRUNCATE ON pictures
FOR EACH STATEMENT
EXECUTE FUNCTION archive_truncated_pictures();


-- users
CREATE TABLE users_archive (
    id                          CHAR(36) NOT NULL,
    name                        VARCHAR(100) NOT NULL,
    email                       VARCHAR(100) NOT NULL,
    password                    VARCHAR(256) NOT NULL,
    birthdate                   DATE NOT NULL,
    operation_type              TEXT NOT NULL CHECK (operation_type IN ('DELETE', 'TRUNCATE')),
    deleted_at                  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_by                  TEXT DEFAULT current_user,
   
    CONSTRAINT pk_users_archive PRIMARY KEY (id, deleted_at)
);


CREATE OR REPLACE FUNCTION archive_deleted_users()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users_archive (
        id, name, email, password, birthdate,
        operation_type
    ) VALUES (
        OLD.id, OLD.name, OLD.email, OLD.password, OLD.birthdate,
        'DELETE'
    );
   
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION archive_truncated_users()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users_archive (
        id, name, email, password, birthdate,
        operation_type
    )
    SELECT
        id, name, email, password, birthdate,
        'TRUNCATE'
    FROM users;
   
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_archive_user
BEFORE DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION archive_deleted_users();


CREATE TRIGGER tr_archive_truncate_users
BEFORE TRUNCATE ON users
FOR EACH STATEMENT
EXECUTE FUNCTION archive_truncated_users();


-- В таблице pictures если поле release_date < current_date то поля start_timestamp, end_timestamp, duration должны быть определены


CREATE OR REPLACE FUNCTION validate_timestamps_on_release()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.release_date < CURRENT_DATE THEN
        IF NEW.duration IS NULL OR NEW.start_timestamp IS NULL OR NEW.end_timestamp IS NULL THEN
            RAISE EXCEPTION
                'Для релиза в прошлом (release_date < текущей даты) все поля duration, start_timestamp и end_timestamp должны быть определены';
        END IF;
    END IF;
   
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_validate_timestamps_on_release
BEFORE INSERT OR UPDATE ON pictures
FOR EACH ROW
EXECUTE FUNCTION validate_timestamps_on_release();


-- В таблице watch_history поле timestamp должно быть <= поля duration в таблицце pictures,
-- а также если timestamp >= полю end_timestamp в таблицце pictures то поле watch_count должно увеличиться


CREATE OR REPLACE FUNCTION update_watch_count()
RETURNS TRIGGER AS $$
DECLARE
    v_duration INTEGER;
    v_end_timestamp INTEGER;
BEGIN
    SELECT duration, end_timestamp INTO v_duration, v_end_timestamp
    FROM pictures
    WHERE id = NEW.picture_id;


    IF v_duration IS NOT NULL AND NEW.timestamp > v_duration THEN
        RAISE EXCEPTION 'timestamp % превышает duration % для картины %',
              NEW.timestamp, v_duration, NEW.picture_id;
    END IF;
   
    IF v_end_timestamp IS NOT NULL AND NEW.timestamp >= v_end_timestamp THEN
        NEW.watch_count := COALESCE(OLD.watch_count, 0) + 1;
    END IF;
   
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_update_watch_count
BEFORE INSERT OR UPDATE OF timestamp ON watch_history
FOR EACH ROW
EXECUTE FUNCTION update_watch_count();


-- данные из таблицы watch_history при обновлении илли удалении попадпают в архив
CREATE TABLE watch_history_archive (
    archive_id      SERIAL PRIMARY KEY,
    user_id         CHAR(36) NOT NULL,
    picture_id      INTEGER NOT NULL,
    watch_date      TIMESTAMP NOT NULL,
    timestamp       INTEGER NOT NULL,
    watch_count     INTEGER NOT NULL,
    operation_type  VARCHAR(10) NOT NULL CHECK (operation_type IN ('INSERT', 'UPDATE', 'DELETE')),
    changed_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    changed_by      TEXT DEFAULT current_user
);


CREATE OR REPLACE FUNCTION archive_watch_history()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO watch_history_archive (
            user_id, picture_id, watch_date, timestamp, watch_count, operation_type
        ) VALUES (
            OLD.user_id, OLD.picture_id, OLD.watch_date, OLD.timestamp, OLD.watch_count, 'DELETE'
        );
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO watch_history_archive (
            user_id, picture_id, watch_date, timestamp, watch_count, operation_type
        ) VALUES (
            OLD.user_id, OLD.picture_id, OLD.watch_date, OLD.timestamp, OLD.watch_count, 'UPDATE'
        );
        RETURN NEW;
    END IF;
   
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_archive_watch_history_all_changes
BEFORE UPDATE OR DELETE ON watch_history
FOR EACH ROW
EXECUTE FUNCTION archive_watch_history();


-- рецензии могут оставлять только пользователи с ролью CRITIC
CREATE OR REPLACE FUNCTION check_critic_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users
        WHERE id = NEW.user_id AND role = 'CRITIC'
    ) THEN
        RAISE EXCEPTION 'Только пользователи с ролью CRITIC могут оставлять отзывы. User ID: %', NEW.user_id;
    END IF;
   
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_check_critic_on_insert
BEFORE INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION check_critic_role();

-- триггер только на UPDATE user_id
CREATE TRIGGER tr_check_critic_on_update
BEFORE UPDATE OF user_id ON reviews
FOR EACH ROW
EXECUTE FUNCTION check_critic_role();

CREATE OR REPLACE FUNCTION validate_against_now()
  RETURNS trigger
  LANGUAGE plpgsql
AS $$
DECLARE
  is_ok   boolean;
  col     text := TG_ARGV[0];
  kind    text := TG_ARGV[1];  -- 'date' или 'timestamp'
  op      text := TG_ARGV[2];  -- '<' или '<='
  now_expr text;
BEGIN
  now_expr := CASE kind
                WHEN 'date'      THEN 'CURRENT_DATE'
                ELSE                  'CURRENT_TIMESTAMP'
              END;

  EXECUTE format(
    'SELECT ($1).%I %s %s',
    col, op, now_expr
  )
  INTO is_ok
  USING NEW;

  IF NOT is_ok THEN
    RAISE EXCEPTION
      'Значение поля "%" должно быть %s %s',
      col,
      CASE op WHEN '<'  THEN 'раньше' ELSE 'не позже' END,
      now_expr;
  END IF;

  RETURN NEW;
END;
$$;


-- Триггер на users.birthdate  < CURRENT_DATE
CREATE TRIGGER trg_users_birthdate
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION validate_against_now('birthdate', 'date', '<');


-- Триггер на persons.birthdate  < CURRENT_DATE
CREATE TRIGGER trg_persons_birthdate
  BEFORE INSERT OR UPDATE ON persons
  FOR EACH ROW
  EXECUTE FUNCTION validate_against_now('birthdate', 'date', '<');


-- Триггер на persons.death_date  < CURRENT_DATE (NULL-пропускается)
CREATE TRIGGER trg_persons_death_date
  BEFORE INSERT OR UPDATE ON persons
  FOR EACH ROW
  EXECUTE FUNCTION validate_against_now('death_date', 'date', '<');


-- Триггер на persons_awards.award_presentation_date  <= CURRENT_DATE
CREATE TRIGGER trg_persons_awards_date
  BEFORE INSERT OR UPDATE ON persons_awards
  FOR EACH ROW
  EXECUTE FUNCTION validate_against_now('award_presentation_date', 'date', '<=');


-- Триггер на watch_history.watch_date  <= CURRENT_TIMESTAMP
CREATE TRIGGER trg_watch_history_date
  BEFORE INSERT OR UPDATE ON watch_history
  FOR EACH ROW
  EXECUTE FUNCTION validate_against_now('watch_date', 'timestamp', '<=');


-- Триггер на reviews.review_date  <= CURRENT_DATE
CREATE TRIGGER trg_reviews_date
  BEFORE INSERT OR UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION validate_against_now('review_date', 'date', '<=');


-- Триггер на grades.rating_date  <= CURRENT_TIMESTAMP
CREATE TRIGGER trg_grades_date
  BEFORE INSERT OR UPDATE ON grades
  FOR EACH ROW
  EXECUTE FUNCTION validate_against_now('rating_date', 'timestamp', '<=');
