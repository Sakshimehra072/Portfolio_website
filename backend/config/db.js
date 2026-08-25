const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { initialPortfolioData } = require('../data/seedData');

const LOCAL_DB_PATH = path.join(__dirname, '../data/local_db.json');

let useFallbackDb = false;

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

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 2000 });
    console.log('✅ Connected to MongoDB via Mongoose');
    useFallbackDb = false;
  } catch (error) {
    console.log('⚠️ MongoDB connection not available. Switching to local JSON storage engine.');
    initLocalDb();
    useFallbackDb = true;
  }
};

const isUsingFallback = () => useFallbackDb;

module.exports = {
  connectDB,
  isUsingFallback,
  getLocalDb,
  saveLocalDb
};
