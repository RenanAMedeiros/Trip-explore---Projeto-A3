import React, { useState } from 'react';
import './App.css'; // Importar o CSS aqui

const Lista = ({ logs, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        {/* Botão de hambúrguer estilizado */}
        <button
          type="button"
          role="button"
          aria-label="navegação"
          className={`lines-button ${isMenuOpen ? 'open' : ''}`}
          id="hamburger-mobile"
          onClick={toggleMenu}
        >
          <span className="lines"></span>
        </button>
        <h1>Trip-Explore</h1>
      </header>

      {/* Menu lateral */}
      <nav className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>X</button>
        <ul>
          <h3>Histórico de Buscas</h3>
          {isLoggedIn ? (
            logs.length > 0 ? (
              logs.map((log) => (
                <li key={log.cod_id}>
                  {log.prompt} - {new Date(log.date).toLocaleString()}
                </li>
              ))
            ) : (
              <li>Nenhum log encontrado</li>
            )
          ) : (
            <li>Necessário fazer login</li>
          )}
        </ul>
      </nav>

      <div className="content">
        {/* Conteúdo da página principal */}
        <h2>Bem-vindo ao Trip-Explore</h2>
        <p>Encontre destinos incríveis e planeje suas próximas aventuras!</p>
      </div>
    </div>
  );
};

export default Lista;
