const express = require('express');
const router = express.Router();
const LuasController = require('../controllers/luas-controller');

// gets
router.get('/', LuasController.listLuas);
router.get('/:lua', LuasController.listLuasId);
// post
router.post('/', LuasController.createLua);
// put
router.put('/:id', LuasController.updateLua);
// delete
router.delete('/:id', LuasController.deleteLua);
module.exports = router;