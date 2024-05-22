const multer = require('multer');
const path = require('path'); //get the extension of the original file and return that as the format


const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dwv18r4b5',
    api_key: '959979693422453',
    api_secret: 'pWW2KwStkCVCQzyB6MfZ3ZBOcos',
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
        public_id: (req, file) => req.body.username,
    },
});

const profileParser = multer({ storage: profileStorage });
const portfolioParser = multer({ storage: portfolioStorage });

module.exports = { profileParser, portfolioParser };