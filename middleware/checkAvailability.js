const users = require('../data/users.json');

// Middleware para verificar a disponibilidade do nome de usuário e do e-mail
const checkAvailability = (req, res, next) => {
  const { username, email } = req.body;

  // Verificar se o nome de usuário já está em uso
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).send('Nome de usuário já em uso.');
  }

  // Verificar se o e-mail já está em uso
  const emailExists = users.find(user => user.email === email);
  if (emailExists) {
    return res.status(400).send('E-mail já em uso.');
  }

  next();
};

module.exports = { checkAvailability };

