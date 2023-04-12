const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

// Rota de perfil do usuário (requer autenticação)
router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { title: 'Perfil do usuário', user: req.user });
});

module.exports = router;

