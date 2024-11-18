import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './index.css';
import './home.css';
import { IoPersonCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import Login from './Login';
import Destinos from './Destinos';
import Resultado from './Resultado';
import Lista from './lista';

// Componente do botão de login/logout
const ButtonHome = ({ isLoggedIn, handleLogout, userName }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (isLoggedIn) {
      alert(`Você já está logado como ${userName}`);
      navigate('/');
    } else {
      navigate('/login');
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

// Componente para exibir o histórico de buscas
const SearchHistory = ({ isLoadingLogs, error, logs, formatPrompt }) => (
  <div className="search-history">
    <h3>Histórico de Buscas</h3>
    <ul>
      {isLoadingLogs ? (
        <li>Carregando...</li>
      ) : error ? (
        <li className="error">{error}</li>
      ) : logs.length > 0 ? (
        logs.map((log) => (
          <li key={log.cod_id}>
            {formatPrompt(log.prompt)} - {new Date(log.date).toLocaleString()}
          </li>
        ))
      ) : (
        <>
          <li>Logar para visualizar</li>
          <li>Destinos Buscados.</li>
        </>
      )}
    </ul>
  </div>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decoded.name || 'Usuário');
      } catch (err) {
        console.error('Erro ao decodificar o token:', err);
        setIsLoggedIn(false);
        setUserName('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    setLogs([]);
    alert('Você foi deslogado com sucesso!');
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen && isLoggedIn) fetchLogs();
  };

  const fetchLogs = async () => {
    setIsLoadingLogs(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Necessário fazer login');
      setIsLoadingLogs(false);
      return;
    }

    try {
      const response = await fetch('/api/consultar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar logs');

      const data = await response.json();

      if (data.resultado) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const logsFiltrados = data.resultado.filter((log) => log.usuario_id === userId);

        setLogs(logsFiltrados);
      } else {
        setLogs([]);
        setError('Nenhum log encontrado');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const formatPrompt = (prompt) => {
    try {
      const parsedPrompt = JSON.parse(prompt);
      return `Destino: ${parsedPrompt.destination}, Dias: ${parsedPrompt.days}, Orçamento: ${parsedPrompt.budget}, Estilo: ${parsedPrompt.travelStyle}`;
    } catch {
      return 'Erro ao formatar prompt';
    }
  };

  const HomePage = () => {
    const navigate = useNavigate();
    return (
      <div>
        <div className="home">
          <h1>Trip-Explorer</h1>
        </div>

        <div className="home-container">
          <main className="main">
            <h1>Que bom te ver por aqui! Para onde vamos hoje?</h1>
            <p>{isLoggedIn ? `Bem-vindo, ${userName}!` : 'Faça login para continuar'}</p>
            <label htmlFor="descricao" className="label">Digite seu destino:</label>
            <input type="text" id="descricao" className="input-text" placeholder="Ex: São Paulo, Brasil" />
            <label htmlFor="dataInicio" className="label">Quantidade de Dias:</label>
            <input type="number" id="dataInicio" className="input-date" min="0" />
          </main>
          <button
            className="button"
            onClick={() => {
              const destination = document.getElementById('descricao').value;
              const days = document.getElementById('dataInicio').value;

              if (destination && days) {
                localStorage.setItem('destination', destination);
                localStorage.setItem('days', days);
                navigate('/destinos');
              } else {
                alert('Por favor, preencha todos os campos!');
              }
            }}
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
        <header className="home_logo">
          <button
            type="button"
            aria-label="navegação"
            className={`lines-button ${isMenuOpen ? 'open' : ''}`}
            id="hamburger-mobile"
            onClick={toggleMenu}
          >
            <span className="lines"></span>
          </button>
          <ButtonHome isLoggedIn={isLoggedIn} handleLogout={handleLogout} userName={userName} />
        </header>
        <nav className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>X</button>
          <SearchHistory
            isLoadingLogs={isLoadingLogs}
            error={error}
            logs={logs}
            formatPrompt={formatPrompt}
          />
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
