const mongoose = require('mongoose');
const logger = require('./winston');
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {useNewUrlParser: true});
    logger.info('Database connected');
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};

module.exports = connectDB;
