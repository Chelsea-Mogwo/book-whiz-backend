const db = require('../database/connect')

class Borrowed_Book {

    constructor ({ book_id, user_id, checked_out, due_date, overdue}) {
        this.id = book_id;
        this.user = user_id;
        this.checked_out = checked_out;
        this.due_date = due_date;
        this.overdue = overdue;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM borrowed_books;")
        if (response.rows.length === 0) {
            throw new Error("No books available.")
        }
        return response.rows.map(g => new Book(g))
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM borrowed_books WHERE book_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate borrowed book.")
        }
        return new Book(response.rows[0]);
    }

    static async create(data) {
        const { id: book_id, user_id: user_id, checked_out: checked_out, due_date: due_date, overdue: overdue } = data;
    
        const response = await db.query('INSERT INTO borrowed_books (book_id, user_id, checked_out, due_date, overdue) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [book_id, user_id, checked_out, due_date, overdue]);
    
        return new Book(response.rows[0]);
    }

    async update(data) {
        const {user_id: user_id, checked_out: checked_out, due_date: due_date, overdue: overdue} = data;
        const response = await db.query("UPDATE borrowed_books SET user_id = $1, checked_out = $2, due_date = $3, overdue = $4 WHERE book_id = $5 RETURNING *;", [user_id, checked_out, due_date, overdue, this.id])

        if (response.rows.length != 1) {
            throw new Error("Unable to update book.")
        }

        return new Book(response.rows[0]);
    }

    async deleteById() {
        try {
            await db.query("DELETE FROM borrwed_books WHERE book_id = $1", [this.id]);
            return { success: true, message: 'borrowed book deleted successfully.'} 
        } catch (error) {
            throw new Error('This id does not match an entry')
        }
    }

}



module.exports = Borrowed_Book;
