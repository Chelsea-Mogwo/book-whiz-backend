const { Router } = require('express');

const authenticator = require('../middleware/user_authenticator.js')

const borrowedBookRouter = Router();
const borrowedBookController = require('../controllers/borrowed_book.js');

// User routes
borrowedBookRouter.get('/', authenticator, borrowedBookController.index);
borrowedBookRouter.get('/:id', authenticator, borrowedBookController.show);
borrowedBookRouter.post('/', authenticator, borrowedBookController.create);
borrowedBookRouter.patch('/:id', authenticator, borrowedBookController.update)
borrowedBookRouter.delete('/:id', authenticator, borrowedBookController.destroy);

module.exports = borrowedBookRouter;
