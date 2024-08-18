const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a newsletter subscription
const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                // Simple email validation
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
}, { timestamps: true });

// Create the model
const NewsletterSubscription = mongoose.model('NewsletterSubscription', newsletterSchema);

module.exports = NewsletterSubscription;
