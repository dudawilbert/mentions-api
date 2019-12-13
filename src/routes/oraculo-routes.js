const express = require('express');
const router = express.Router();
const OraculoController = require('../controllers/oraculo-controller');

// gets
router.get('/:selo/:tom', OraculoController.listOraculo);
router.get('/:lua', OraculoController.listOraculoId);
// post
// router.post('/', OraculoController.createOraculo);
// put
// router.put('/:id', OraculoController.updateOraculo);
// delete
// router.delete('/:id', OraculoController.deleteOraculo);
module.exports = router;