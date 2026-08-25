const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Writing } = require('../models/Schemas');

// GET /api/writing
router.get('/', async (req, res) => {
  try {
    if (isUsingFallback()) {
      const db = getLocalDb();
      return res.json(db.writing || []);
    }
    const articles = await Writing.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching writing entries', error: error.message });
  }
});

// POST /api/writing (Admin Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, excerpt, date, readTime, link, content } = req.body;
    if (!title || !excerpt) {
      return res.status(400).json({ message: 'Title and Excerpt are required.' });
    }

    const defaultDate = date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
    const defaultReadTime = readTime || '5 MIN READ';

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.writing) db.writing = [];

      const newArticle = {
        _id: 'w_' + Date.now(),
        title,
        excerpt,
        date: defaultDate,
        readTime: defaultReadTime,
        link: link || '#',
        content: content || ''
      };
      db.writing.unshift(newArticle);
      saveLocalDb(db);
      return res.status(201).json(newArticle);
    }

    const article = await Writing.create({
      title,
      excerpt,
      date: defaultDate,
      readTime: defaultReadTime,
      link: link || '#',
      content: content || ''
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error creating writing entry', error: error.message });
  }
});

// PUT /api/writing/:id (Admin Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.writing) db.writing = [];
      const index = db.writing.findIndex(w => String(w._id) === id);
      if (index === -1) return res.status(404).json({ message: 'Writing entry not found' });

      db.writing[index] = { ...db.writing[index], ...updateData };
      saveLocalDb(db);
      return res.json(db.writing[index]);
    }

    const article = await Writing.findByIdAndUpdate(id, updateData, { new: true });
    if (!article) return res.status(404).json({ message: 'Writing entry not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error updating writing entry', error: error.message });
  }
});

// DELETE /api/writing/:id (Admin Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.writing) db.writing = [];
      db.writing = db.writing.filter(w => String(w._id) !== id);
      saveLocalDb(db);
      return res.json({ message: 'Writing entry deleted successfully' });
    }

    const article = await Writing.findByIdAndDelete(id);
    if (!article) return res.status(404).json({ message: 'Writing entry not found' });
    res.json({ message: 'Writing entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting writing entry', error: error.message });
  }
});

module.exports = router;
