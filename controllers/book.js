const Book = require("../models/book.js")


async function index (req, res) {
    try {
        const books = await Book.getAll()
        res.status(200).json(books)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const book = await Book.getOneById(id);
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}


async function create (req, res) {
    try {
        const data = req.body
        const newBook = await Book.create(data)
        res.status(201).json(newBook)
    } catch (err) {
        res.status(400).json({ error: err.message} )
    }
}

async function update (req, res) {
    try {
        const data = req.body
        const id = parseInt(req.params.id)
        const bookToUpdate = await Book.getOneById(id)
        
        if (!bookToUpdate) {
            return res.status(404).send({ message: 'Book not found' });
        }

        const result = await bookToUpdate.update(data);
        res.status(200).json(result);

    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const bookToDelete = await Book.getOneById(id)
        await bookToDelete.deleteById(id)
        res.status(204).send({ message: 'Book deleted!' })
    } catch (error) {
      res.status(404).send({ error: error.message });
  }
}

async function showGenre (req, res) {
    try {
        const keyword = req.params.keyword.toLowerCase()
        const entry = await Book.getByGenre(keyword);
        res.status(200).json(entry);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

async function search (req, res) {
    try {
        const keyword = req.params.keyword.toLowerCase()
        const entry = await Book.getByTitleOrAuthor(keyword);
        res.status(200).json(entry);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}

async function randomBook (req, res) {
    try {
        const randomBook = await Book.getRandom()
        console.log('hello');
        res.status(200).json(randomBook);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}



module.exports = {
    index, show, create, update, destroy, showGenre, search, randomBook
}
