import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import Login from './Login'; // Importe o componente de login
import Destinos from './Destinos'; // Importe o novo componente de destinos

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Que bom te ver por aqui! Para onde vamos hoje?</h1>
        
        {/* Link para a página de destinos */}
        <Link to="/destinos">
          <button className="button">Encontrar Destinos!</button>
        </Link>
        
        <p>Usuário Logado (Subir variavel Após implementar Autenticação)</p>
        
        <label htmlFor="descricao" className="label">Digite seus destinos preferidos</label>
        <input type="text" id="descricao" className="input-text" />

        <div className="flex-row">
          <div className="flex-col">
            <label htmlFor="dataInicio" className="label">Data de Ida:</label>
            <input type="date" id="dataInicio" className="input-date" />
          </div>

          <div className="flex-col">
            <label htmlFor="dataFim" className="label">Data de Volta (Opcional):</label>
            <input type="date" id="dataFim" className="input-date" />
          </div>
        </div>

        {/* Definição das rotas */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/destinos" element={<Destinos />} /> {/* Nova rota */}
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
