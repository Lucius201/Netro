CREATE TABLE IF NOT EXISTS users
(
    id         SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name  VARCHAR(100),
    email      VARCHAR(100) UNIQUE NOT NULL,
    password   VARCHAR(100)        NOT NULL
);

INSERT INTO users (first_name, last_name, email, password)
VALUES ('Lucius', 'Lechner', 'lucius@example.com', '$2b$10$07CttOqOLWHX.MX9k7Wzsu9o0pVWZ8tfr2U1B7NcZ7bqhQuus/Xta'),
       ('Johann', 'Flögel', 'johann@example.com', '$2b$10$07CttOqOLWHX.MX9k7Wzsu9o0pVWZ8tfr2U1B7NcZ7bqhQuus/Xta'),
       ('Atussa', 'Mehrawari', 'atussa@example.com', '$2b$10$07CttOqOLWHX.MX9k7Wzsu9o0pVWZ8tfr2U1B7NcZ7bqhQuus/Xta');
