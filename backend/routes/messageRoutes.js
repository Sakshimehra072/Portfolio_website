const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { Message } = require('../models/Schemas');

// POST /api/messages (Public Contact Form Submission)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message content are required.' });
    }

    if (isUsingFallback()) {
      const db = getLocalDb();
      const newMsg = {
        _id: 'msg_' + Date.now(),
        name,
        email,
        subject: subject || 'No Subject',
        message,
        createdAt: new Date().toISOString()
      };
      if (!db.messages) db.messages = [];
      db.messages.unshift(newMsg);
      saveLocalDb(db);
      return res.status(201).json({ message: 'Message sent successfully!', data: newMsg });
    }

    const msg = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully!', data: msg });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});

// GET /api/messages (Admin view all messages)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (isUsingFallback()) {
      const db = getLocalDb();
      return res.json(db.messages || []);
    }
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// DELETE /api/messages/:id (Admin delete message)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingFallback()) {
      const db = getLocalDb();
      if (db.messages) {
        db.messages = db.messages.filter(m => String(m._id) !== id);
        saveLocalDb(db);
      }
      return res.json({ message: 'Message deleted successfully' });
    }

    await Message.findByIdAndDelete(id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
});

module.exports = router;
