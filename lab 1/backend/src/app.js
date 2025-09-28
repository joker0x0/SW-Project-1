require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");


const app = express();

// middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todosdb';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running. Use /api/todos' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
