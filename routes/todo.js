const express = require('express');
const { create, read, removeTodo } = require('../controller/index');
const router = express.Router();

router.use((req, res, next) => {
    // Middleware logic goes here
    console.log('Middleware executed');
    next(); })

router.post('/todo/create', create);
router.delete('/post/:id',removeTodo);
router.get('/todos/',read)


module.exports = router;