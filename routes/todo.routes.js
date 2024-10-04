const express = require('express');
const Todo = require('../models/todo.model');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/todos', authMiddleware, async (req, res) => {
  const { title, description, isPublic } = req.body;
  const userId = req.userId;

  try {
    const todo = new Todo({
      title,
      description,
      isPublic,
      userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

// Other routes...

module.exports = router;
