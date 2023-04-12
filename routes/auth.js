const express = require('express');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const users = require('../data/users.json');
const tokens = require('../data/sessions.json');
const passport = require('passport');

const router = express.Router();

// Rota para fazer login e gerar um token de autenticação
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Procura o usuário no arquivo users.json
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
console.log(constants.JWT_SECRET);

  // Gera um novo token de autenticação
  const token = jwt.sign({ sub: user.id }, constants.JWT_SECRET.key, { expiresIn: '1h', jwtid: `${user.id}-${Date.now()}` });

  // Armazena o token no arquivo tokens.json
  tokens.tokens.push({ id: jwt.decode(token).jti, userId: user.id, createdAt: new Date() });

  // Retorna o token para o cliente
  return res.status(200).json({ token });
});

// Rota para fazer logout e invalidar o token de autenticação
router.post('/logout', (req, res) => {
  // Extrai o token do cabeçalho Authorization da solicitação
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Procura o token no arquivo tokens.json
  const index = tokens.tokens.findIndex(t => t.id === jwt.decode(token).jti);

  if (index === -1) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  // Remove o token do arquivo tokens.json
  tokens.tokens.splice(index, 1);

  // Retorna uma mensagem de sucesso para o cliente
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
});



module.exports = router;

