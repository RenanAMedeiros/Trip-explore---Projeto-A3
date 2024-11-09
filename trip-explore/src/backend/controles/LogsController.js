const pool = require('../database/config');

async function getConsulta(req, res) {
    try {
        // Aqui você pode adicionar qualquer lógica adicional de consulta
        const resultadoConsulta = "Resultado da consulta"; // Exemplo de resultado

        // Registra a execução na tabela de logs
        await pool.query(`
            INSERT INTO logs (usuario_id, operation, prompt, response)
            VALUES ($1, $2, $3, $4)
        `, [null, 'GET /consultar', 'Consulta executada', resultadoConsulta]);

        // Envia uma resposta JSON para o cliente
        res.json({ message: 'Consulta executada com sucesso', resultado: resultadoConsulta });
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
}

module.exports = { getConsulta };
