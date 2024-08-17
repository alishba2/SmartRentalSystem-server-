const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("In db file");

    // Uncomment this line if you want to use MongoDB Atlas
    await mongoose.connect('mongodb+srv://alishba2:%2321alishba%2A@cluster0.9gntabz.mongodb.net/leaseConnect?retryWrites=true&w=majority', {

      // Use this line for connecting to a local MongoDB instance
      // await mongoose.connect('mongodb://127.0.0.1/leaseConnect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
