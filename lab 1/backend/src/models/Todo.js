const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Todo', todoSchema);
