const client = require('./config');

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
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    } finally {
        await client.end();
        console.log('Conexão com o banco de dados encerrada.');
    }
}

// Executa a função de inicialização do banco
initDB();
