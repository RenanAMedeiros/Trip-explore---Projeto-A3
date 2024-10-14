// Login.js
import React from 'react';
import './Login.css';
import { TbSquareArrowLeftFilled } from 'react-icons/tb'; // Ícone de seta
import { useNavigate } from 'react-router-dom'; // Para navegar programaticamente

const Login = () => {
  const navigate = useNavigate(); // Hook para navegação

  return (
    <>
      <div className="iconone" onClick={() => navigate('/')}> {/* Navega para a página inicial */}
        <TbSquareArrowLeftFilled size={40} color="#fff" />
      </div>
      <div className="login-container">
        <h2>Login:</h2>
        <label htmlFor="username">Usuário:</label>
        <input type="text" id="username" className="input-text" />

        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" className="input-text" />

        <button className="button">Entrar</button>
      </div>
    </>
  );
};

export default Login;
