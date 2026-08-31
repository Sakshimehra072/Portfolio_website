const mongoose = require('mongoose');

const PersonalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  tagline: { type: String },
  bio1: { type: String },
  bio2: { type: String },
  bio: { type: String },
  avatar: { type: String },
  banner: { type: String },
  resumeLink: { type: String },
  email: { type: String },
  handle: { type: String },
  location: { type: String },
  status: {
    active: { type: Boolean, default: true },
    listeningTo: { type: String }
  },
  socials: {
    github: String,
    linkedin: String,
    twitter: String,
    devto: String,
    email: String
  }
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Frontend, Backend, Database, Tools, etc.
  proficiency: { type: Number, default: 80 },
  icon: { type: String, default: 'Code' }
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String, required: true },
  keyFeatures: [String],
  image: { type: String },
  tags: [String],
  category: { type: String, default: 'Full Stack' },
  github: { type: String },
  demo: { type: String },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  duration: { type: String, required: true },
  current: { type: Boolean, default: false },
  highlights: [String]
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String },
  duration: { type: String, required: true },
  details: { type: String }
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

const WritingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: String },
  readTime: { type: String },
  link: { type: String },
  content: { type: String }
}, { timestamps: true });

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String }
}, { timestamps: true });

const QuoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true }
}, { timestamps: true });

const PersonalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  link: { type: String }
}, { timestamps: true });

module.exports = {
  PersonalInfo: mongoose.model('PersonalInfo', PersonalInfoSchema),
  Skill: mongoose.model('Skill', SkillSchema),
  Project: mongoose.model('Project', ProjectSchema),
  Experience: mongoose.model('Experience', ExperienceSchema),
  Education: mongoose.model('Education', EducationSchema),
  Message: mongoose.model('Message', MessageSchema),
  Writing: mongoose.model('Writing', WritingSchema),
  Gallery: mongoose.model('Gallery', GallerySchema),
  Quote: mongoose.model('Quote', QuoteSchema),
  Personal: mongoose.model('Personal', PersonalSchema)
};

