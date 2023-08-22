const { Router } = require('express');

// require user or admin authenticator


const borrowedBookRouter = Router();
const borrowedBookController = require('../controllers/borrowed_book.js');

// User routes
borrowedBookRouter.get('/', borrowedBookController.index);
borrowedBookRouter.get('/:id', borrowedBookController.show);
borrowedBookRouter.post('/', borrowedBookController.create);
borrowedBookRouter.patch('/:id', borrowedBookController.update)
borrowedBookRouter.delete('/:id', borrowedBookController.destroy);

module.exports = borrowedBookRouter;
