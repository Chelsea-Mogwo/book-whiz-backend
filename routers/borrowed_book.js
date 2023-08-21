const { Router } = require('express');


const borrowedBookRouter = Router();
const borrowedBookController = require('../controllers/borrowed_book.js');


borrowedBookRouter.get('/', borrowedBookController.index);
borrowedBookRouter.get('/:id', borrowedBookController.show);
borrowedBookRouter.post('/', borrowedBookController.create);
borrowedBookRouter.patch('/:id', borrowedBookController.update)
borrowedBookRouter.delete('/:id', borrowedBookController.destroy);

module.exports = borrowedBookRouter;