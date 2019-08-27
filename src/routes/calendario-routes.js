const express = require('express');
const router = express.Router();
const CalendarioController = require('../controllers/calendario-controller');

// gets
router.get('/:currentDate/:mes', CalendarioController.listCalendario);
router.get('/luaAtual/:currentDate', CalendarioController.luaAtual);
router.get('/sincronario', CalendarioController.listSincronario);
router.get('/sincronario/:id', CalendarioController.listSincronarioId);
// post
router.post('/', CalendarioController.createCalendario);
router.post('/sincronario', CalendarioController.createSincronario);
// put
// router.put('/:id', CalendarioController.updateCalendario);
// router.put('/sincronario/:id', CalendarioController.updateSincronario);
// delete
// router.delete('/:id', CalendarioController.deleteCalendario);
// router.delete('/sincronario/:id', CalendarioController.deleteSincronario);
module.exports = router;