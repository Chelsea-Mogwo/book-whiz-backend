const { Router } = require('express');

const authenticator = require('../middleware/admin_authenticator.js')


const adminRouter = Router();
const adminController = require('../controllers/book.js');

// Admin routes
adminRouter.get('/', authenticator, adminController.index);
adminRouter.post('/books/', adminController.create);
adminRouter.patch('/books/:id', adminController.update);
adminRouter.delete('/books/:id', adminController.destroy);

module.exports = adminRouter;
