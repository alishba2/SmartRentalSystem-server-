const NewsletterSubscription = require('../Models/newsLetterModel');

// Handle subscription requests
exports.subscribe = async (req, res) => {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        // Check if email already exists
        const existingSubscription = await NewsletterSubscription.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        // Create new subscription
        const newSubscription = new NewsletterSubscription({ email });
        await newSubscription.save();
        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Error subscribing email:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
