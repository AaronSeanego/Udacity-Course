/* Replace with your SQL commands */

-- CREATE TABLE IF NOT EXISTS book (
-- 	id SERIAL PRIMARY KEY,
-- 	title VARCHAR(255) NOT NULL,
-- 	author VARCHAR(255) NOT NULL,
-- 	total_pages INT NOT NULL,
-- 	type VARCHAR(255) NOT NULL,
-- 	summary VARCHAR(255) NOT NULL
-- );

-- INSERT INTO book (title, author, total_pages, type, summary) VALUES ('Lord Of The Flies','Man',200,'novel','This is a good book');
-- SELECT * FROM book WHERE author LIKE '%an%';

-- DROP DATABASE IF EXISTS storefront_db;

/*Create the database with the query below*/
-- CREATE DATABASE storefront_db
--     WITH
--     OWNER = "Lapi"
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_South Africa.1252'
--     LC_CTYPE = 'English_South Africa.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- CREATE DATABASE storefront_test_db
--     WITH
--     OWNER = "Lapi"
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_South Africa.1252'
--     LC_CTYPE = 'English_South Africa.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

/*Create table users with the query below*/
-- CREATE TABLE IF NOT EXISTS users
-- (
--     id integer SERIAL PRIMARY KEY,
--     username character varying(200),
--     password character varying(200),
--     email character varying(200),
--     CONSTRAINT users_pkey PRIMARY KEY (id)
-- )

-- CREATE TABLE users_test
-- (
--     id SERIAL PRIMARY KEY,
--     username character varying(200),
--     password character varying(200),
--     email character varying(200),
--     CONSTRAINT users_pkey PRIMARY KEY (id)
-- )

CREATE TABLE users_test (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
);

/*Create table store_items*/
-- CREATE TABLE IF NOT EXISTS store_items
-- (
--     id integer SERIAL PRIMARY KEY,
--     item_name character varying(200),
--     item_description character varying(1000),
--     CONSTRAINT store_items_pkey PRIMARY KEY (id),
--     CONSTRAINT store_items_id_fkey FOREIGN KEY (id)
--         REFERENCES users (id) MATCH SIMPLE
--         ON UPDATE NO ACTION
--         ON DELETE NO ACTION
-- )

-- CREATE TABLE store_items_test
-- (
--     id SERIAL PRIMARY KEY,
--     item_name character varying(200),
--     item_description character varying(1000),
--     CONSTRAINT store_items_pkey PRIMARY KEY (id),
--     CONSTRAINT store_items_id_fkey FOREIGN KEY (id)
--         REFERENCES users (id) MATCH SIMPLE
--         ON UPDATE NO ACTION
--         ON DELETE NO ACTION
-- )

CREATE TABLE store_items_test (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255),
    item_description VARCHAR(1000)
);


INSERT INTO users_test (username, password, email) VALUES ('Alpha01','alpha12345','alpha01@example.com');
INSERT INTO users_test (username, password, email) VALUES ('Beta01','beta12345','beta01@example.com');
INSERT INTO users_test (username, password, email) VALUES ('Charlie01','charlie12345','charlie01@example.com');
INSERT INTO users_test (username, password, email) VALUES ('Delta01','delta12345','delta01@example.com');
INSERT INTO users_test (username, password, email) VALUES ('Echo01','echo12345','echo01@example.com');


INSERT INTo store_items_test (item_name, item_description) VALUES ('Apple','A green fruit');
INSERT INTo store_items_test (item_name, item_description) VALUES ('Banana','A yellow fruit');
INSERT INTo store_items_test (item_name, item_description) VALUES ('Coconut','A tropical fruit');
INSERT INTo store_items_test (item_name, item_description) VALUES ('Donut','A backed cockie');
INSERT INTo store_items_test (item_name, item_description) VALUES ('Egg','A nice stuff');