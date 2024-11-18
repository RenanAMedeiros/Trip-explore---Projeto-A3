const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

class GeminiController {
    // Gerar roteiro básico
    static async generateItinerary(req, res) {
        try {
            const { destination, days, budget, travelStyle } = req.body;

            if (!destination || !days) {
                return res.status(400).json({ error: 'Destino e número de dias são obrigatórios' });
            }

            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            const prompt = `
                Gere um roteiro de viagem detalhado para ${destination} com as seguintes características:
                - Duração: ${days} dias
                - Orçamento: R$ ${budget || 'flexível'} 
                - Estilo de viagem: ${travelStyle || 'misto'}

                Por favor, inclua:
                1. Melhor época para visitar
                2. Roteiro dia a dia com:
                   - Principais atrações
                   - Sugestões de restaurantes
                   - Tempo estimado em cada local
                3. Dicas de transporte
                4. Estimativa de custos
                5. Dicas de segurança
                
                Formato o roteiro de forma clara e organizada.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const itinerary = response.text();

            res.json({
                destination,
                days,
                itinerary
            });

        } catch (error) {
            console.error('Erro ao gerar roteiro:', error);
            res.status(500).json({ error: 'Erro ao gerar roteiro de viagem' });
        }
    }

    // Gerar roteiro detalhado com preferências específicas
    static async generateDetailedItinerary(req, res) {
        try {
            const {
                destination,
                days,
                budget,
                interests,
                accommodation,
                transportation,
                dietaryRestrictions,
                accessibility
            } = req.body;

            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            const prompt = `
                Crie um roteiro de viagem personalizado e detalhado para ${destination} considerando:

                Informações básicas:
                - Duração: ${days} dias
                - Orçamento: R$ ${budget} 
                - Interesses: ${interests.join(', ')}
                - Tipo de acomodação preferida: ${accommodation}
                - Meio de transporte preferido: ${transportation}
                ${dietaryRestrictions ? `- Restrições alimentares: ${dietaryRestrictions}` : ''}
                ${accessibility ? `- Necessidades de acessibilidade: ${accessibility}` : ''}

                Inclua no roteiro:
                1. Análise do melhor período para a viagem
                2. Onde se hospedar
                3. Roteiro diário detalhado com:
                   - Atrações adequadas aos interesses
                   - Restaurantes (considerando restrições alimentares)
                   - Tempo de deslocamento entre locais
                   - Horários de funcionamento
                4. Opções de transporte
                5. Orçamento detalhado em Real(R$)
                6. Dicas culturais e de segurança
                7. Documentos necessários
                8. Contatos de emergência importantes

                Por favor, organize o roteiro de forma clara e prática.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const detailedItinerary = response.text();

            res.json({
                destination,
                days,
                detailedItinerary
            });

        } catch (error) {
            console.error('Erro ao gerar roteiro detalhado:', error);
            res.status(500).json({ error: 'Erro ao gerar roteiro detalhado' });
        }
    }

    // Obter sugestões de pontos turísticos
    static async getTouristAttractions(req, res) {
        try {
            const { destination, interests, timeAvailable } = req.body;

            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            const prompt = `
                Liste os melhores pontos turísticos em ${destination} considerando:
                - Interesses: ${interests.join(', ')}
                - Tempo disponível: ${timeAvailable}

                Para cada atração, forneça:
                1. Nome
                2. Descrição breve
                3. Tempo sugerido de visita
                4. Melhor horário para visitar
                5. Preço médio
                6. Dicas importantes
                7. Como chegar
                8. Avaliação geral (1-5 estrelas)
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const attractions = response.text();

            res.json({
                destination,
                attractions
            });

        } catch (error) {
            console.error('Erro ao buscar atrações:', error);
            res.status(500).json({ error: 'Erro ao buscar pontos turísticos' });
        }
    }

    // Obter dicas de viagem específicas
    static async getTravelTips(req, res) {
        try {
            const { destination, season, travelType } = req.body;

            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            const prompt = `
                Forneça dicas detalhadas de viagem para ${destination}, considerando:
                - Época: ${season}
                - Tipo de viagem: ${travelType}

                Inclua:
                1. O que levar na mala
                2. Documentação necessária
                3. Vacinas recomendadas
                4. Dicas culturais importantes
                5. Cuidados com segurança
                6. Questões climáticas
                7. Custos médios de:
                   - Alimentação
                   - Transporte
                   - Acomodação
                   - Atrações
                8. Palavras e frases úteis no idioma local
                9. Apps úteis para a viagem
                10. Números de emergência locais
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const tips = response.text();

            res.json({
                destination,
                season,
                travelType,
                tips
            });

        } catch (error) {
            console.error('Erro ao buscar dicas:', error);
            res.status(500).json({ error: 'Erro ao buscar dicas de viagem' });
        }
    }
}

module.exports = GeminiController;