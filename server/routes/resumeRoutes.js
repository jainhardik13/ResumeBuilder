const express = require('express');
const router = express.Router();
const { createResume, getResumeByUser, updateResume } = require('../controllers/resumeController');

router.post('/create', createResume);

router.get('/:userId', getResumeByUser);

router.put('/update', updateResume);

module.exports = router;