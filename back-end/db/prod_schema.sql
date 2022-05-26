DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS match_requests;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(20) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    food_pref VARCHAR(50) DEFAULT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE match_requests (
    id SERIAL PRIMARY KEY, 
    request_from INTEGER REFERENCES users (id) ON DELETE CASCADE,
    request_to INTEGER REFERENCES users (id) ON DELETE CASCADE,
    request_status INTEGER DEFAULT 0,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_accepted TIMESTAMP DEFAULT NULL
);


