const express = require('express');
const router = express.Router();
const helloController = require('../controles/helloController');

// Definir a rota para /hello-world
router.get('/hello-world', helloController.getHelloWorld);

module.exports = router;
