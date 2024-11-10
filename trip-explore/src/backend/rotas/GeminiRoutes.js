const express = require('express');
const router = express.Router();
const GeminiController = require('../controles/GeminiController');

// Rota para gerar roteiro básico
router.post('/generate-itinerary', GeminiController.generateItinerary);

// Rota para gerar roteiro detalhado com preferências
router.post('/generate-detailed-itinerary', GeminiController.generateDetailedItinerary);

// Rota para sugestões de pontos turísticos
router.post('/tourist-attractions', GeminiController.getTouristAttractions);

// Rota para dicas de viagem específicas
router.post('/travel-tips', GeminiController.getTravelTips);

module.exports = router;