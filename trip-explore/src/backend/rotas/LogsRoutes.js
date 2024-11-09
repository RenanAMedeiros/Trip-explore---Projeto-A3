const express = require('express');
const router = express.Router();
const { getConsulta } = require('../controles/LogsController');

// Define a rota para o endpoint /consultar
router.get('/consultar', getConsulta);

module.exports = router;
