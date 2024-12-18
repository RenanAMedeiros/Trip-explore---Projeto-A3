const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Carregar variáveis de ambiente do .env
const authRoutes = require('./rotas/authRoutes'); // Rotas de autenticação
const geminiRoutes = require('./rotas/GeminiRoutes'); // Rotas do Gemini
const logsRoutes = require('./rotas/LogsRoutes'); // Rota do log corretamente

const app = express();

// Middleware
app.use(cors()); // Permitir requisições de outras origens 
app.use(express.json()); // Permitir leitura de JSON no corpo das requisições

// Verificar se JWT_SECRET está carregado
if (!process.env.JWT_SECRET) {
  console.error('Erro: JWT_SECRET não está definido. Verifique o arquivo .env');
  process.exit(1); // Encerra o servidor se a configuração estiver faltando
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/travel', geminiRoutes); // Adiciona as rotas do Gemini
app.use('/api', logsRoutes); // Rota para logs

// Servir arquivos estáticos do React para produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build'))); // Configurado para a pasta build no mesmo nível do server.js

  // Rota "catch-all" para o React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Configuração da porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
