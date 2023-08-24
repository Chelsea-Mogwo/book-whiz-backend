const { Router } = require('express');

const authenticator = require('../middleware/admin_authenticator.js')

const adminRouter = Router();
const adminController = require('../controllers/borrowed_book.js');

// Admin routes
adminRouter.get('/', authenticator, adminController.index);
adminRouter.get('/borrow', adminController.show);
adminRouter.delete('/borrow/:id', adminController.destroy);

adminRouter.get('/:id', adminController.show);
adminRouter.post('/', adminController.create);
adminRouter.patch('/:id', adminController.update);
adminRouter.delete('/:id', adminController.destroy);

module.exports = adminRouter;
