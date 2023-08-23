const Borrowed_Book = require("../models/borrowed_book")


async function index (req, res) {
    try {
        const borrowed_books = await Borrowed_Book.getAll()
        res.status(200).json(borrowed_books)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const borrowed_book = await Borrowed_Book.getOneById(id);
        res.status(200).json(borrowed_book);
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}


async function create (req, res) {
    try {
        const data = req.body
        const newBorrowedBook = await Borrowed_Book.create(data)
        res.status(201).json(newBorrowedBook)
    } catch (err) {
        res.status(400).json({ error: err.message} )
    }
}

async function update (req, res) {
    try {
        const data = req.body
        const id = parseInt(req.params.id)
        const borrowedBookToUpdate = await Borrowed_Book.getOneById(id)
        
        if (!borrowedBookToUpdate) {
            return res.status(404).send({ message: 'Borrowed Book not found' });
        }

        const result = await borrowedBookToUpdate.update(data);
        res.status(200).json(result);

    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const borrowedBookToDelete = await Borrowed_Book.getOneById(id)
        await borrowedBookToDelete.deleteById(id)
        res.status(204).send({ message: 'Borrowed Book deleted!' })
    } catch (error) {
      res.status(404).send({ error: error.message });
  }
}


module.exports = {
    index, show, create, update, destroy
}
