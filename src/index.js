import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './index.css';
import './home.css';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdHelp } from 'react-icons/md';
import Login from './Login';
import Destinos from './Destinos';
import Resultado from './Resultado';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* Logo e Botões (parte fixa) */}
      <div className="home_logo">
        <h1>Trip-Explore</h1>
        <div id="buttonhome">
          {/* Tornando o ícone de perfil clicável e redirecionando para a página de Login */}
          <Link to="/login">
            <div className="buttonone">
              <IoPersonCircleOutline size={30} color="#ebe7e7" />
            </div>
          </Link>

          {/* O ícone de ajuda permanece o mesmo */}
          <div className="buttontwo">
            <MdHelp size={30} color="#ebe7e7" />
          </div>
        </div>
      </div>

      <Routes>
        {/* Página inicial */}
        <Route
          path="/"
          element={
            <div className="home-container">
              <main className='main'>
                <h1>Que bom te ver por aqui! Para onde vamos hoje?</h1>
                <p>Usuário Logado (Subir variável Após implementar Autenticação)</p>
                <label htmlFor="descricao" className="label">
                  Digite seu destino:
                </label>
                <input type="text" id="descricao" className="input-text" placeholder='Ex: São Paulo, Brasil' />

                <div className="flex-row">
                  <div className="flex-col">
                    <label htmlFor="dataInicio" className="label">Data de Ida:</label>
                    <input type="date" id="dataInicio" className="input-date" />
                  </div>
                  <div className="flex-col">
                    <label htmlFor="dataFim" className="label">Data de Volta:</label>
                    <input type="date" id="dataFim" className="input-date" />
                  </div>
                </div>
              </main>

              <Link to="/destinos">
                <button className="button">Encontrar Destinos!</button>
              </Link>
            </div>
          }
        />

        {/* Definição das rotas */}
        <Route path="/login" element={<Login />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </div>
  );
};

const MainApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(<MainApp />, document.querySelector('#root'));
