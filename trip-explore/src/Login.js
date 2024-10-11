// Login.js
import React from 'react';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <label htmlFor="username">Usuário:</label>
      <input type="text" id="username" className="input-text" />

      <label htmlFor="password">Senha:</label>
      <input type="password" id="password" className="input-text" />

      <button className="button">Entrar</button>
    </div>
  );
};

export default Login;
