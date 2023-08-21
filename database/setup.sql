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
	book_year VARCHAR(4),
	book_author VARCHAR(50) NOT NULL,
	book_description VARCHAR(500),
	genre VARCHAR(500),
	checked_out BOOLEAN DEFAULT FALSE,
	user_id INT,
	due_date TIMESTAMP,
	overdue BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (book_id),
	FOREIGN KEY (user_id) REFERENCES users("user_id")
);

INSERT INTO books 
	(book_name, book_author, book_year, book_description, genre)
VALUES
	('Pride and Prejudice', 'Jane Austen', '1813', 'A novel that deals with the issues of class, marriage, and manners.', 'Romance'),
	('To Kill a Mockingbird', 'Harper Lee', '1960', 'A novel set in the American South during the 1930s, tackling racism and moral growth.', 'Historical Fiction'),
	('1984', 'George Orwell', '1949', 'A dystopian novel about a future totalitarian regime.', 'Dystopian'),
	('Moby Dick', 'Herman Melville', '1851', 'A tale of Captain Ahab''s obsessive hunt for the white whale.', 'Adventure'),
	('War and Peace', 'Leo Tolstoy', '1869', 'An epic about Russia''s wars with Napoleon.', 'Historical Fiction'),
	('The Great Gatsby', 'F. Scott Fitzgerald', '1925', 'A critique of the American Dream during the Jazz Age.', 'Literary Fiction'),
	('Crime and Punishment', 'Fyodor Dostoevsky', '1866', 'An exploration of morality and redemption.', 'Psychological Fiction'),
	('The Odyssey', 'Homer', '-800', 'An ancient Greek epic about Odysseus'' journey home from the Trojan War.', 'Epic'),
	('Ulysses', 'James Joyce', '1922', 'A complex modernist novel set in Dublin.', 'Modernist'),
	('Brave New World', 'Aldous Huxley', '1932', 'A vision of a dystopian future society based on technological control.', 'Dystopian'),
	('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '1967', 'A magical realist tale of the Buendía family.', 'Magical Realism'),
	('The Catcher in the Rye', 'J.D. Salinger', '1951', 'A novel about teenage angst and alienation.', 'Literary Fiction'),
	('The Brothers Karamazov', 'Fyodor Dostoevsky', '1880', 'A philosophical novel about faith, doubt, and morality.', 'Psychological Fiction'),
	('Anna Karenina', 'Leo Tolstoy', '1877', 'A tragic love story set against the backdrop of Russian society.', 'Romance'),
	('The Adventures of Huckleberry Finn', 'Mark Twain', '1884', 'A story of a boy and a runaway slave journeying down the Mississippi.', 'Adventure'),
	('Les Misérables', 'Victor Hugo', '1862', 'A tale of redemption set in post-revolutionary France.', 'Historical Fiction'),
	('The Grapes of Wrath', 'John Steinbeck', '1939', 'A novel about a family''s journey during the Great Depression.', 'Historical Fiction'),
	('Madame Bovary', 'Gustave Flaubert', '1857', 'A novel about a provincial wife who seeks escape from her boring life through affairs and living beyond her means.', 'Literary Fiction'),
	('Wuthering Heights', 'Emily Bronte', '1847', 'A gothic tale of love and revenge on the Yorkshire moors.', 'Gothic Fiction'),
	('The Divine Comedy', 'Dante Alighieri', '1320', 'An epic journey through Hell, Purgatory, and Paradise.', 'Epic');
