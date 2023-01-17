const express = require('express');
const Router = express.Router();

const authController = require('../controllers/authController');
const authValidations = require('../validations/authValidations');
const authMiddleware = require('../middlewares/verifyAuthentication');

Router.post('/login', authValidations.validateLogin, authController.login);

Router.post('/register', authValidations.validateRegister, authController.register); 

Router.post('/change-password/:id', authMiddleware.verifyAuth, authValidations.validateChangePass, authController.updatePassword);

Router.get('/logout', authMiddleware.verifyAuth, authController.logout);

module.exports = Router;
