CREATE VIEW vw_picture_details AS
SELECT
 p.id,
 p.name,
 p.release_date,
 p.duration,
 string_agg(DISTINCT cc.name, ', ')     AS countries,
 string_agg(DISTINCT pt.type, ', ')     AS picture_types,
 ROUND(AVG(r.value)::numeric, 1)        AS avg_rating
FROM pictures p
 LEFT JOIN countries ct         ON ct.picture_id = p.id
 LEFT JOIN countries_catalog cc ON cc.country    = ct.country
 LEFT JOIN picture_types pt     ON pt.picture_id = p.id
 LEFT JOIN ratings r            ON r.picture_id  = p.id
GROUP BY p.id, p.name, p.release_date, p.duration;


CREATE VIEW vw_person_filmography AS
SELECT
 per.id              AS person_id,
 per.name || ' ' || per.second_name AS person_name,
 par.role,
 pic.id              AS picture_id,
 pic.name            AS picture_name,
 pic.release_date
FROM persons per
JOIN participations par    ON par.person_id = per.id
JOIN pictures pic          ON pic.id = par.picture_id
ORDER BY per.id, pic.release_date;


CREATE VIEW vw_user_watch_history AS
SELECT
 u.id        AS user_id,
 u.name      AS user_name,
 wh.picture_id,
 wh.watch_date,
 wh.timestamp,
 wh.watch_count
FROM users u
JOIN watch_history wh ON wh.user_id = u.id
ORDER BY u.id, wh.watch_date;


CREATE VIEW vw_critic_reviews AS
SELECT
 r.id       AS review_id,
 u.name     AS critic_name,
 p.name     AS picture_name,
 r.review_date,
 r.grade,
 r.text
FROM reviews r
JOIN users u    ON u.id = r.user_id
JOIN pictures p ON p.id = r.picture_id
WHERE EXISTS (
 SELECT 1
 FROM users_roles ur
 WHERE ur.user_id = u.id AND ur.role = 'CRITIC'
);
