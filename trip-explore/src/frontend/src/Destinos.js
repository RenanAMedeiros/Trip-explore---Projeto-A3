import React, { useState, useEffect } from 'react';
import './Destinos.css';
import { Dropdown } from 'primereact/dropdown';
import { TbSquareArrowLeftFilled } from 'react-icons/tb'; // Ícone de seta
import { useNavigate, Link } from 'react-router-dom'; // Para navegar programaticamente
import { InputNumber } from 'primereact/inputnumber';

const Destinos = () => {
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);
  const [valorAtracoes, setValorAtracoes] = useState(0);
  const [searchData, setSearchData] = useState({ destination: '', days: '' });
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Carregar o searchData do localStorage ao montar o componente
    const savedSearchData = JSON.parse(localStorage.getItem('searchData'));
    if (savedSearchData) {
      setSearchData(savedSearchData);
    }
  }, []);

  const countriesfilter = [
    { name: 'Família' },
    { name: 'Romântica' },
    { name: 'Aventureiro' },
    { name: 'História' },
  ];

  const countries = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4 ou mais' },
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
      {/* Ícone de seta para voltar à página inicial */}
      <div className="iconone" onClick={() => navigate('/')}>
        <TbSquareArrowLeftFilled size={40} color="#fff" />
      </div>

      <main className="second-screen">
        <div className="destinos-container">
          <div className="checkboxes">
            <h3>Selecione Opções:</h3>
          </div>

          <div>
            <label htmlFor="destination" className="label">Destino:</label>
            <input
              type="text"
              id="destination"
              className="input-text"
              placeholder="Ex: São Paulo, Brasil"
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="days" className="label">Quantidade de Dias:</label>
            <input
              type="number"
              id="days"
              className="input-date"
              min="0"
              value={searchData.days}
              onChange={(e) => setSearchData({ ...searchData, days: e.target.value })}
            />
          </div>

          <Dropdown
            value={selectedCountry1}
            onChange={(e) => setSelectedCountry1(e.value)}
            options={countries}
            optionLabel="name"
            placeholder="Quantas Pessoas"
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            className="w-full md:w-14rem"
          />

          <Dropdown
            value={selectedCountry2}
            onChange={(e) => setSelectedCountry2(e.value)}
            options={countriesfilter}
            optionLabel="name"
            placeholder="Categorias"
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            className="w-full md:w-14rem"
          />

          {/* Campo para Valores de Atrações */}
          <div className="p-inputprice">
            <h3>Preços:</h3>
            <span className="p-inputnumber-input">$</span>
            <InputNumber
              value={valorAtracoes}
              onValueChange={(e) => setValorAtracoes(e.value)}
              mode="decimal"
              locale="pt-BR"
              placeholder="Digite o valor"
            />
          </div>

          {/* Botão para navegar para a página de Resultado */}
          <Link
            to="/resultado"
            onClick={() => {
              if (searchData.destination && searchData.days && selectedCountry2 && valorAtracoes) {
                localStorage.setItem('travelStyle', selectedCountry2.name);
                localStorage.setItem('budget', valorAtracoes);
                localStorage.setItem('searchData', JSON.stringify(searchData)); // Atualiza searchData
              } else {
                alert('Por favor, preencha todos os campos!');
              }
            }}
          >
            <button className="button">Ver Resultados</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Destinos;
