DROP DATABASE IF EXISTS encanto_dev;
CREATE DATABASE encanto_dev;

\c encanto_dev;

DROP TABLE IF EXISTS test;

CREATE TABLE test (
    id SERIAL PRIMARY KEY, 
    name TEXT
);