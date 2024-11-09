const express = require('express');
const router = express.Router();
const { consultarGeminai } = require('../controles/GeminaiController');

// Define a rota que chama o controlador
router.get('/consultar', consultarGeminai);

module.exports = router;
