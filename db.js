const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("In db file");

    await mongoose.connect('mongodb+srv://alishba2:%2321alishba%2A@cluster0.9gntabz.mongodb.net/leaseConnect?retryWrites=true&w=majority', {
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
