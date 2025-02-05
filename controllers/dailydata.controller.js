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
const getDailyDataByDate = async (req, res) => {
    const { entry_date } = req.params;
    const entries = await DailyData.getByDate(entry_date);
    if (!entries || entries.length === 0) {
        return res.status(404).json({ message: 'No data found for the given date' });
    }
    res.status(200).json(entries);
};
const getDailyDataByClass = async (req, res) => {
    const { class_id } = req.params;
    const entries = await DailyData.getByClass(class_id);
    if (!entries || entries.length === 0) {
        return res.status(404).json({ message: 'No data found for the given class' });
    }
    res.status(200).json(entries);
};
// ב-controller
const addDailyDataAndUpdateClassPoints = async (req, res) => {
    const { class_id, entry_date, chairs, sweep, lightswindows, board, total_points } = req.body;
    
    // יצירת רשומת נתונים חדשה
    const newEntry = await DailyData.create(class_id, entry_date, chairs, sweep, lightswindows, board, total_points);

    // עדכון הציון הסופי בטבלת הכיתות
    const updatedClass = await DailyData.updateClassPoints(class_id, total_points);

    res.status(201).json({
        newEntry,
        updatedClass
    });
};
const getDailyDataByClassAndDate = async (req, res) => {
    const { class_id, entry_date } = req.params;
    const entries = await DailyData.getByClassAndDate(class_id, entry_date);
    if (!entries || entries.length === 0) {
      return res.status(404).json({ message: 'No data found for the given class and date' });
    }
    res.status(200).json(entries);
  };
  

module.exports = {
    createDailyData,
    getAllDailyData,
    getDailyDataById,
    updateDailyData,
    deleteDailyData,
    getDailyDataByDate,
    getDailyDataByClass,
    addDailyDataAndUpdateClassPoints,
    getDailyDataByClassAndDate,
};
