DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(20) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    food_pref TEXT
);

