const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Gallery } = require('../models/Schemas');

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    if (isUsingFallback()) {
      const db = getLocalDb();
      return res.json(db.gallery || []);
    }
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery items', error: error.message });
  }
});

// POST /api/gallery (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, image, caption } = req.body;
    if (!title || !image) {
      return res.status(400).json({ message: 'Title and Image are required.' });
    }

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.gallery) db.gallery = [];
      const newItem = {
        _id: 'g_' + Date.now(),
        title,
        image,
        caption: caption || ''
      };
      db.gallery.unshift(newItem);
      saveLocalDb(db);
      return res.status(201).json(newItem);
    }

    const item = await Gallery.create({ title, image, caption });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating gallery item', error: error.message });
  }
});

// PUT /api/gallery/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.gallery) db.gallery = [];
      const index = db.gallery.findIndex(g => String(g._id || g.id) === id);
      if (index === -1) return res.status(404).json({ message: 'Gallery item not found' });

      db.gallery[index] = { ...db.gallery[index], ...updateData };
      saveLocalDb(db);
      return res.json(db.gallery[index]);
    }

    const item = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gallery item', error: error.message });
  }
});

// DELETE /api/gallery/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.gallery) db.gallery = [];
      db.gallery = db.gallery.filter(g => String(g._id || g.id) !== id);
      saveLocalDb(db);
      return res.json({ message: 'Gallery item deleted successfully' });
    }

    await Gallery.findByIdAndDelete(id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
  }
});

module.exports = router;
