const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const errorHandler = require('../middleware/errorHandler');
const router = express.Router();

// Rota raiz
router.get('/', (req, res) => {
  res.render('index', { title: 'Página inicial' });
});

// Rota de login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

//rota de cadastro
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

// Rota de dashboard (requer autenticação)
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

// Middleware de tratamento de erros
router.use(errorHandler);

module.exports = router;

