import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import './home.css';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Login from './Login';
import Destinos from './Destinos';
import Resultado from './Resultado';
import Lista from './Lista'; // Alterar para minúsculas

const App = () => {
  // Simulando a variável de login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para abrir/fechar o menu

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

          <div id="buttonhome">
            {/* Botão redirecionando para a página de login */}
            <Link to="/login">
              <div className="buttonone">
                <IoPersonCircleOutline size={35} color="#ebe7e7" />
              </div>
            </Link>
          </div>
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
          <Route
            path="/"
            element={
              <div>
                <div className='home'>
                  <h1>Trip-Explorer</h1>
                </div>

                <div className="home-container">
                  <main className='main'>
                    <h1>Que bom te ver por aqui! Para onde vamos hoje?</h1>

                    <p>Usuário Logado (Subir variável Após implementar Autenticação)</p>
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

                  <Link to="/destinos">
                    <button className="button">Encontrar Destinos!</button>
                  </Link>
                </div>
              </div>
            }
          />

          {/* Rotas adicionais */}
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
