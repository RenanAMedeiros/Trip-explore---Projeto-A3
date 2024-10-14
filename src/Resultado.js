// Resultado.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import './Resultado.css';
import { TbSquareArrowLeftFilled } from 'react-icons/tb'; // Ícone de seta

const Resultado = () => {
    const navigate = useNavigate(); // Hook para navegação

    return (
        <>
            <div className="iconone" onClick={() => navigate('/destinos')}> {/* Navega para a página de Destinos */}
                <TbSquareArrowLeftFilled size={40} color="#fff" />
            </div>

            <div className="Resultado-container">
                <h2>Resultado de sua pesquisa:</h2>

                <div className='Resultado-busca'>
                    <p>Mostrar o resultado da pesquisa</p>
                </div>
            </div>
        </>
    );
};

export default Resultado;
