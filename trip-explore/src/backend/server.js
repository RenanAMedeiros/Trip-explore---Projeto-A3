const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Carregar variáveis de ambiente do .env
const authRoutes = require('./rotas/authRoutes'); // Rotas de autenticação

const app = express();

// Middleware
app.use(cors()); // Permitir requisições de outras origens (necessário em dev)
app.use(express.json()); // Permitir leitura de JSON no corpo das requisições

// Verificar se JWT_SECRET está carregado
if (!process.env.JWT_SECRET) {
  console.error('Erro: JWT_SECRET não está definido. Verifique o arquivo .env');
  process.exit(1); // Encerra o servidor se a configuração estiver faltando
}


// API Routes
app.use('/api/auth', authRoutes);

// Em produção, servir arquivos estáticos do React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Rota "catch-all" para o React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
