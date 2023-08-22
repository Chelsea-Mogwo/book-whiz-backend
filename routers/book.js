const { Router } = require('express');



const bookRouter = Router();
const bookController = require('../controllers/book.js');

// Guest routes
bookRouter.get('/', bookController.index);
bookRouter.get('/:id', bookController.show);
bookRouter.get('/genre/:keyword', bookController.showGenre);
bookRouter.get('/search/:keyword', bookController.search);

module.exports = bookRouter;
