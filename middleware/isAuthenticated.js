const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const users = require('../data/users.json');
const tokens = require('../data/sessions.json');

function isAuthenticated(req, res, next) {
  // Extrai o token do cabeçalho Authorization da solicitação
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    // Verifica a validade do token e decodifica o payload
    const payload = jwt.verify(token, constants.JWT_SECRET);

    // Procura o token no arquivo tokens.json
    const foundToken = tokens.tokens.find(t => t.id === payload.jti);

    if (!foundToken) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Procura o usuário no arquivo users.json
    const user = users.find(user => user.id === foundToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Define o objeto user na requisição para que outras rotas possam acessá-lo
    req.user = user;

    // Passa o controle para o próximo middleware ou rota
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = isAuthenticated;

