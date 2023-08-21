const db = require('../database/connect')

class Book {

    constructor ({ book_id, book_name, book_year, book_author, book_description, genre, checked_out, user_id, due_date, overdue}) {
        this.id = book_id;
        this.name = book_name;
        this.year = book_year;
        this.author = book_author;
        this.description = book_description;
        this.genre = genre;
        this.checked_out = checked_out;
        this.user_id = user_id;
        this.due_date = due_date;
        this.overdue = overdue;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM books;")
        if (response.rows.length === 0) {
            throw new Error("No books available.")
        }
        return response.rows.map(g => new Book(g))
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM books WHERE book_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate book.")
        }
        return new Book(response.rows[0]);
    }

    static async create(data) {
        const { name: book_name, year: book_year, author: book_author, description: book_description, genre: genre} = data;
    
        const response = await db.query('INSERT INTO books (book_name, book_year, book_author, book_description, genre) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [book_name, book_year, book_author, book_description, genre]);
    
        return new Book(response.rows[0]);
    }

    async update(data) {
        const { name: book_name, year: book_year, author: book_author, description: book_description, genre: genre} = data;
        const response = await db.query("UPDATE books SET book_name = $1, book_year = $2, book_author = $3, book_description = $4, genre = $5 WHERE book_id = $6 RETURNING *;", [book_name, book_year, book_author, book_description, genre, this.id])

        if (response.rows.length != 1) {
            throw new Error("Unable to update book.")
        }

        return new Book(response.rows[0]);
    }

    async deleteById() {
        try {
            await db.query("DELETE FROM books WHERE book_id = $1", [this.id]);
            return { success: true, message: 'book deleted successfully.'} 
        } catch (error) {
            throw new Error('This id does not match an entry')
        }
    }

}



module.exports = Book;
