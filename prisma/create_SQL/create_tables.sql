CREATE TABLE countries_catalog (
    country CHAR(2) PRIMARY KEY,
    name    VARCHAR(80) NOT NULL
);


CREATE TABLE picture_types_catalog (
    type    VARCHAR(30) PRIMARY KEY
);


CREATE TABLE users_roles_catalog (
    role    VARCHAR(30) PRIMARY KEY
);


CREATE TABLE rating_origins_catalog (
    origin  VARCHAR(30) PRIMARY KEY
);


CREATE TABLE person_roles_catalog (
    role    VARCHAR(30) PRIMARY KEY
);


CREATE TABLE awards_catalog (
    award   VARCHAR(30) PRIMARY KEY
);


CREATE TABLE video_quality_catalog (
    quality VARCHAR(10) PRIMARY KEY
);


-------------------------->>> PICTURES <<<--------------------------
CREATE TABLE pictures (
    id                          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,


    name                        VARCHAR(100) NOT NULL,
    original_name               VARCHAR(100) NOT NULL,


    release_date                DATE NOT NULL,
    description                 VARCHAR(500) NOT NULL,


    duration                    INTEGER,


    start_timestamp             INTEGER CHECK (
                                    start_timestamp IS NULL OR
                                    duration IS NOT NULL AND
                                    start_timestamp >= 0 AND
                                    start_timestamp <= duration
                                ),


    end_timestamp                INTEGER CHECK (
                                    end_timestamp IS NULL OR
                                    duration IS NOT NULL AND
                                    end_timestamp >= 0 AND
                                    end_timestamp <= duration
                                 ),


    post_credits_scene_timestamp INTEGER CHECK (
                                    post_credits_scene_timestamp IS NULL OR
                                    duration IS NOT NULL AND
                                    post_credits_scene_timestamp >= 0 AND
                                    post_credits_scene_timestamp <= duration
                                 )
);

-------------------------->>> PERSONS <<<--------------------------
CREATE TABLE persons (
    id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    second_name  VARCHAR(100) NOT NULL,


    description  VARCHAR(500),
    photo_url    VARCHAR(300),


    birthdate    DATE NOT NULL,
    death_date   DATE CHECK (death_date IS NULL),




    country      CHAR(2) NOT NULL,
    town         VARCHAR(100) NOT NULL,
    height       INTEGER NOT NULL CHECK (
                                height >= 0 AND
                                height <= 300
                            ),


    CONSTRAINT FK_country FOREIGN KEY (country) REFERENCES countries_catalog
);


-------------------------->>> GENRES <<<--------------------------


CREATE TABLE genres (
    genre VARCHAR(30) PRIMARY KEY
);


-------------------------------------------------------------------------
-------------------------->>> PICTURE_TYPES <<<--------------------------
CREATE TABLE picture_types (
    type         VARCHAR(30) NOT NULL,
    picture_id   integer NOT NULL,


    CONSTRAINT FK_type FOREIGN KEY (type) REFERENCES picture_types_catalog,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);

ALTER TABLE picture_types
ADD PRIMARY KEY (type, picture_id);


-------------------------->>> POSTERS <<<--------------------------
CREATE TABLE posters (
    poster       VARCHAR(300) NOT NULL,
    picture_id   integer NOT NULL,


    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);

ALTER TABLE posters
ADD PRIMARY KEY (picture_id, poster);


-------------------------->>> COUNTRIES <<<--------------------------
CREATE TABLE countries (
    country      CHAR(2) NOT NULL,
    picture_id   INTEGER NOT NULL,


    CONSTRAINT FK_country FOREIGN KEY (country) REFERENCES countries_catalog,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);

ALTER TABLE countries
ADD PRIMARY KEY (country, picture_id);

-------------------------->>> RATINGS <<<--------------------------
CREATE TABLE ratings (
    origin       VARCHAR(30) NOT NULL,
    picture_id   INTEGER NOT NULL,
    value        NUMERIC(3, 1) NOT NULL CHECK (value >= 0 AND value <= 10),


    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures,
    CONSTRAINT PK_ratings PRIMARY KEY (picture_id, origin)
);


-------------------------->>> PARTICIPATIONS <<<--------------------------
CREATE TABLE participations (
    id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    picture_id   INTEGER NOT NULL,
    person_id    INTEGER NOT NULL,
    role         VARCHAR(30) NOT NULL,


    CONSTRAINT FK_person_id FOREIGN KEY (person_id) REFERENCES persons,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures,
    CONSTRAINT FK_role FOREIGN KEY (role) REFERENCES person_roles_catalog
);


-------------------------->>> CHARACTERS <<<--------------------------
CREATE TABLE characters (
    id                  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character           VARCHAR(100) NOT NULL,
    participation_id    INTEGER NOT NULL,


    CONSTRAINT FK_participation_id FOREIGN KEY (participation_id) REFERENCES participations
);


-------------------------->>> PERSONS_AWARDS <<<--------------------------
CREATE TABLE persons_awards (
    person_id                   INTEGER NOT NULL,
    picture_id                  INTEGER NOT NULL,
    award                       VARCHAR(30) NOT NULL,
    award_presentation_date     DATE NOT NULL,
    description                 VARCHAR(200) NOT NULL,


    CONSTRAINT FK_award FOREIGN KEY (award) REFERENCES awards_catalog,
    CONSTRAINT FK_person_id FOREIGN KEY (person_id) REFERENCES persons,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);

ALTER TABLE persons_awards
ADD id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY;


-------------------------->>> FAVORITE_PERSONS <<<--------------------------
CREATE TABLE favorite_persons (
    user_id      UUID NOT NULL,
    person_id    INTEGER NOT NULL,


    CONSTRAINT PK_favorite_persons PRIMARY KEY (user_id, person_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT FK_person_id FOREIGN KEY (person_id) REFERENCES persons
);


-------------------------->>> GENRES_LIST <<<--------------------------
CREATE TABLE genres_list (
    genre        CHAR(30) NOT NULL,
    picture_id   INTEGER NOT NULL,


    CONSTRAINT PK_genres_list PRIMARY KEY (genre, picture_id),
    CONSTRAINT FK_genre FOREIGN KEY (genre) REFERENCES genres,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);


-------------------------->>> FAVORITE_GENRES <<<--------------------------
CREATE TABLE favorite_genres (
    genre        CHAR(30) NOT NULL,
    user_id      UUID NOT NULL,


    CONSTRAINT PK_favorite_genres PRIMARY KEY (genre, user_id),
    CONSTRAINT FK_genre FOREIGN KEY (genre) REFERENCES genres,
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users
);


-------------------------->>> SETTINGS <<<--------------------------
CREATE TABLE settings (
    user_id             UUID PRIMARY KEY,
    theme               CHAR(1) NOT NULL DEFAULT 'S' CHECK (theme in ('D', 'L', 'S')),
    video_quality       VARCHAR(10) NOT NULL DEFAULT '1080p',
    data_saving         BOOLEAN NOT NULL DEFAULT TRUE,
    auto_skip_credits   BOOLEAN NOT NULL DEFAULT FALSE,
    auto_rotate_screen  BOOLEAN NOT NULL DEFAULT TRUE,
    vibration           BOOLEAN NOT NULL DEFAULT TRUE,


    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT FK_video_quality FOREIGN KEY (video_quality) REFERENCES video_quality_catalog


);


-------------------------->>> USERS_ROLES <<<--------------------------
CREATE TABLE users_roles (
    user_id      UUID NOT NULL,
    role         VARCHAR(30) NOT NULL DEFAULT 'USER',


    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT FK_role FOREIGN KEY (role) REFERENCES users_roles_catalog
);

ALTER TABLE users_roles
ADD PRIMARY KEY (role, user_id);

-------------------------->>> WATCH_HISTORY <<<--------------------------
CREATE TABLE watch_history (
    user_id      UUID NOT NULL,
    picture_id   INTEGER NOT NULL,
    watch_date   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    timestamp    INTEGER NOT NULL CHECK (timestamp >= 0),
    watch_count  INTEGER NOT NULL DEFAULT 1,


    CONSTRAINT PK_watch_history PRIMARY KEY (user_id, picture_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);


-------------------------->>> FEATURED <<<--------------------------
CREATE TABLE featured (
    user_id      UUID NOT NULL,
    picture_id   INTEGER NOT NULL,


    CONSTRAINT PK_featured PRIMARY KEY (user_id, picture_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);


-------------------------->>> REVIEWS <<<--------------------------
CREATE TABLE reviews (
    id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id      UUID NOT NULL,
    picture_id   INTEGER NOT NULL,
    review_date  DATE NOT NULL DEFAULT CURRENT_DATE,
    grade        NUMERIC(3, 1) NOT NULL CHECK (grade >= 0 AND grade <= 10),
    text         TEXT NOT NULL,


    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);


-------------------------->>> GRADES <<<--------------------------
CREATE TABLE grades (
    user_id      UUID NOT NULL,
    picture_id   INTEGER NOT NULL,
    value        NUMERIC(3, 1) NOT NULL CHECK (value >= 0 AND value <= 10),
    rating_date  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT PK_grades PRIMARY KEY (user_id, picture_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT FK_picture_id FOREIGN KEY (picture_id) REFERENCES pictures
);
