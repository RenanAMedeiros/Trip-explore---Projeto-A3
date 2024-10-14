import React, { useState } from 'react';
import './Destinos.css';
import { Dropdown } from 'primereact/dropdown';
import { TbSquareArrowLeftFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Destinos = () => {
  const [selectedCountry1, setSelectedCountry1] = useState(null); // Primeiro país
  const [selectedCountry2, setSelectedCountry2] = useState(null); // Segundo país
  const [valorAtracoes, setValorAtracoes] = useState(0);
  const [horaChegada, setHoraChegada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const navigate = useNavigate();

  const handleValorChange = (e) => {
    setValorAtracoes(e.target.value);
  };

  const countries = [
    { name: 'Brasil', code: 'BR' },
    { name: 'Estados Unidos', code: 'US' },
    { name: 'França', code: 'FR' },
    { name: 'Italia', code: 'IT' },
  ];

  const countriesfilter = [
    { name: 'Família'},
    { name: 'Romântica' },
    { name: 'Aventureiro'},
    { name: 'História' },
  ];

 

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item">
          <span>{option.name}</span>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <span>{option.name}</span>
      </div>
    );
  };

  return (
    <>
      <div className="inconone" onClick={() => navigate('/primeira')}>
        <TbSquareArrowLeftFilled size={40} color="#fff" />
      </div>

      <main className='second-screen'>
        <div className="destinos-container">
          <div className="roteiro">
            <h2>Roteiro da Viagem</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="checkboxes">
            <h3>Selecione Opções:</h3>
          </div>

          <Dropdown
            value={selectedCountry1}
            onChange={(e) => setSelectedCountry1(e.value)}
            options={countriesfilter}
            optionLabel="name"
            placeholder="Categorias"
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            className="w-full md:w-14rem"
          />

          <Dropdown
            value={selectedCountry2}
            onChange={(e) => setSelectedCountry2(e.value)}
            options={countries}
            optionLabel="name"
            placeholder="Selecione o segundo país"
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            className="w-full md:w-14rem"
          />

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
      </main>
    </>
  );
};

export default Destinos;
