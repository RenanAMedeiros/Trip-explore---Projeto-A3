const express = require('express');
const router = express.Router();
const { consultarGeminai } = require('../controllers/GeminaiController');
router.get('/consultar', consultarGeminai);
module.exports = router;