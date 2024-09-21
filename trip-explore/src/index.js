import React from 'react';
import ReactDOM from 'react-dom';

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
      <div style={{ margin: 'auto', width: 768, backgroundColor: '#EEE', padding: 12, borderRadius: 8 }}> 
        {/* Que bom te ver por aqui ;), <span><PrimeiroNome /> <Sobrenome /></span> */}
        Que bom te ver por aqui ;).
        <p></p>
        Usuário Logado (Subir variavel Após implementar Autenticação)
        <p></p>
        
        <label htmlFor="descricao" style={{ display: 'block', marginBottom: 4 }}>Descreva com poucas Palavras ideias de Destino:</label> 
        <input type="text" id="descricao" style={{ paddingTop: 8, paddingBottom: 8, borderStyle: 'hidden', width: '100%', borderRadius: 8, outline: 'none', boxSizing: 'border-box' }} /> 

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '12px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="dataInicio" style={{ display: 'block', marginBottom: 4 }}>Data Início:</label>
            <input type="date" id="dataInicio" style={{ paddingTop: 8, paddingBottom: 8, borderStyle: 'hidden', width: '100%', borderRadius: 8, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="dataFim" style={{ display: 'block', marginBottom: 4 }}>Data Fim:</label>
            <input type="date" id="dataFim" style={{ paddingTop: 8, paddingBottom: 8, borderStyle: 'hidden', width: '100%', borderRadius: 8, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>

        <button style={{ marginTop: 12, paddingTop: 8, paddingBottom: 8, backgroundColor: 'green', color: 'white', border: 'none', width: '100%', borderRadius: 8 }}>Enviar</button> 
      </div> 
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));



