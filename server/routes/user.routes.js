// 3rd Party Modules 
const { Router } = require('express');
const { profileParser } = require('../cloudinaryConfig'); // Import the parser middleware

// Local Modules 
const userController = require('../controllers/user.controller');

// Initialization 
const router = Router();

// Requests 
router.post('/users', profileParser.single('profileImage'), userController.saveUser);
router.post('/login', userController.verifyUser);
router.get('/userprofile', userController.getUserProfile);



module.exports = router;