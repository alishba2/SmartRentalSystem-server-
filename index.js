const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const cors = require('cors'); // Add this line
const propertyRoute = require('./Routes/propertyRoutes');
const rentalsRoutes = require('./Routes/rentalRoutes');
const utilityBillRoutes = require('./Routes/utilityBillRoute');
const damageClaimRoutes = require('./Routes/damageClaimRoute');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from localhost:3000
app.use(bodyParser.json());

// Connect to MongoDB
try {
    console.log("hello");
    connectDB();
    console.log("hello");
} catch (error) {
    console.log(error);
}

// Use routes
app.use('/', propertyRoute);
app.use('/', rentalsRoutes);
app.use('/', utilityBillRoutes);
app.use('/', damageClaimRoutes)
// Add more routes as needed

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server with Mongoose from local!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
