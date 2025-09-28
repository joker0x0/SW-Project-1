const mongoose = require('mongoose');
const Todo = require('../models/Todo');

// Create a new todo
exports.createTodo = async (req, res, next) => {
  try {
    const { title, done } = req.body;
    const todo = new Todo({ title, done });
    const saved = await todo.save();
    return res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'ValidationError', details: err.message });
    }
    next(err);
  }
};

// Get all todos
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return res.json(todos);
  } catch (err) {
    next(err);
  }
};

// Update a todo
exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const update = {};
    if (req.body.title !== undefined) update.title = req.body.title;
    if (req.body.done !== undefined) update.done = req.body.done;

    const options = { new: true, runValidators: true };
    const updated = await Todo.findByIdAndUpdate(id, update, options);

    if (!updated) return res.status(404).json({ error: 'Todo not found' });

    return res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'ValidationError', details: err.message });
    }
    next(err);
  }
};

// Delete a todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });

    return res.json({ message: 'Todo deleted', id: deleted._id });
  } catch (err) {
    next(err);
  }
};
