const { Router } = require('express');

// require admin authenticator


const adminRouter = Router();
const adminController = require('../controllers/book.js');

// Admin routes
adminRouter.post('/books/', adminController.create);
adminRouter.patch('/books/:id', adminController.update);
adminRouter.delete('/books/:id', adminController.destroy);

module.exports = adminRouter;
