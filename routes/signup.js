const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../data/users.json');
const dataManager = require('../data/dataManager');
const { checkAvailability } = require('../middleware/checkAvailability');
const constants = require('../config/constants');


// Rota para processar o cadastro de usuários
router.post('/signup', checkAvailability, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Gerar um novo ID de usuário único
    const id = Date.now().toString();

//    // Criptografar a senha do usuário
//    const hashedPassword = await bcrypt.hash(password, 10);

    // Adicionar o usuário ao array de usuários
    const newUser = { id, username, email, password: password };
    users.push(newUser);

    // Salvar o array de usuários no arquivo JSON
    dataManager.saveData(users, 'users.json');

    // Gerar e retornar o token JWT
    const token = jwt.sign({ id, username }, constants.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

module.exports = router;

