const express = require('express');
const Router = express.Router();

const todoController = require('../controllers/todoController');
const todoValidations = require('../validations/todoValidations');
const authMiddleware = require('../middlewares/verifyAuthentication');

Router.get('/', authMiddleware.verifyAuth, todoController.todo_list);

Router.get('/:id', authMiddleware.verifyAuth, todoController.todo_listone);

Router.put('/:id', authMiddleware.verifyAuth, todoValidations.validateUpdate, todoController.todo_edit);

Router.delete('/:id', authMiddleware.verifyAuth, todoController.todo_delete);

Router.post('/create', authMiddleware.verifyAuth, todoValidations.validateCreate, todoController.todo_create);

module.exports = Router;
