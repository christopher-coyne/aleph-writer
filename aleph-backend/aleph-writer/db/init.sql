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
  genre VARCHAR(255) NOT NULL,
  book_date VARCHAR(255) NOT NULL,
  book_length VARCHAR(255),
  subdivisions INTEGER NOT NULL,
  subdivision_name VARCHAR(255),
  dynamo_links TEXT,
  gutenberg_link VARCHAR(255)
);

-- Create the 'user_books' table to manage the many-to-many relationship
CREATE TABLE user_books (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, book_id)
);

-- Insert some sample books - these will be in the pre made library
-- plays
INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('King Lear', 'William Shakespeare', 'Drama', '1605', 'Five Acts', 5, 'Acts', 'http://example.com/dynamo-link', 'https://www.gutenberg.org/files/1532/1532-h/1532-h.htm');

INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('The Tragical History of Dr Faustus', 'Christopher Marlowe', 'Drama', '1592', NULL, 1, NULL, 'http://example.com/dynamo-link', 'https://www.gutenberg.org/files/779/779-h/779-h.htm');

INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('Oedipus', 'Sophocles', 'Drama', '430 BC', 'Three Acts', 3, 'Acts', 'http://example.com/dynamo-link', 'https://www.gutenberg.org/cache/epub/31/pg31-images.html');

-- poems & epics
INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('The Wasteland', 'T.S. Eliot', 'Modernist', '1922', 'Five Parts', 5, 'Parts', 'http://example.com/dynamo-link', 'https://www.gutenberg.org/cache/epub/1321/pg1321-images.html');

INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('The Odyssey', 'Homer', 'Epic Poem', '725 BC', '24 Books', 24, 'Books', 'http://example.com/dynamo-link', 'https://www.gutenberg.org/files/1727/1727-h/1727-h.htm');

INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('Beowulf', 'Unknown', 'Epic Poem', '700', '43 Books', 43, 'Books', 'http://example.com/dynamo-link', 'https://www.gutenberg.org/files/16328/16328-h/16328-h.htm');

-- novels
INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('Great Expectations', 'Charles Dickens', 'Fiction', '1861', '56 Chapters', 56, 'Chapters', 'http://example.com/dynamo-link', 'https://www.gutenberg.org/files/1400/1400-h/1400-h.htm');

INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('Moby Dick', 'Herman Melville', 'Fiction', '1851', '135 Chapters', 135, 'Chapters', 'http://example.com/dynamo-link', 'https://www.gutenberg.org/cache/epub/2701/pg2701-images.html');

INSERT INTO books (title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link) 
VALUES ('The Metamorphosis', 'Franz Kafka', 'Novel', '1915', NULL, 1, NULL, 'http://example.com/dynamo-link', 'https://www.gutenberg.org/files/5200/5200-h/5200-h.htm');