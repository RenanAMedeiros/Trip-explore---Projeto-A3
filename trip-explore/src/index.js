import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // exportação nomeada Biblioteca para decodificar o token JWT
import './frontend/index.css';
import './frontend/home.css';
import { IoPersonCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import Login from './frontend/src/Login';
import Destinos from './frontend/src/Destinos';
import Resultado from './frontend/src/Resultado';
import Lista from './frontend/src/lista';

const ButtonHome = ({ isLoggedIn, handleLogout, userName }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (isLoggedIn) {
      alert(`Você já está logado como ${userName}`); // Mostrar mensagem
      navigate('/'); // Redirecionar para a página inicial
    } else {
      navigate('/login'); // Redirecionar para a página de login
    }
  };

  return (
    <div id="buttonhome">
      {isLoggedIn ? (
        <button className="button-logout" onClick={handleLogout}>
          <IoLogOutOutline size={20} color="#ebe7e7" style={{ marginRight: '8px' }} />
          Logout
        </button>
      ) : (
        <div className="buttonone" onClick={handleRedirect}>
          <IoPersonCircleOutline size={35} color="#ebe7e7" />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); // Armazenar o nome do usuário logado
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para abrir/fechar o menu

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token); // Decodifica o token JWT
            setIsLoggedIn(true);
            setUserName(decoded.name || 'Usuário'); // Configura o nome do usuário
            
            // Loga no terminal e no console do navegador
            console.log(`Usuário logado: ${decoded.name || 'Usuário'}`);
            alert(`Bem-vindo, ${decoded.name || 'Usuário'}!`);
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            setIsLoggedIn(false);
            setUserName('');
        }
    }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    setIsLoggedIn(false); // Atualiza o estado
    setUserName(''); // Limpa o nome do usuário
    alert('Você foi deslogado com sucesso!'); // Mensagem opcional
    window.location.href = '/'; // Redireciona para a página inicial
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna entre abrir e fechar o menu
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Função para fechar o menu
  };

  // Fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !document.querySelector('.side-menu').contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const HomePage = () => {
    const navigate = useNavigate(); // Declare o useNavigate aqui

    return (
      <div>
        <div className="home">
          <h1>Trip-Explorer</h1>
        </div>

        <div className="home-container">
          <main className="main">
            <h1>Que bom te ver por aqui! Para onde vamos hoje?</h1>

            <p>
              {isLoggedIn
                ? `Bem-vindo, ${userName}!`
                : 'Faça login para continuar'}
            </p>
            <label htmlFor="descricao" className="label">
              Digite seu destino:
            </label>
            <input
              type="text"
              id="descricao"
              className="input-text"
              placeholder="Ex: São Paulo, Brasil"
            />

            <div className="flex-row">
              <div className="flex-col">
                <label htmlFor="dataInicio" className="label">
                  Data de Ida:
                </label>
                <input type="date" id="dataInicio" className="input-date" />
              </div>

              <div className="flex-col">
                <label htmlFor="dataFim" className="label">
                  Data de Volta (Opcional):
                </label>
                <input type="date" id="dataFim" className="input-date" />
              </div>
            </div>
          </main>

          <button
            className="button"
            onClick={() => navigate('/destinos')} // Agora navigate está no escopo
          >
            Encontrar Destinos!
          </button>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div>
        {/* Botão de hambúrguer e Logo */}
        <div className="home_logo">
          <button
            type="button"
            aria-label="navegação"
            className={`lines-button ${isMenuOpen ? 'open' : ''}`}
            id="hamburger-mobile"
            onClick={toggleMenu}
          >
            <span className="lines"></span>
          </button>

          <ButtonHome
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            userName={userName}
          />
        </div>

        {/* Menu lateral que abre ao clicar no botão de hambúrguer */}
        <nav className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
          {/* Botão de fechar no topo do menu */}
          <button className="close-btn" onClick={closeMenu}>X</button>
          <ul>
            <h3>Para Visualizar Histórico</h3>
            <p></p>
            <h3>Necessário Logar</h3>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/lista" element={<Lista isLoggedIn={isLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
