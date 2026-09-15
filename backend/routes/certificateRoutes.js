const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Certificate } = require('../models/Schemas');

// GET /api/certificates
router.get('/', async (req, res) => {
  try {
    if (isUsingFallback()) {
      const db = getLocalDb();
      return res.json(db.certificates || []);
    }
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
});

// POST /api/certificates (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, organization, issueDate, description, link, file } = req.body;
    if (!name || !organization || !issueDate) {
      return res.status(400).json({ message: 'Certificate name, organization, and date are required.' });
    }

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.certificates) db.certificates = [];
      const newCert = {
        _id: 'cert_' + Date.now(),
        name,
        organization,
        issueDate,
        description: description || '',
        link: link || '',
        file: file || '',
        createdAt: new Date().toISOString()
      };
      db.certificates.unshift(newCert);
      saveLocalDb(db);
      return res.status(201).json(newCert);
    }

    const cert = await Certificate.create({
      name,
      organization,
      issueDate,
      description: description || '',
      link: link || '',
      file: file || ''
    });
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ message: 'Error creating certificate entry', error: error.message });
  }
});

// PUT /api/certificates/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.certificates) db.certificates = [];
      const index = db.certificates.findIndex(c => String(c._id) === id);
      if (index === -1) return res.status(404).json({ message: 'Certificate entry not found' });

      db.certificates[index] = { ...db.certificates[index], ...updateData };
      saveLocalDb(db);
      return res.json(db.certificates[index]);
    }

    const cert = await Certificate.findByIdAndUpdate(id, updateData, { new: true });
    if (!cert) return res.status(404).json({ message: 'Certificate entry not found' });
    res.json(cert);
  } catch (error) {
    res.status(500).json({ message: 'Error updating certificate entry', error: error.message });
  }
});

// DELETE /api/certificates/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (!db.certificates) db.certificates = [];
      db.certificates = db.certificates.filter(c => String(c._id) !== id);
      saveLocalDb(db);
      return res.json({ message: 'Certificate entry deleted successfully' });
    }

    await Certificate.findByIdAndDelete(id);
    res.json({ message: 'Certificate entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certificate entry', error: error.message });
  }
});

module.exports = router;
