const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Project } = require('../models/Schemas');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    if (isUsingFallback()) {
      const db = getLocalDb();
      return res.json(db.projects || []);
    }
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// POST /api/projects (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, image, tags, category, github, demo, featured } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and Description are required.' });
    }

    const processedTags = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []);

    if (isUsingFallback()) {
      const db = getLocalDb();
      const newProject = {
        _id: 'proj_' + Date.now(),
        title,
        description,
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        tags: processedTags,
        category: category || 'Full Stack',
        github: github || '',
        demo: demo || '',
        featured: Boolean(featured)
      };
      db.projects.unshift(newProject);
      saveLocalDb(db);
      return res.status(201).json(newProject);
    }

    const project = await Project.create({
      title,
      description,
      image,
      tags: processedTags,
      category,
      github,
      demo,
      featured
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// PUT /api/projects/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => t.trim());
    }

    if (isUsingFallback()) {
      const db = getLocalDb();
      const index = db.projects.findIndex(p => String(p._id) === id);
      if (index === -1) return res.status(404).json({ message: 'Project not found' });

      db.projects[index] = { ...db.projects[index], ...updateData };
      saveLocalDb(db);
      return res.json(db.projects[index]);
    }

    const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// DELETE /api/projects/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const db = getLocalDb();
      db.projects = db.projects.filter(p => String(p._id) !== id);
      saveLocalDb(db);
      return res.json({ message: 'Project deleted successfully' });
    }

    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router;
