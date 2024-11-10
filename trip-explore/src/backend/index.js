require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();


// Adicionar parser de JSON
app.use(express.json());

// Importar as rotas da API
const helloRoutes = require('./rotas/helloRoutes');
app.use('/api/hello', helloRoutes);

const geminiRoutes = require('./rotas/GeminiRoutes');
app.use(express.json());
app.use('/api/travel', geminiRoutes);

// Servir os arquivos estáticos do frontend (build do React)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Para qualquer rota que não comece com /api, sirva o React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const logsRoutes = require('./rotas/LogsRoutes');
app.use('/api', logsRoutes);  // Isso permite acessar rotas do LogsRoutes com "/api/..."

console.log('API Key loaded:', !!process.env.GOOGLE_API_KEY);

// Configurações do servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


