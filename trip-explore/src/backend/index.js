const express = require('express');
const path = require('path');
const app = express();

// Importar as rotas da API
const helloRoutes = require('./rotas/helloRoutes');
app.use('/api', helloRoutes);  // Qualquer rota que comece com /api será tratada pelas rotas da API
const geminaiRoutes = require('./routes/geminaiRoutes');
app.use('/api', geminaiRoutes);
const logsRoutes = require('./routes/logsRoutes');
app.use('/api', logsRoutes);

// Servir os arquivos estáticos do frontend (build do React)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Para qualquer rota que não comece com /api, sirva o React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
