import React, { useState } from 'react';
import { TbSquareArrowLeftFilled } from 'react-icons/tb';
import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCampos = () => {
    let errors = {};

    if (email.trim() === '') {
      errors.email = 'Campo obrigatório';
    } else if (!validarEmail(email)) {
      errors.email = 'E-mail inválido';
    }

    if (password.trim() === '') {
      errors.password = 'Campo obrigatório';
    } else if (password.length < 8) {
      errors.password = 'A senha deve ter no mínimo 8 caracteres';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin =  async() => {
    if (validarCampos()) {
      try{
        const response = await fetch('http://localhost:5000/api/auth/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            login: email,
            password: password,
            
          }),
        });

        const data = await response.json();

        if(response.ok){
          localStorage.setItem('token', data.token);
          alert('Login realizado com sucesso!');
          navigate('/home');  
        }else{
          setError({email: '', password: 'Usuário inválido'});
        }
      }catch(error){
        console.error('Erro ao fazer login', error);
        setError({email:'', password: 'Erro no servidor'});
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

        <div className="input-container">
          <label htmlFor="email">Usuário ou E-mail:</label>
          <input
            type="text"
            id="email"
            className={`input-text ${error.email ? 'error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <span className="required-message">{error.email}</span>}
          {error.email && <BiErrorCircle className="input-icon" />}
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
