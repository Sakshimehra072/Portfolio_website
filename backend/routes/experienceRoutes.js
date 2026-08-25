const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Experience } = require('../models/Schemas');

// GET /api/experience
router.get('/', async (req, res) => {
  try {
    if (isUsingFallback()) {
      const db = getLocalDb();
      return res.json(db.experiences || []);
    }
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience entries', error: error.message });
  }
});

// POST /api/experience (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { role, company, location, duration, highlights } = req.body;
    if (!role || !company || !duration) {
      return res.status(400).json({ message: 'Role, Company, and Duration are required.' });
    }

    const processedHighlights = Array.isArray(highlights)
      ? highlights
      : (highlights ? highlights.split('\n').filter(Boolean) : []);

    if (isUsingFallback()) {
      const db = getLocalDb();
      const newExp = {
        _id: 'exp_' + Date.now(),
        role,
        company,
        location: location || '',
        duration,
        highlights: processedHighlights
      };
      db.experiences.unshift(newExp);
      saveLocalDb(db);
      return res.status(201).json(newExp);
    }

    const exp = await Experience.create({
      role,
      company,
      location,
      duration,
      highlights: processedHighlights
    });
    res.status(201).json(exp);
  } catch (error) {
    res.status(500).json({ message: 'Error creating experience entry', error: error.message });
  }
});

// PUT /api/experience/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.highlights && typeof updateData.highlights === 'string') {
      updateData.highlights = updateData.highlights.split('\n').filter(Boolean);
    }

    if (isUsingFallback()) {
      const db = getLocalDb();
      const index = db.experiences.findIndex(e => String(e._id) === id);
      if (index === -1) return res.status(404).json({ message: 'Experience entry not found' });

      db.experiences[index] = { ...db.experiences[index], ...updateData };
      saveLocalDb(db);
      return res.json(db.experiences[index]);
    }

    const exp = await Experience.findByIdAndUpdate(id, updateData, { new: true });
    if (!exp) return res.status(404).json({ message: 'Experience entry not found' });
    res.json(exp);
  } catch (error) {
    res.status(500).json({ message: 'Error updating experience entry', error: error.message });
  }
});

// DELETE /api/experience/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const db = getLocalDb();
      db.experiences = db.experiences.filter(e => String(e._id) !== id);
      saveLocalDb(db);
      return res.json({ message: 'Experience entry deleted successfully' });
    }

    await Experience.findByIdAndDelete(id);
    res.json({ message: 'Experience entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience entry', error: error.message });
  }
});

module.exports = router;
