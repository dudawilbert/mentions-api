const express = require('express');
const router = express.Router();
const TonsController = require('../controllers/tons-controller');

// gets
router.get('/', TonsController.listTonsCompleto);
router.get('/basico', TonsController.listTonsBasico);
router.get('/:id/completo', TonsController.listTonsIdCompleto);
router.get('/:id/calendario', TonsController.listTonsIdCalendario);
router.get('/:id', TonsController.listTonsId);
// post
router.post('/', TonsController.createTom);
// put
router.put('/:id', TonsController.updateTom);
// delete
router.delete('/:id', TonsController.deleteTom);
module.exports = router;