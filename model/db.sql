-- CREATE TABLES --
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(100) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password varchar(255) UNIQUE NOT NULL,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    telephone varchar(15),
    address varchar(300)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(50) UNIQUE NOT NULL,
    category varchar(20),
    price integer, 
    num_in_stock varchar(20), 
    img varchar(60)
);

CREATE TABLE carts (
    id SERIAL,
    user_id integer REFERENCES users(id), 
    product_id integer REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    quantity integer
);

CREATE TABLE orders (
    id SERIAL,
    user_id integer REFERENCES users(id), 
    total_cost integer,
    date date,
    time time,
    payment_method varchar(20)
);