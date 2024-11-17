import React, { useState } from 'react';
import { TbSquareArrowLeftFilled } from 'react-icons/tb';
import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validarCampos = () => {
    let errors = {};

    if (username.trim() === '') {
      errors.username = 'Campo obrigatório';
    }

    if (password.trim() === '') {
      errors.password = 'Campo obrigatório';
    } else if (password.length < 8) {
      errors.password = 'A senha deve ter no mínimo 8 caracteres';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (validarCampos()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username, // Backend espera "username"
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          alert('Login realizado com sucesso!');
          navigate('/'); // Redirecionar para a página principal
          window.location.reload(); // Recarregar a página
        } else {
          setError({ general: data.error || 'Usuário ou senha inválidos' });
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        setError({ general: 'Erro no servidor. Tente novamente mais tarde.' });
      }
    }
  };

  return (
    <>
      <div className="iconone" onClick={() => navigate('/')}>
        <TbSquareArrowLeftFilled size={40} color="#fff" />
      </div>

      <div className="login-container">
        <h2>Login</h2>

        {error.general && <div className="error-message">{error.general}</div>}

        <div className="input-container">
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            className={`input-text ${error.username ? 'error' : ''}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error.username && <span className="required-message">{error.username}</span>}
          {error.username && <BiErrorCircle className="input-icon" />}
        </div>

        <div className="input-container">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            className={`input-text ${error.password ? 'error' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && <span className="required-message">{error.password}</span>}
          {error.password && <BiErrorCircle className="input-icon" />}
        </div>

        <button className="button" onClick={handleLogin}>Entrar</button>
      </div>
    </>
  );
};

export default Login;
