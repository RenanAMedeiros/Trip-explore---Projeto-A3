const express = require('express');
const router = express.Router();
const authController = require('../controles/AuthController');

router.post('/login', authController.login);
router.get('/protected', authController.authenticate, (req, res) => {
  res.json({ message: 'Você acessou uma rota protegida!', user: req.user });
});

module.exports = router;
