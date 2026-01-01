const express = require('express'); //import express to create the server
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk'); //Use for print color messages on console
const dotenv = require('dotenv');

// Fix for self-signed certificate issues in development
// Remove this in production or use proper certificates
if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const app = express();
dotenv.config();

const projectRoutes = require('./routes/projects.routes'); 
const userRoutes = require('./routes/user.routes'); 

// Connect to MongoDB
mongoose.connect(process.env.URL);
mongoose.connection.once('open', function () {
    console.log(chalk.green("Database connection established succesfully!"));
});

// Middleware
app.use(express.json());    //parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));    //parses incoming requests with URL-encoded payloads
app.use(cors());

// Routes
app.use('/', projectRoutes);
app.use('/', userRoutes);

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));