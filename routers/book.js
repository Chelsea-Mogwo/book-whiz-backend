const { Router } = require('express');


const bookRouter = Router();
const bookController = require('../controllers/book.js');


bookRouter.get('/', bookController.index);
bookRouter.get('/:id', bookController.show);
bookRouter.post('/', bookController.create);
bookRouter.patch('/:id', bookController.update)
bookRouter.delete('/:id', bookController.destroy);

module.exports = bookRouter;
