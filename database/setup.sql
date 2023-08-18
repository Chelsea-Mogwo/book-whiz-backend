DROP TABLE IF EXISTS books;

CREATE TABLE books (
	book_id INT GENERATED ALWAYS AS IDENTITY,
	book_name VARCHAR(70) UNIQUE NOT NULL,
	book_description VARCHAR(500),
	genre VARCHAR(500),
	section VARCHAR(255),
	checked_out BOOLEAN DEFAULT FALSE,
	due_date TIMESTAMP,
	overdue BOOLEAN DEFAULT FALSE,
	user_details VARCHAR(30),
	PRIMARY KEY (book_id)
);

INSERT INTO books 
	(book_name, book_description, genre)
VALUES
	('Pride and Prejudice', 'A novel by Jane Austen that deals with the issues of class, marriage, and manners.', 'Romance'),
	('To Kill a Mockingbird', 'Harper Lee''s novel set in the American South during the 1930s, tackling racism and moral growth.', 'Historical Fiction'),
	('1984', 'George Orwell''s dystopian novel about a future totalitarian regime.', 'Dystopian'),
	('Moby Dick', 'Herman Melville''s tale of Captain Ahab''s obsessive hunt for the white whale.', 'Adventure'),
	('War and Peace', 'Leo Tolstoy''s epic about Russia''s wars with Napoleon.', 'Historical Fiction'),
	('The Great Gatsby', 'F. Scott Fitzgerald''s critique of the American Dream during the Jazz Age.', 'Literary Fiction'),
	('Crime and Punishment', 'Fyodor Dostoevsky''s exploration of morality and redemption.', 'Psychological Fiction'),
	('The Odyssey', 'Homer''s ancient Greek epic about Odysseus'' journey home from the Trojan War.', 'Epic'),
	('Ulysses', 'James Joyce''s complex modernist novel set in Dublin.', 'Modernist'),
	('Brave New World', 'Aldous Huxley''s vision of a dystopian future society based on technological control.', 'Dystopian'),
	('One Hundred Years of Solitude', 'Gabriel Garcia Marquez''s magical realist tale of the Buendía family.', 'Magical Realism'),
	('The Catcher in the Rye', 'J.D. Salinger''s novel about teenage angst and alienation.', 'Literary Fiction'),
	('The Brothers Karamazov', 'Dostoevsky''s philosophical novel about faith, doubt, and morality.', 'Psychological Fiction'),
	('Anna Karenina', 'Tolstoy''s tragic love story set against the backdrop of Russian society.', 'Romance'),
	('The Adventures of Huckleberry Finn', 'Mark Twain''s story of a boy and a runaway slave journeying down the Mississippi.', 'Adventure'),
	('Les Misérables', 'Victor Hugo''s tale of redemption set in post-revolutionary France.', 'Historical Fiction'),
	('The Grapes of Wrath', 'John Steinbeck''s novel about a family''s journey during the Great Depression.', 'Historical Fiction'),
	('Madame Bovary', 'Gustave Flaubert''s novel about a provincial wife who seeks escape from her boring life through affairs and living beyond her means.', 'Literary Fiction'),
	('Wuthering Heights', 'Emily Bronte''s gothic tale of love and revenge on the Yorkshire moors.', 'Gothic Fiction'),
	('The Divine Comedy', 'Dante Alighieri''s epic journey through Hell, Purgatory, and Paradise.', 'Epic');
