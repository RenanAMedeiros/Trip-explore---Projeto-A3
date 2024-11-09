const express = require('express');
const path = require('path');
const app = express();

const logsRoutes = require('./rotas/LogsRoutes');
app.use('/api', logsRoutes);  // Isso permite acessar rotas do LogsRoutes com "/api/..."

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
