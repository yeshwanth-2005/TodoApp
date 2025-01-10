const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos
router.get('/todos', todoController.getTodos);

// Get a specific todo by ID
router.get('/todos/:id', todoController.getTodoById);

// Create a new todo
router.post('/todos', todoController.createTodo);

// Update an existing todo by ID
router.put('/todos/:id', todoController.updateTodoById);

// Delete a todo by ID
router.delete('/todos/:id', todoController.deleteTodoById);

module.exports = router;
