// 3rd Party Modules 
const { Router } = require('express');
const { portfolioParser } = require('../cloudinaryConfig'); // Import the parser middleware

// Local Modules 
const projectController = require('../controllers/projects.controller');

// Initialization 
const router = Router();

// Requests 
router.get('/getprojectbyid', projectController.getProjectById);
router.post('/portfolio', portfolioParser.array('image', 3), projectController.saveProject);
router.get('/userprojects', projectController.getProjectsByUserId);
router.get('/allprojects', projectController.getAllProject);
router.put('/project', portfolioParser.array('image', 3), projectController.editProject);
router.delete('/project', projectController.deleteProject);


module.exports = router;