// controllers/contactController.js
const ContactUs = require('../Models/contactUs');

// Handle form submission
exports.createContactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ message: "Name and message are required" });
        }

        const newContact = new ContactUs({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: "Message received. Thank you for contacting us!" });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};

// Get all contact messages (optional)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactUs.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};
