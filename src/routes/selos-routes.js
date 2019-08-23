const express = require('express');
const router = express.Router();
const SelosController = require('../controllers/selos-controller');

// gets
router.get('/', SelosController.listSelosCompleto);
router.get('/basico', SelosController.listSelosBasico);
router.get('/:id', SelosController.listSelosId);
router.get('/calendario/:currentDate', SelosController.listSelosCalendario);
// post
router.post('/', SelosController.createSelo);
// put
router.put('/:id', SelosController.updateSelo);
// delete
router.delete('/:id', SelosController.deleteSelo);
module.exports = router;