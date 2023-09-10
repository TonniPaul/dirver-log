const mongoose = require('mongoose');
const config = require('dotenv').config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB is Connected`.cyan.underline.bold);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
