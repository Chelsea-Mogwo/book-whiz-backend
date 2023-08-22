const { Router } = require('express');

const authenticator = require('../middleware/admin_authenticator.js')

const adminRouter = Router();
const adminController = require('../controllers/book.js');

// Admin routes
adminRouter.get('/', authenticator, adminController.index);
adminRouter.get('/:id', authenticator, adminController.show);
adminRouter.post('/books/', authenticator, adminController.create);
adminRouter.patch('/books/:id', authenticator, adminController.update);
adminRouter.delete('/books/:id', authenticator, adminController.destroy);

module.exports = adminRouter;
