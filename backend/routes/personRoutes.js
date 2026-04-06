const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/PersonController');

router.get('/:userId', PersonController.getPersonByUserId);

module.exports = router;
