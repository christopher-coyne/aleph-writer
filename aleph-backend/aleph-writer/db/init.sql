-- init.sql for PostgreSQL

-- Drop tables if they exist, for a clean initialization
DROP TABLE IF EXISTS user_books CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS books CASCADE;

-- Create the 'users' table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Create the 'books' table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  subdivisions INTEGER NOT NULL,
  subdivision_name VARCHAR(50) NOT NULL,
  dynamo_links TEXT
);

-- Create the 'user_books' table to manage the many-to-many relationship
CREATE TABLE user_books (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, book_id)
);
