const express = require('express');
const router = express.Router();
const PlasmasController = require('../controllers/plasmas-controller');

// gets
router.get('/', PlasmasController.listPlasmas);
router.get('/:plasma', PlasmasController.listPlasmasId);
// post
router.post('/', PlasmasController.createPlasma);
// put
router.put('/:id', PlasmasController.updatePlasma);
// delete
router.delete('/:id', PlasmasController.deletePlasma);
module.exports = router;