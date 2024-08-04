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
const notification = require('./Routes/notificationRoute');
const notice = require('./Routes/noticeRequest');
const queries = require('./Routes/functionRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Configure CORS to allow all origins
app.use(cors({
  origin: "*", // Update this for your React Native app's URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

// Connect to MongoD            B
try {
  console.log("hello");
  connectDB();
  console.log("hello");
} catch (error) {
  console.log(error);
}

// Use routes
app.use(express.json());


app.use('/', propertyRoute);
app.use('/', rentalsRoutes);
app.use('/', utilityBillRoutes);
app.use('/', damageClaimRoutes);
app.use('/', bookingRequest);
app.use('/', rentalDetail);
app.use('/', newInstallment);
app.use('/', notice);
app.use('/', queries);
app.use('/', notification);


app.use('/uploads', express.static('uploads'));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server with Mongoose from local!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
