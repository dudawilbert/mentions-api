const express = require('express');
const router = express.Router();
const SelosController = require('../controllers/selos-controller');

router.get('/', SelosController.listSelos);
router.post('/', SelosController.createSelo);

module.exports = router;