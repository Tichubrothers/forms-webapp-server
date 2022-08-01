/* 
//Open terminal and connect to postgreSQL
$ psql -U postgres

// shows list of dbs
$ \l

*/
CREATE DATABASE formsUsers;

/*
//connect to database
$ \c formswebapp

//display tables
$ \dt

//decribe table
$ \d

*/

CREATE TABLE users(
    forms_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(255)
);

ALTER TABLE users
ADD COLUMN name VARCHAR(255);

INSERT INTO users (forms_id, firstname, lastname, email, password, gender)
VALUES (3, 'Millie Bobby', 'Brown', 'eleven@subscribe.com', 'hg495gn9', 'female');


SELECT * FROM users;