const express = require('express'); //import express to create the server
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk'); //Use for print color messages on console
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const { profileParser, portfolioParser } = require('./cloudinaryConfig'); // Import the parser middleware
const { userSchema, portfolioSchema } = require('./models'); //Import database models

// Connect to MongoDB
mongoose.connect(process.env.URL);
mongoose.connection.once('open', function () {
    console.log(chalk.green("Database connection established succesfully!"));
});

// Import database models
const User = mongoose.model('User', userSchema);
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Middleware
app.use(express.json());    //parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));    //parses incoming requests with URL-encoded payloads
app.use(cors());

// Routes
app.post('/users', profileParser.single('profileImage'), async (req, res) => {
    const imageUrl = req.file.path;
    const user = new User({
        ...req.body,
        profilePicture: imageUrl, // Add the imageUrl to the user document
    });
    const result = await user.save();
    res.send(result);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.post('/login', async (req, res) => {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email.');
    }

    // Check password
    if (req.body.password !== user.password) {
        return res.status(400).send('Invalid password.');
    }

    res.send({ message: 'Logged in successfully.', userId: user._id });
});

app.post('/portfolio', portfolioParser.array('image', 3), async (req, res) => {
    const imagesArray = req.files.map(file => file.path);    //return the file path array named images

    const portfolio = new Portfolio({
        ...req.body,
        images: imagesArray
    });
    const result = await portfolio.save();
    res.send({ result, message: "Portfolio data saved!" });
})

app.get('/userprofile', async (req, res) => {
    const respond = await User.findById(req.query.id, 'firstName lastName profilePicture').exec();
    res.send({ respond, message: "data get done" });
})

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));