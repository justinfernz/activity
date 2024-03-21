const express = require('express');
const { create, read, removeTodo } = require('../controller/index');
require('dotenv').config();

const router = express.Router();

// Middleware function to log incoming requests
router.use((req, res, next) => {
    console.log('Middleware executed');
    next(); 
});

// Routes
router.post('/todo/create', create); // Endpoint to create a new todo
router.delete('/todo/:id', removeTodo); // Endpoint to delete a todo by ID
router.get('/todos', read); // Endpoint to get all todos

module.exports = router;

// Initialize Express app and use the router
const app = express();
app.use('/api', router); // Mount the router under the '/api' prefix

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 5000; // Use the PORT environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
