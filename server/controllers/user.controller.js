const { User } = require("../models")

const saveUser = async (req, res) => {
    try {
        const imageUrl = req.file.path;
        const user = new User({
            ...req.body,
            profilePicture: imageUrl, // Add the imageUrl to the user document
        });
        const result = await user.save();
        // Send a 201 Created status code and the saved user object
        res.status(201).json(result);
    } catch (error) {
        // Send a 500 Internal Server Error status code if an error occurs
        res.status(500).json({ message: error.message });
    }
}

const verifyUser = async (req, res) => {
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
}

const getUserProfile = async (req, res) => {
    const respond = await User.findById(req.query.id, 'firstName lastName email profilePicture bio location specialty').exec();
    res.send({ respond, message: "data get done" });
}

const updateUserProfile = async (req, res) => {
    const userId = req.query.id;
    const updatedData = req.body;

    // If a new profile picture was uploaded
    if (req.file) {
        updatedData.profilePicture = req.file.path;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            updatedData, 
            { new: true, select: 'firstName lastName email profilePicture bio location specialty' }
        ).exec();
        
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        
        res.send({ respond: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error updating profile", error: error.message });
    }
}

module.exports = {
    saveUser, verifyUser, getUserProfile, updateUserProfile
}