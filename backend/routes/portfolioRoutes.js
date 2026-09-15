const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isUsingFallback, getLocalDb, saveLocalDb } = require('../config/db');
const { PersonalInfo, Skill, Project, Experience, Education, Writing, Gallery, Quote, Personal, Certificate } = require('../models/Schemas');

// GET /api/portfolio - Full Portfolio Data
router.get('/', async (req, res) => {
  try {
    const db = getLocalDb();

    if (isUsingFallback()) {
      return res.json({
        personalInfo: db.personalInfo,
        skills: db.skills,
        projects: db.projects,
        experiences: db.experiences,
        writing: db.writing || [],
        gallery: db.gallery || [],
        personal: db.personal || [],
        quote: db.quote || {},
        education: db.education,
        certificates: db.certificates || []
      });
    }

    let personalInfo = await PersonalInfo.findOne();
    let skills = await Skill.find().sort({ createdAt: -1 });
    let projects = await Project.find().sort({ createdAt: -1 });
    let experiences = await Experience.find().sort({ createdAt: -1 });
    let education = await Education.find().sort({ createdAt: -1 });
    let certificates = await Certificate.find().sort({ createdAt: -1 });
    let writing = await Writing.find().sort({ createdAt: -1 });
    let gallery = await Gallery.find().sort({ createdAt: -1 });
    let personal = await Personal.find().sort({ createdAt: -1 });
    let quoteDoc = await Quote.findOne();

    res.json({
      personalInfo: personalInfo || db.personalInfo,
      skills: (skills && skills.length > 0) ? skills : db.skills,
      projects: (projects && projects.length > 0) ? projects : db.projects,
      experiences: (experiences && experiences.length > 0) ? experiences : db.experiences,
      writing: (writing && writing.length > 0) ? writing : (db.writing || []),
      gallery: (gallery && gallery.length > 0) ? gallery : (db.gallery || []),
      personal: (personal && personal.length > 0) ? personal : (db.personal || []),
      quote: quoteDoc || db.quote || {},
      education: (education && education.length > 0) ? education : db.education,
      certificates: (certificates && certificates.length > 0) ? certificates : (db.certificates || [])
    });
  } catch (error) {
    const db = getLocalDb();
    res.json({
      personalInfo: db.personalInfo,
      skills: db.skills,
      projects: db.projects,
      experiences: db.experiences,
      writing: db.writing || [],
      gallery: db.gallery || [],
      personal: db.personal || [],
      quote: db.quote || {},
      education: db.education,
      certificates: db.certificates || []
    });
  }
});

// PUT /api/portfolio/info - Update Personal Info (Admin Protected)
router.put('/info', authMiddleware, async (req, res) => {
  try {
    const updatedInfo = req.body;

    const db = getLocalDb();
    db.personalInfo = { ...db.personalInfo, ...updatedInfo };
    saveLocalDb(db);

    if (!isUsingFallback()) {
      let infoDoc = await PersonalInfo.findOne();
      if (infoDoc) {
        Object.assign(infoDoc, updatedInfo);
        await infoDoc.save();
      } else {
        await PersonalInfo.create(updatedInfo);
      }
    }

    res.json({ message: 'Personal information updated successfully', personalInfo: db.personalInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error updating personal information', error: error.message });
  }
});

// PUT /api/portfolio/quote - Update Quote (Admin Protected)
router.put('/quote', authMiddleware, async (req, res) => {
  try {
    const { text, author } = req.body;

    const db = getLocalDb();
    db.quote = { text, author };
    saveLocalDb(db);

    if (!isUsingFallback()) {
      let quoteDoc = await Quote.findOne();
      if (quoteDoc) {
        quoteDoc.text = text;
        quoteDoc.author = author;
        await quoteDoc.save();
      } else {
        await Quote.create({ text, author });
      }
    }

    res.json({ message: 'Quote updated successfully', quote: db.quote });
  } catch (error) {
    res.status(500).json({ message: 'Error updating quote', error: error.message });
  }
});

module.exports = router;
