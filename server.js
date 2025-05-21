const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('./'));

// Rota para logar com algum usuário
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/login.html'));
});

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/mainPage.html'));
});

// Rota para a página inicial
app.get('/mainPage', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/mainPage.html'));
});

// Rota para o perfil do usuário
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/profile.html'));
});

// Rota dinâmica para um mangá específico
app.get('/:nome', (req, res) => {
  res.sendFile(path.join(__dirname, '/html/pageMangas.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});
