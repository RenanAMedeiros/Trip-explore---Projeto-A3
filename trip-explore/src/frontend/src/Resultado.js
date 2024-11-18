import React, { useEffect, useState } from 'react';
import './Resultado.css';
import { TbSquareArrowLeftFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Resultado = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para exibir o carregamento

  const logRequest = async (usuarioId, operation, prompt, response) => {
    try {
      await fetch('http://localhost:5000/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuarioId,
          operation,
          prompt,
          response,
        }),
      });
    } catch (error) {
      console.error('Erro ao registrar log:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const historyData = JSON.parse(localStorage.getItem('historyData'));
      const searchData = JSON.parse(localStorage.getItem('searchData'));

      if (historyData) {
        // Renderiza diretamente o response do histórico
        setResult(JSON.parse(historyData.response));
        setLoading(false);
        localStorage.removeItem('historyData'); // Limpa o historyData após o uso
        return;
      }

      if (!searchData) {
        alert('Informações incompletas! Retornando para a página inicial.');
        navigate('/');
        return;
      }

      const { destination, days, budget, travelStyle } = searchData;

      const prompt = { destination, days, budget, travelStyle };

      try {
        const token = localStorage.getItem('token'); // Pegar o token do usuário logado
        const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decodificar o token JWT
        const usuarioId = decoded ? decoded.id : null;

        const response = await fetch('http://localhost:5000/api/travel/generate-itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prompt),
        });

        const data = await response.json();
        setResult(data);

        // Registrar no log
        await logRequest(
          usuarioId,
          'POST /travel/generate-itinerary',
          JSON.stringify(prompt),
          JSON.stringify(data)
        );
      } catch (error) {
        console.error('Erro ao buscar resultados:', error);

        // Registrar erro no log
        await logRequest(
          null,
          'POST /travel/generate-itinerary',
          JSON.stringify(prompt),
          `Erro: ${error.message}`
        );
      } finally {
        setLoading(false); // Oculta o spinner após a conclusão da requisição
      }
    };

    fetchData();
  }, [navigate]);

  // Formata o texto para aplicar negrito em partes entre "**"
  const formatText = (text) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index}>
            {part.replace(/\*\*/g, '')}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      <div className="iconone" onClick={() => navigate('/')}>
        <TbSquareArrowLeftFilled size={40} color="#fff" />
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Carregando resultados...</p>
        </div>
      ) : result ? (
        <div className="resultado-container">
          <h2>Resultado para {result.destination}</h2>
          <h3>Roteiro:</h3>
          <div className="formatted-text">
            {formatText(result.itinerary)}
          </div>
        </div>
      ) : (
        <p className="error-text">Erro ao carregar os resultados. Tente novamente mais tarde.</p>
      )}
    </>
  );
};

export default Resultado;
