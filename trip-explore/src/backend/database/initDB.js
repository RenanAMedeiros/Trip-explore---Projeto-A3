const client = require('./config');
const bcrypt = require('bcryptjs');

async function initDB() {
    try {
        await client.connect();
        console.log('Conectado ao banco de dados.');

        // Criação da tabela de logs
        await client.query(`
            CREATE TABLE IF NOT EXISTS logs (
                cod_id SERIAL PRIMARY KEY,
                usuario_id INT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                operation VARCHAR(50),
                prompt TEXT,
                response TEXT
            );
        `);
        console.log('Tabela "logs" criada ou já existe.');

        // Criação de tabela de usuários
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `);

        console.log('Tabela "users" criada ou já existe');

        // Inserindo um usuário de exemplo (Caso não exista)
        const hashedPassword = bcrypt.hashSync('senha123', 10);
        await client.query(`
            INSERT INTO users (username, password)
            VALUES ('admin', $1)
            ON CONFLICT (username) DO NOTHING;
        `, [hashedPassword]);

        console.log('Usuário "admin" adicionado ou já existe');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    } finally {
        await client.end();
        console.log('Conexão com o banco de dados encerrada.');
    }
}

// Executa a função de inicialização do banco
initDB();
