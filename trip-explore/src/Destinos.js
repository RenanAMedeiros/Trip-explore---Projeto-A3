// Destinos.js
import React, { useState } from 'react';

const Destinos = () => {
  const [valorAtracoes, setValorAtracoes] = useState(0);
  const [horaChegada, setHoraChegada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');

  const handleValorChange = (e) => {
    setValorAtracoes(e.target.value);
  };

  return (
    <div className="destinos-container">
      <div className="roteiro">
        <h2>Roteiro da Viagem</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>

      <div className="checkboxes">
        <h3>Selecione Opções:</h3>
        <div className="checkbox-item">
          <input type="checkbox" id="exemplo1" />
          <label htmlFor="exemplo1">Família</label>
        </div>
        <div className="checkbox-item">
          <input type="checkbox" id="exemplo2" />
          <label htmlFor="exemplo2">Romântico</label>
        </div>
        <div className="checkbox-item">
          <input type="checkbox" id="exemplo3" />
          <label htmlFor="exemplo3">Aventureiro</label>
        </div>
        <div className="checkbox-item">
          <input type="checkbox" id="exemplo4" />
          <label htmlFor="exemplo4">Histórico</label>
        </div>
      </div>

      {/* Campo para Valores de Atrações */}
      <div className="valores-container">
        <h3>Valores de Atrações:</h3>
        <input
          type="range"
          min="0"
          max="100000"
          value={valorAtracoes}
          onChange={handleValorChange}
        />
        <p>Valor selecionado: R$ {valorAtracoes}</p>
      </div>

      {/* Campos para Hora de Chegada e Hora de Saída */}
      <div className="horas-container">
        <h3>Horário:</h3>
        <div className="hora-item">
          <label htmlFor="horaChegada">Hora de Chegada:</label>
          <input
            type="text"
            id="horaChegada"
            value={horaChegada}
            onChange={(e) => setHoraChegada(e.target.value)}
            placeholder="Ex: 14:30"
          />
        </div>
        <div className="hora-item">
          <label htmlFor="horaSaida">Hora de Saída:</label>
          <input
            type="text"
            id="horaSaida"
            value={horaSaida}
            onChange={(e) => setHoraSaida(e.target.value)}
            placeholder="Ex: 18:45"
          />
        </div>
      </div>
    </div>
  );
};

export default Destinos;
