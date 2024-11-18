const express = require('express');
const router = express.Router();
const { saveLog, getConsulta } = require('../controles/LogsController');

// Define a rota para salvar logs
router.post('/logs', saveLog);

// Define a rota para consultar logs
router.get('/consultar', getConsulta);

module.exports = router;
