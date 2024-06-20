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
    const respond = await User.findById(req.query.id, 'firstName lastName profilePicture').exec();
    res.send({ respond, message: "data get done" });
}

module.exports = {
    saveUser, verifyUser, getUserProfile
}