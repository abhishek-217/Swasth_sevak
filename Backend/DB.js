const mongoose = require('mongoose');

const connectDB = () => {
  // MongoDB Atlas connection (only defined here)
  const atlasURL = 'mongodb+srv://abhiman5196:Abhi5196@cluster0.kerjnhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

  mongoose.connect(atlasURL)
    .then(() => console.log('MongoDB Atlas connected!'))
    .catch(err => {
      console.error('MongoDB connection failed:', err);
      process.exit(1); // Exit process on connection failure
    });

  mongoose.connection.on('error', err => console.log('MongoDB runtime error:', err));
  mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
};

module.exports = connectDB;