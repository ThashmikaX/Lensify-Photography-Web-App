const multer = require('multer');
const path = require('path'); //get the extension of the original file and return that as the format
const dotenv = require('dotenv');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_pictures',
        format: async (req, file) => {
            // Get the extension of the original file and return it as the format
            return path.extname(file.originalname).substring(1);
        },
        public_id: (req, file) => req.body.username,
    },
});

const portfolioStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_pictures',
        format: async (req, file) => {
            // Get the extension of the original file and return it as the format
            return path.extname(file.originalname).substring(1);
        },
        public_id: (req, file) => file.filename,
    },
});

const profileParser = multer({ storage: profileStorage });
const portfolioParser = multer({ storage: portfolioStorage });

module.exports = { profileParser, portfolioParser };