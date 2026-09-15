const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { initialPortfolioData } = require('../data/seedData');

const LOCAL_DB_PATH = path.join(__dirname, '../data/local_db.json');

let useFallbackDb = false;
let mongoError = null;

function initLocalDb() {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialPortfolioData, null, 2), 'utf-8');
  }
}

function getLocalDb() {
  initLocalDb();
  try {
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return JSON.parse(JSON.stringify(initialPortfolioData));
  }
}

function saveLocalDb(data) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

const dns = require('dns');

// Configure fallback DNS servers (Google & Cloudflare) for MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if unsupported in environment
}

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected to MongoDB via Mongoose');
    useFallbackDb = false;
    mongoError = null;

    // Automatically seed MongoDB if empty
    const { seedDatabase } = require('../data/seedData');
    await seedDatabase();
  } catch (error) {
    console.log(`⚠️ MongoDB connection failed (${error.message}). Switching to local JSON storage engine.`);
    mongoError = error.message;
    initLocalDb();
    useFallbackDb = true;
  }
};

const isUsingFallback = () => useFallbackDb;
const getMongoError = () => mongoError;

module.exports = {
  connectDB,
  isUsingFallback,
  getMongoError,
  getLocalDb,
  saveLocalDb
};
