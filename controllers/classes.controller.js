const Class = require('../services/classes.service');

const createClass = async (req, res) => {
    const { class_name, total_points } = req.body;
    const newClass = await Class.create(class_name, total_points);
    res.status(201).json(newClass);
};

const getAllClasses = async (req, res) => {
    const classes = await Class.getAll();
    res.status(200).json(classes);
};
const getYearlyPoints = async (req, res) => {
    const yearlyPoints = await Class.getYearlyPoints();
    res.status(200).json(yearlyPoints);
};

const getTopThreeClasses = async (req, res) => {
    const topClasses = await Class.getTopThreeClasses();
    res.status(200).json(topClasses);
};

const getClassById = async (req, res) => {
    const { id } = req.params;
    const classData = await Class.getById(id);
    if (!classData) {
        return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classData);
};

const updateClass = async (req, res) => {
    const { id } = req.params;
    const { class_name, total_points } = req.body;
    const updatedClass = await Class.update(id, class_name, total_points);
    if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(updatedClass);
};

const deleteClass = async (req, res) => {
    const { id } = req.params;
    const deletedClass = await Class.delete(id);
    if (!deletedClass) {
        return res.status(404).json({ message: 'Class not found' });
    }
    res.status(204).send();
};

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
    getTopThreeClasses,
    getYearlyPoints,
};
