const mongoose = require('mongoose');

// Define schema for users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String, required: true },
    role: { type: String, enum: ['photographer', 'client', 'admin'], default: 'client' },
    // Add other fields as needed for user profiles
});

// Define schema for portfolios
const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    images: [{type: String}]
});

// Define schema for messages
const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String },
    body: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Define schema for settings
const settingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Add fields for user settings/preferences
});

// Define schema for analytics
const analyticsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    event: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    // Add other fields for tracking analytics
});

// Define models based on schemas
const User = mongoose.model('User', userSchema);
const Portfolio = mongoose.model('Portfolio', portfolioSchema);
const Message = mongoose.model('Message', messageSchema);
const Settings = mongoose.model('Settings', settingsSchema);
const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = {
    User,
    Portfolio,
    Message,
    Settings,
    Analytics
};
