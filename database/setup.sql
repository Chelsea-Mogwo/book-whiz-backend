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
	book_image VARCHAR(500),
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
	(book_name, book_author, book_year, book_genre, book_description, book_image)
VALUES
	('Pride and Prejudice', 'Jane Austen', '1813', 'Romance', 'A novel that deals with the issues of class, marriage, and manners.', 'https://almabooks.com/wp-content/uploads/2016/10/9781847493699.jpg'),
	('To Kill a Mockingbird', 'Harper Lee', '1960', 'Historical Fiction', 'A novel set in the American South during the 1930s, tackling racism and moral growth.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/1200px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'),
	('1984', 'George Orwell', '1949', 'Dystopian', 'A dystopian novel about a future totalitarian regime.', 'https://i0.wp.com/www.printmag.com/wp-content/uploads/2017/01/2a34d8_a6741e88335241308890543d203ad89dmv2.jpg?resize=500%2C815&ssl=1'),
	('Moby Dick', 'Herman Melville', '1851', 'Adventure', 'A tale of Captain Ahab''s obsessive hunt for the white whale.', 'https://m.media-amazon.com/images/I/91DhazpQXML._AC_UF894,1000_QL80_.jpg'),
	('War and Peace', 'Leo Tolstoy', '1869', 'Historical Fiction', 'An epic about Russia''s wars with Napoleon.', 'https://m.media-amazon.com/images/I/51s4UBf-y8L._AC_UF894,1000_QL80_.jpg'),
	('The Great Gatsby', 'F. Scott Fitzgerald', '1925', 'Literary Fiction', 'A critique of the American Dream during the Jazz Age.', 'https://m.media-amazon.com/images/I/71Qh5So-YZL._AC_UF894,1000_QL80_.jpg'),
	('Crime and Punishment', 'Fyodor Dostoevsky', '1866', 'Psychological Fiction', 'An exploration of morality and redemption.', 'https://m.media-amazon.com/images/I/A193gO2P8WL._AC_UF894,1000_QL80_.jpg'),
	('The Odyssey', 'Homer', '-800', 'Epic', 'An ancient Greek epic about Odysseus'' journey home from the Trojan War.', 'https://m.media-amazon.com/images/I/71VoFhh11hL._AC_UF894,1000_QL80_.jpg'),
	('Ulysses', 'James Joyce', '1922', 'Modernist', 'A complex modernist novel set in Dublin.', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg'),
	('Brave New World', 'Aldous Huxley', '1932', 'Dystopian', 'A vision of a dystopian future society based on technological control.', 'https://m.media-amazon.com/images/I/91D4YvdC0dL._AC_UF894,1000_QL80_.jpg'),
	('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '1967', 'Magical Realism', 'A magical realist tale of the Buendía family.', 'https://m.media-amazon.com/images/I/91nvDu7Zi7L._AC_UF894,1000_QL80_.jpg'),
	('The Catcher in the Rye', 'J.D. Salinger', '1951', 'Literary Fiction', 'A novel about teenage angst and alienation.', 'https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg'),
	('The Brothers Karamazov', 'Fyodor Dostoevsky', '1880', 'Psychological Fiction', 'A philosophical novel about faith, doubt, and morality.', 'https://cdn.kobo.com/book-images/561f9624-ba0a-43dc-a569-dac6327e3804/1200/1200/False/the-brothers-karamazov-233.jpg'),
	('Anna Karenina', 'Leo Tolstoy', '1877', 'Romance', 'A tragic love story set against the backdrop of Russian society.', 'https://www.readandcobooks.co.uk/wp-content/uploads/anna-karenina-tolstoy-9781528718196-cover.jpg'),
	('The Adventures of Huckleberry Finn', 'Mark Twain', '1884', 'Adventure', 'A story of a boy and a runaway slave journeying down the Mississippi.', 'https://m.media-amazon.com/images/I/51E7yd+G-cL.jpg'),
	('Les Misérables', 'Victor Hugo', '1862', 'Historical Fiction', 'A tale of redemption set in post-revolutionary France.', 'Les Misérables', 'https://francetoday.com/wp-content/uploads/2022/03/51JEItnoKFL.jpg'),
	('The Grapes of Wrath', 'John Steinbeck', '1939', 'Historical Fiction', 'A novel about a family''s journey during the Great Depression.', 'https://upload.wikimedia.org/wikipedia/commons/a/ad/The_Grapes_of_Wrath_%281939_1st_ed_cover%29.jpg'),
	('Madame Bovary', 'Gustave Flaubert', '1857', 'Literary Fiction', 'A novel about a provincial wife who seeks escape from her boring life through affairs and living beyond her means.', 'https://pimlicoprints.com/cdn/shop/products/Madame_bovary_small.jpg?v=1611848897'),
	('Wuthering Heights', 'Emily Bronte', '1847', 'Gothic Fiction', 'A gothic tale of love and revenge on the Yorkshire moors.', 'https://pictures.abebooks.com/inventory/18441067444.jpg'),
	('The Divine Comedy', 'Dante Alighieri', '1320', 'Epic', 'An epic journey through Hell, Purgatory, and Paradise.', 'https://m.media-amazon.com/images/I/71QF0B+yZFL._AC_UF894,1000_QL80_.jpg');


INSERT INTO users
 (username, password) VALUES ('admin', 'jkljkl');

 INSERT INTO tokens
 (user_id, token) VALUES (1, 'predefined_admin_token');
