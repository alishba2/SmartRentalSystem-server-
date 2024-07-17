const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const cors = require('cors'); // Add this line
const propertyRoute = require('./Routes/propertyRoutes');
const rentalsRoutes = require('./Routes/rentalRoutes');
const utilityBillRoutes = require('./Routes/utilityBillRoute');
const damageClaimRoutes = require('./Routes/damageClaimRoute');
const bookingRequest = require('./Routes/bookingRequestRoute');
const rentalDetail = require('./Routes/retailDetailRoute');
const newInstallment = require('./Routes/installmentRoute');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Configure CORS to allow all origins
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));
app.use(bodyParser.json());

// Connect to MongoD            B
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
app.use('/', damageClaimRoutes);
app.use('/', bookingRequest);
app.use('/', rentalDetail);
app.use('/', newInstallment);


app.use('/uploads', express.static('uploads'));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server with Mongoose from local!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
