const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Routes mapped to controller functions
router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
