const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { profileParser, portfolioParser } = require('./cloudinaryConfig'); // Import the parser middleware

const { userSchema, portfolioSchema } = require('./models');

// Connect to MongoDB
mongoose.connect("mongodb+srv://thashmikax:gBUooOKJm5KUUfqv@cluster0.mvsueol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
});

// Import your models
const User = mongoose.model('User', userSchema);
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/users', profileParser.single('profileImage'), async (req, res) => {
    const imageUrl = req.file.path;
    const user = new User({
        ...req.body,
        profilePicture: imageUrl, // Add the imageUrl to the user document
    });
    await user.save();
    res.send(user);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.post('/login', async (req, res) => {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email or password.');
    }

    // Check password
    if (req.body.password !== user.password) {
        return res.status(400).send('Invalid email or password.');
    }

    res.send({ message: 'Logged in successfully.', userId: user._id });
});

app.post('/portfolios', async (req, res) => {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.send(portfolio);
});

app.get('/portfolios', async (req, res) => {
    const portfolios = await Portfolio.find().populate('userId');
    res.send(portfolios);
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));