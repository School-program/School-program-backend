const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

// קריאות API עבור ה-Class
router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
