// BookingRequestController.js
const BookingRequest = require('../Models/bookingRequestModel');

exports.createBookingRequest = async (req, res) => {
  console.log("in booking request...............");
  console.log(req.body);

  try {
    const { userId, name, contactNo, email, numFamilyMembers, startDate, installmentType, ownerId, propertyId } = req.body;

    const newBookingRequest = new BookingRequest({
      userId,
      name,
      contactNo,
      email,
      numFamilyMembers,
      startDate,
      installmentType,
      ownerId,
      propertyId
    });

    await newBookingRequest.save();

    res.status(201).json({ message: 'Booking request created successfully', data: newBookingRequest });
  } catch (error) {
    console.error('Error creating booking request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getBookingRequestsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log
    const bookingRequests = await BookingRequest.find({ userId });
    res.status(200).json({ data: bookingRequests });
  } catch (error) {
    console.error('Error fetching booking requests by userId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getBookingRequestsByPropertyId = async (req, res) => {
  try {
    console.log("get property by id");
    const { propertyId } = req.params;

    const bookingRequests = await BookingRequest.find({ propertyId });
    console.log(bookingRequests);
    res.status(200).json({ data: bookingRequests });
  } catch (error) {
    console.error('Error fetching booking requests by propertyId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getBookingRequestCount = async (req, res) => {
  try {
    const count = await BookingRequest.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching booking request count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};