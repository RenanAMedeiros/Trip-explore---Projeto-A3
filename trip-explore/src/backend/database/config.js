require('dotenv').config(); // Carrega as variáveis do .env
const { Pool } = require('pg');

// Configuração do Pool usando variáveis de ambiente
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER, // Variável de ambiente para o usuário
    password: process.env.DB_PASSWORD, // Variável de ambiente para a senha
});

module.exports = pool;
