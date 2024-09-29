import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 1. Definir um componente React que se chama PrimeiroNome e produz um elemento html p com o seu nome
const PrimeiroNome = () => {
  return 'Matias';
};

// 2. Definir um componente React que se chama Sobrenome e produz um elemento html p com seu sobrenome
const Sobrenome = () => {
  return 'Porto';
};

const App = () => {
  return (
    <>
      <div className="container"> 
        {/* Que bom te ver por aqui ;), <span><PrimeiroNome /> <Sobrenome /></span> */}
        Que bom te ver por aqui! Para onde vamos hoje?
        <p></p>
        Usuário Logado (Subir variavel Após implementar Autenticação)
        <p></p>
        
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

        <button className="button">Encontrar Destinos!</button> 
      </div> 
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
