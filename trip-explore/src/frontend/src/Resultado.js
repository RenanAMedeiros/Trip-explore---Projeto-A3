// Resultado.js
import React from 'react';
import './Resultado.css';
import { TbSquareArrowLeftFilled } from 'react-icons/tb'; // Ícone de seta
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação

const Resultado = () => {
  const navigate = useNavigate(); // Hook para navegação

  return (
    <>
      <div className="iconone" onClick={() => navigate('/')}> {/* Navega para a página inicial */}
        <TbSquareArrowLeftFilled size={40} color="#fff" />
      </div>

      <div className="resultado-container">
        <h2>Aqui mostra os resultados da pesquisa:</h2>
      </div>
    </>
  );
};

export default Resultado;
