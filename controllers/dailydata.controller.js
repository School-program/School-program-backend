const DailyData = require('../services/dailydata.service');

const createDailyData = async (req, res) => {
    const { class_id, entry_date, chairs, sweep, lightswindows, board, total_points } = req.body;
    const newEntry = await DailyData.create(class_id, entry_date, chairs, sweep, lightswindows, board, total_points);
    res.status(201).json(newEntry);
};

const getAllDailyData = async (req, res) => {
    const entries = await DailyData.getAll();
    res.status(200).json(entries);
};

const getDailyDataById = async (req, res) => {
    const { id } = req.params;
    const entry = await DailyData.getById(id);
    if (!entry) {
        return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
};

const updateDailyData = async (req, res) => {
    const { id } = req.params;
    const { class_id, entry_date, chairs, sweep, lightswindows, board, total_points } = req.body;
    const updatedEntry = await DailyData.update(id, class_id, entry_date, chairs, sweep, lightswindows, board, total_points);
    if (!updatedEntry) {
        return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedEntry);
};

const deleteDailyData = async (req, res) => {
    const { id } = req.params;
    const deletedEntry = await DailyData.delete(id);
    if (!deletedEntry) {
        return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(204).send();
};

module.exports = {
    createDailyData,
    getAllDailyData,
    getDailyDataById,
    updateDailyData,
    deleteDailyData,
};
