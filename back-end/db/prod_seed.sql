-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY, 
--     name VARCHAR(20) NOT NULL,
--     lastName VARCHAR(20) NOT NULL,
--     phoneNumber VARCHAR(20),
--     gender VARCHAR(20),
--     email TEXT UNIQUE NOT NULL,
--     dateOfBirth DATE,
--     description TEXT,
--     food_pref VARCHAR(50) DEFAULT NULL,
--     password VARCHAR(255) NOT NULL,
--     uid SERIAL NOT NULL,
--     photo VARCHAR(255)
-- );


-- \c encanto_dev;

-- INSERT INTO users (name, lastName, phoneNumber, gender, email, dateOfBirth, description, food_pref, password, photo) VALUES
-- ('phoebe','rodriguez','7182073555', 'female', 'phoebe@gmail.com',' 1989-12-07', 'she is very fun','vegan', '123', NULL);
-- -- ('monica', 'monica@gmail.com', 'french', '123'),
-- -- ('rachel', 'rachel@gmail.com', 'japanese', '123'),
-- -- ('emily', 'emily@gmail.com', 'english', '123'),
-- -- ('janice', 'janice@gmail.com', 'caribbean', '123'),
-- -- ('ross', 'ross@gmail.com', 'american', '123'),
-- -- ('chandler', 'chandler@gmail.com', 'chinese', '123'),
-- -- ('joey', 'joey@gmail.com', 'italian', '123'),
-- -- ('mike', 'mike@gmail.com', 'american', '123');

-- INSERT INTO match_requests (request_from, request_to, request_status, date_created, date_accepted) VALUES (1, 2, 0, '2022-06-12 15:00:00', '2022-06-12 16:00:00');

-- -- INSERT INTO match_requests (request_from, request_to) VALUES (10, 11);

--     -- id SERIAL PRIMARY KEY, 
--     -- name VARCHAR(20) NOT NULL,
--     -- lastName VARCHAR(20) NOT NULL,
--     -- phoneNumber VARCHAR(20),
--     -- gender VARCHAR(20),
--     -- email TEXT UNIQUE NOT NULL,
--     -- dateOfBirth DATE,
--     -- description TEXT,
--     -- food_pref VARCHAR(50) DEFAULT NULL,
--     -- password VARCHAR(255) NOT NULL,
--     -- uid SERIAL NOT NULL,
--     -- photo VARCHAR(255)