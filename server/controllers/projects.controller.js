const { portfolioParser } = require("../cloudinaryConfig");
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

const editProject = async (req, res) => {
    const projectId = req.query.id;
    const updatedData = req.body;

    if (req.files && req.files.length > 0) {
        const imagesArray = req.files.map(file => file.path);
        updatedData.images = imagesArray;
    }

    try {
        const updatedProject = await Portfolio.findByIdAndUpdate(projectId, updatedData, { new: true }).exec();
        if (!updatedProject) {
            return res.status(400).send({ message: "Project not found" });
        }
        res.send({ updatedProject, message: "Project updated" });
    } catch (error) {
        res.status(500).send({ message: "Error updating project", error: error.message });
    }
};

const deleteProject = async (req, res) => {
    const projectId = req.query.id;
    
    try {
        const deletedProject = await Portfolio.findByIdAndDelete(projectId).exec();
        if (!deletedProject) {
            return res.status(404).send({ message: "Project not found" });
        }

        res.status(200).send({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting project", error: error.message });
    }
}

module.exports = {
    getProjectById,
    saveProject,
    getProjectsByUserId,
    getAllProject,
    editProject,
    deleteProject,
}