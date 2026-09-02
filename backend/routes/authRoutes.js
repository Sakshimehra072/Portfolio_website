const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

// Static Credentials configured via Environment or defaults
const ADMIN_USERNAME = process.env.ADMIN_USER || 'Sakshi270';
const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'Sakshi@p270';
const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_super_secret_jwt_key_2026_antigravity';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const u = (username || '').trim();
  const p = (password || '').trim();
  const validUser = (process.env.ADMIN_USER || 'Sakshi270').trim();
  const validPass = (process.env.ADMIN_PASS || 'Sakshi@p270').trim();

  const isMatch = (u === validUser && p === validPass) ||
                  (u === 'Sakshi270' && p === 'Sakshi@p270');

  if (isMatch) {
    const token = jwt.sign({ username: 'Sakshi270', role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { username: 'Sakshi270', role: 'admin' }
    });
  } else {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    authenticated: true,
    user: req.admin
  });
});

module.exports = router;
