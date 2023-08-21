DROP TABLE IF EXISTS borrowed_books;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);

CREATE TABLE books (
	book_id INT GENERATED ALWAYS AS IDENTITY,
	book_name VARCHAR(70) UNIQUE NOT NULL,
	book_author VARCHAR(50) NOT NULL,
	book_year VARCHAR(4),
	book_genre VARCHAR(500),
	book_description VARCHAR(500),
	PRIMARY KEY (book_id)
);


CREATE TABLE borrowed_books (
    book_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    due_date TIMESTAMP,
    overdue BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (book_id) REFERENCES books("book_id"),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);

INSERT INTO books 
	(book_name, book_author, book_year, book_genre, book_description)
VALUES
	('Pride and Prejudice', 'Jane Austen', '1813', 'Romance', 'A novel that deals with the issues of class, marriage, and manners.'),
	('To Kill a Mockingbird', 'Harper Lee', '1960', 'Historical Fiction', 'A novel set in the American South during the 1930s, tackling racism and moral growth.'),
	('1984', 'George Orwell', '1949', 'Dystopian', 'A dystopian novel about a future totalitarian regime.'),
	('Moby Dick', 'Herman Melville', '1851', 'Adventure', 'A tale of Captain Ahab''s obsessive hunt for the white whale.'),
	('War and Peace', 'Leo Tolstoy', '1869', 'Historical Fiction', 'An epic about Russia''s wars with Napoleon.'),
	('The Great Gatsby', 'F. Scott Fitzgerald', '1925', 'Literary Fiction', 'A critique of the American Dream during the Jazz Age.'),
	('Crime and Punishment', 'Fyodor Dostoevsky', '1866', 'Psychological Fiction', 'An exploration of morality and redemption.'),
	('The Odyssey', 'Homer', '-800', 'Epic', 'An ancient Greek epic about Odysseus'' journey home from the Trojan War.'),
	('Ulysses', 'James Joyce', '1922', 'Modernist', 'A complex modernist novel set in Dublin.'),
	('Brave New World', 'Aldous Huxley', '1932', 'Dystopian', 'A vision of a dystopian future society based on technological control.'),
	('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '1967', 'Magical Realism', 'A magical realist tale of the Buendía family.'),
	('The Catcher in the Rye', 'J.D. Salinger', '1951', 'Literary Fiction', 'A novel about teenage angst and alienation.'),
	('The Brothers Karamazov', 'Fyodor Dostoevsky', '1880', 'Psychological Fiction', 'A philosophical novel about faith, doubt, and morality.'),
	('Anna Karenina', 'Leo Tolstoy', '1877', 'Romance', 'A tragic love story set against the backdrop of Russian society.'),
	('The Adventures of Huckleberry Finn', 'Mark Twain', '1884', 'Adventure', 'A story of a boy and a runaway slave journeying down the Mississippi.'),
	('Les Misérables', 'Victor Hugo', '1862', 'Historical Fiction', 'A tale of redemption set in post-revolutionary France.'),
	('The Grapes of Wrath', 'John Steinbeck', '1939', 'Historical Fiction', 'A novel about a family''s journey during the Great Depression.'),
	('Madame Bovary', 'Gustave Flaubert', '1857', 'Literary Fiction', 'A novel about a provincial wife who seeks escape from her boring life through affairs and living beyond her means.'),
	('Wuthering Heights', 'Emily Bronte', '1847', 'Gothic Fiction', 'A gothic tale of love and revenge on the Yorkshire moors.'),
	('The Divine Comedy', 'Dante Alighieri', '1320', 'Epic', 'An epic journey through Hell, Purgatory, and Paradise.');
