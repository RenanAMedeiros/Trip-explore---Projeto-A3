const pool = require('../database/config');

// Função para salvar logs enviados pelo front-end
async function saveLog(req, res) {
    try {
        const { usuario_id, operation, prompt, response } = req.body;

        // Validação básica
        if (!operation || !prompt || !response) {
            return res.status(400).json({ error: 'Campos obrigatórios estão faltando' });
        }

        // Insere o log no banco de dados
        await pool.query(
            `
            INSERT INTO logs (usuario_id, operation, prompt, response)
            VALUES ($1, $2, $3, $4)
        `,
            [usuario_id || null, operation, prompt, response]
        );

        res.status(201).json({ message: 'Log salvo com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar log:', error);
        res.status(500).json({ error: 'Erro ao salvar log' });
    }
}

// Função existente para consulta
async function getConsulta(req, res) {
    try {
        const query = 'SELECT * FROM logs LIMIT 10';
        const { rows } = await pool.query(query);

        res.json({
            message: 'Consulta executada com sucesso',
            resultado: rows,
        });
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
}

module.exports = { saveLog, getConsulta };
