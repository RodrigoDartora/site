const fs = require('fs');
const path = require('path');
const constants = require('../config/constants');

let users = [];
let sessions = [];

// Lê os dados do arquivo JSON
function loadData() {
  try {
    users = require('./users.json');
  } catch (err) {
    users = [];
  }

  try {
    sessions = require('./sessions.json');
  } catch (err) {
    sessions = [];
  }
}

// Grava os dados no arquivo JSON
function saveData() {
  try {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users));
  } catch (err) {
    console.error('Erro ao salvar dados de usuários:', err);
  }

  try {
    fs.writeFileSync(path.join(__dirname, 'sessions.json'), JSON.stringify(sessions));
  } catch (err) {
    console.error('Erro ao salvar dados de sessões:', err);
  }
}

// Conecta-se ao banco de dados
function connect() {
  loadData();
}

// Retorna todos os usuários
function getAllUsers() {
  return users;
}

// Retorna um usuário pelo ID
function getUserById(id) {
  return users.find(user => user.id === id);
}

// Retorna um usuário pelo nome de usuário
function getUserByUsername(username) {
  return users.find(user => user.username === username);
}

// Cria um novo usuário
function createUser(user) {
  const newUser = { id: Date.now().toString(), ...user };
  users.push(newUser);
  saveData();
  return newUser;
}

// Atualiza os detalhes de um usuário existente
function updateUser(id, updates) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }
  users[userIndex] = { ...users[userIndex], ...updates };
  saveData();
  return users[userIndex];
}

// Exclui um usuário pelo ID
function deleteUser(id) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }
  users.splice(userIndex, 1);
  saveData();
}

// Adiciona um novo token de autenticação
function addToken(token) {
  sessions.push(token);
  saveData();
}

// Retorna um token de autenticação pelo ID do usuário
function getTokenByUserId(userId) {
  return sessions.find(token => token.userId === userId);
}

// Exclui um token de autenticação pelo ID do usuário
function deleteToken(userId) {
  const sessionIndex = sessions.findIndex(token => token.userId === userId);
  if (sessionIndex === -1) {
    throw new Error('Token não encontrado');
  }
  sessions.splice(sessionIndex, 1);
  saveData();
}

// Exporta os métodos públicos do módulo
module.exports = {
  connect,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  addToken,
  getTokenByUserId,
  deleteToken,
  saveData
};

