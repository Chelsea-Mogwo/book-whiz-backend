const db = require('../database/connect')

class Book {

    constructor ({ book_id, book_name, book_description, genre, section, checked_out, user_id, due_date, overdue}) {
        this.id = book_id;
        this.name = book_name;
        this.description = book_description;
        this.genre = genre;
        this.section = section;
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
        const { name: book_name, description: book_description, genre: genre} = data;
    
        const response = await db.query('INSERT INTO books (book_name, book_description, genre) VALUES ($1, $2, $3) RETURNING *;', [book_name, book_description, genre]);
    
        return new Book(response.rows[0]);
    }

    async update(data) {
        const { name: book_name, description: book_description, genre: genre} = data;
        const response = await db.query("UPDATE books SET book_name = $1, book_description = $2, genre = $3 WHERE book_id = $4 RETURNING *;", [book_name, book_description, genre, this.id])

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


// test work

module.exports = Book;
