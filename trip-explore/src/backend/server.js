const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./rotas/authRoutes'); // Rotas de autenticação

const app = express();

// Middleware
app.use(cors()); // Permitir requisições de outras origens (necessário em dev)
app.use(express.json()); // Permitir leitura de JSON no corpo das requisições

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
