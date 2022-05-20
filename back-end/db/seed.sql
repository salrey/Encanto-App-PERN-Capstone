\c encanto_dev;

INSERT INTO users (name, email, food_pref, password) VALUES
('phoebe', 'phoebe@gmail.com', 'vegan', '123'),
('monica', 'monica@gmail.com', 'french', '123'),
('rachel', 'rachel@gmail.com', 'japanese', '123'),
('emily', 'emily@gmail.com', 'english', '123'),
('janice', 'janice@gmail.com', 'caribbean', '123'),
('ross', 'ross@gmail.com', 'american', '123'),
('chandler', 'chandler@gmail.com', 'chinese', '123'),
('joey', 'joey@gmail.com', 'italian', '123'),
('mike', 'mike@gmail.com', 'american', '123');

INSERT INTO match_requests (request_from, request_to, request_status, date_created, date_accepted) VALUES (1, 2, 0, '2022-06-12 15:00:00', '2022-06-12 16:00:00');