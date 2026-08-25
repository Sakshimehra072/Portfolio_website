const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Education } = require('../models/Schemas');

// GET /api/education
router.get('/', async (req, res) => {
  try {
    if (isUsingFallback()) {
      const db = getLocalDb();
      return res.json(db.education || []);
    }
    const edu = await Education.find().sort({ createdAt: -1 });
    res.json(edu);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education entries', error: error.message });
  }
});

// POST /api/education (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { degree, institution, location, duration, details } = req.body;
    if (!degree || !institution || !duration) {
      return res.status(400).json({ message: 'Degree, Institution, and Duration are required.' });
    }

    if (isUsingFallback()) {
      const db = getLocalDb();
      const newEdu = {
        _id: 'edu_' + Date.now(),
        degree,
        institution,
        location: location || '',
        duration,
        details: details || ''
      };
      db.education.unshift(newEdu);
      saveLocalDb(db);
      return res.status(201).json(newEdu);
    }

    const edu = await Education.create({ degree, institution, location, duration, details });
    res.status(201).json(edu);
  } catch (error) {
    res.status(500).json({ message: 'Error creating education entry', error: error.message });
  }
});

// PUT /api/education/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isUsingFallback()) {
      const db = getLocalDb();
      const index = db.education.findIndex(e => String(e._id) === id);
      if (index === -1) return res.status(404).json({ message: 'Education entry not found' });

      db.education[index] = { ...db.education[index], ...updateData };
      saveLocalDb(db);
      return res.json(db.education[index]);
    }

    const edu = await Education.findByIdAndUpdate(id, updateData, { new: true });
    if (!edu) return res.status(404).json({ message: 'Education entry not found' });
    res.json(edu);
  } catch (error) {
    res.status(500).json({ message: 'Error updating education entry', error: error.message });
  }
});

// DELETE /api/education/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const db = getLocalDb();
      db.education = db.education.filter(e => String(e._id) !== id);
      saveLocalDb(db);
      return res.json({ message: 'Education entry deleted successfully' });
    }

    await Education.findByIdAndDelete(id);
    res.json({ message: 'Education entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting education entry', error: error.message });
  }
});

module.exports = router;
