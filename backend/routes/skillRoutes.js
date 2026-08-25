const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Skill } = require('../models/Schemas');

// GET /api/skills
router.get('/', async (req, res) => {
  try {
    const db = getLocalDb();
    if (isUsingFallback()) {
      return res.json(db.skills || []);
    }
    const skills = await Skill.find().sort({ createdAt: -1 });
    if (skills && skills.length > 0) {
      return res.json(skills);
    }
    return res.json(db.skills || []);
  } catch (error) {
    const db = getLocalDb();
    res.json(db.skills || []);
  }
});

// POST /api/skills (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, category, proficiency, icon } = req.body;
    if (!name || !category) {
      return res.status(400).json({ message: 'Name and Category are required.' });
    }

    const db = getLocalDb();
    db.skills = db.skills || [];

    const parsedProficiency = (proficiency !== undefined && proficiency !== null && proficiency !== '')
      ? Number(proficiency)
      : null;

    const newSkillData = {
      _id: 'skill_' + Date.now(),
      name,
      category,
      proficiency: parsedProficiency,
      icon: icon || ''
    };

    let resultSkill = newSkillData;

    if (!isUsingFallback()) {
      try {
        const mongoSkill = await Skill.create({
          name,
          category,
          proficiency: parsedProficiency,
          icon: icon || ''
        });
        resultSkill = mongoSkill.toObject ? mongoSkill.toObject() : mongoSkill;
      } catch (err) {
        console.error('Mongoose create skill warning:', err.message);
      }
    }

    db.skills.unshift(resultSkill);
    saveLocalDb(db);

    return res.status(201).json(resultSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
});

// PUT /api/skills/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const db = getLocalDb();
    db.skills = db.skills || [];
    const index = db.skills.findIndex(s => String(s._id) === id);

    let updatedSkill = null;

    if (!isUsingFallback()) {
      try {
        const skill = await Skill.findByIdAndUpdate(id, updateData, { new: true });
        if (skill) {
          updatedSkill = skill.toObject ? skill.toObject() : skill;
        }
      } catch (err) {
        console.error('Mongoose update skill warning:', err.message);
      }
    }

    if (index !== -1) {
      db.skills[index] = { ...db.skills[index], ...updateData, ...(updatedSkill || {}) };
      updatedSkill = db.skills[index];
    } else if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    saveLocalDb(db);
    return res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
});

// DELETE /api/skills/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const db = getLocalDb();
    db.skills = (db.skills || []).filter(s => String(s._id) !== id);
    saveLocalDb(db);

    if (!isUsingFallback()) {
      try {
        await Skill.findByIdAndDelete(id);
      } catch (err) {
        console.error('Mongoose delete skill warning:', err.message);
      }
    }

    return res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
});

module.exports = router;
