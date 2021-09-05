CREATE DATABASE perntodo;

CREATE TABLE todo(
    /* 
    SERIAL PRIMARY KEY ensures each key will be unique 
    (will be incremented by 1) 
    */
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);