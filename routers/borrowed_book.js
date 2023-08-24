const { Router } = require('express');

const authenticator = require('../middleware/user_authenticator.js')

const borrowedBookRouter = Router();
const borrowedBookController = require('../controllers/borrowed_book.js');

// User routes
borrowedBookRouter.get('/', authenticator, borrowedBookController.index);
borrowedBookRouter.get('/:id', borrowedBookController.show);
borrowedBookRouter.post('/', borrowedBookController.create);

module.exports = borrowedBookRouter;
