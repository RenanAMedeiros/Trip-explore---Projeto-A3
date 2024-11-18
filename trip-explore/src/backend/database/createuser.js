const client = require('./config');
const bcrypt = require('bcryptjs');

/**
 * Função para criar um novo usuário
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha do usuário
 * @param {string} name - Nome completo do usuário
 */
async function createUser(username, password, name) {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados.');

    // Verificar se o usuário já existe
    const userCheck = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      console.log(`Usuário "${username}" já existe.`);
      return;
    }

    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Inserir o usuário no banco de dados
    await client.query(
      `
      INSERT INTO users (username, password, name)
      VALUES ($1, $2, $3)
      `,
      [username, hashedPassword, name]
    );

    console.log(`Usuário "${username}" criado com sucesso! Nome completo: "${name}"`);
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  } finally {
    await client.end();
    console.log('Conexão com o banco de dados encerrada.');
  }
}

// Exemplo de uso
createUser('rodrigo.bossini', 'Trip@@2024', 'Rodrigo Bossini');