const express = require('express');
const Router = express.Router();

const userController = require('../controllers/userController');
const userValidations = require('../validations/userValidations');
const authMiddleware = require('../middlewares/verifyAuthentication');

Router.get('/', authMiddleware.verifyAuth, userController.index);

Router.get('/:id', authMiddleware.verifyAuth, userController.oneUser);

Router.put('/:id', authMiddleware.verifyAuth, userValidations.verifyUpdate, userController.updateUser);

Router.put('/:id/nickname', authMiddleware.verifyAuth, userValidations.verifyNickname,  userController.updateNickname);

Router.delete('/:id', userValidations.verifyDelete, authMiddleware.verifyAuth, userController.deleteUser);

module.exports = Router;
