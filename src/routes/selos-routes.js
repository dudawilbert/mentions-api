const express = require('express');
const router = express.Router();
const SelosController = require('../controllers/selos-controller');

router.get('/', SelosController.listSelosCompleto);
router.get('/basico', SelosController.listSelosBasico);
router.post('/', SelosController.createSelo);

module.exports = router;