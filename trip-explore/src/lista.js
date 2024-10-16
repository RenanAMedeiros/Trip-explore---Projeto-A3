import React, { useState } from 'react';
import './App.css'; // Importar o CSS aqui

const App = () => {
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
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Destinos</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Contato</a></li>
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

export default App;