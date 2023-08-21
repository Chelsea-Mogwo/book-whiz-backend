const db = require('../database/connect')

class Borrowed_Book {

    constructor ({ book_id, user_id, due_date, overdue}) {
        this.book_id = book_id;
        this.user_id = user_id;
        this.due_date = due_date;
        this.overdue = overdue;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM borrowed_books;")
        if (response.rows.length === 0) {
            throw new Error("No books are borrowed.")
        }
        return response.rows.map(g => new Borrowed_Book(g))
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM borrowed_books WHERE book_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate borrowed book.")
        }
        return new Borrowed_Book(response.rows[0]);
    }

    static async create(data) {
        const { book_id, user_id, due_date} = data;
    
    
        const response = await db.query('INSERT INTO borrowed_books (book_id, user_id, due_date) VALUES ($1, $2, $3) RETURNING *;', [book_id, user_id, due_date]);
    
        return new Borrowed_Book(response.rows[0]);
    }

    async update(data) {
        const {user_id: user_id, due_date: due_date, overdue: overdue} = data;
        const response = await db.query("UPDATE borrowed_books SET user_id = $1, due_date = $2, overdue = $3 WHERE book_id = $4 RETURNING *;", [user_id, due_date, overdue, this.book_id])

        if (response.rows.length != 1) {
            throw new Error("Unable to update book.")
        }

        return new Borrowed_Book(response.rows[0]);
    }

    async deleteById() {
        try {
            await db.query("DELETE FROM borrowed_books WHERE book_id = $1", [this.book_id]);
            return { success: true, message: 'borrowed book deleted successfully.'} 
        } catch (error) {
            throw new Error('This id does not match an entry')
        }
    }

}



module.exports = Borrowed_Book;
