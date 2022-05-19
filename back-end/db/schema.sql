DROP DATABASE IF EXISTS encanto_dev;
CREATE DATABASE encanto_dev;

\c encanto_dev;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(20) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    food_pref VARCHAR(50) DEFAULT NULL,
    password VARCHAR(255) NOT NULL
);
