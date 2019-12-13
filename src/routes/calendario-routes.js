const express = require('express');
const router = express.Router();
const CalendarioController = require('../controllers/calendario-controller');

// gets
router.get('/luaAtual/:currentDate', CalendarioController.luaAtual);
router.get('/mesAtual/:diaLunar', CalendarioController.mesAtual);
router.get('/anoAtual/:currentYear', CalendarioController.anoAtual);
router.get('/dia/:currentDate/', CalendarioController.listCalendarioId);
router.get('/:currentDate', CalendarioController.listCalendario);
// router.get('/sincronario', CalendarioController.listSincronario);
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