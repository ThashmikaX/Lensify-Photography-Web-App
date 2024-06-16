const { Portfolio } = require("../models")

const getProjectById = async (req, res) => {
    const respond = await Portfolio.findById(req.query.id).exec();
    res.send(respond);
}

const saveProject = async (req, res) => {
    const imagesArray = req.files.map(file => file.path);    //return the file path array named images

    const portfolio = new Portfolio({
        ...req.body,
        images: imagesArray
    });
    const result = await portfolio.save();
    res.send({ result, message: "Portfolio data saved!" });
}

const getProjectsByUserId = async (req, res) => {
    const result = await Portfolio.find({ userId: req.query.id }).exec();
    res.send(result);
}

const getAllProject = async (req, res) => {
    const respond = await Portfolio.find().exec();
    res.send(respond);
}

module.exports = {
    getProjectById, saveProject, getProjectsByUserId, getAllProject
}