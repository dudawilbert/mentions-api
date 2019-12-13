const express = require('express');
const router = express.Router();
const OndaEncantadaController = require('../controllers/ondaEncantada-controller');

// gets
router.get('/:selo/:tom', OndaEncantadaController.listOndaEncantada);
// router.get('/:lua', OndaEncantadaController.listOndaEncantadaId);
// post
// router.post('/', OraculoController.createOraculo);
// put
// router.put('/:id', OraculoController.updateOraculo);
// delete
// router.delete('/:id', OraculoController.deleteOraculo);
module.exports = router;