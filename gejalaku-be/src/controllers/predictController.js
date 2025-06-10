// src/handlers/predictionHandler.js
const mlService = require("../services/predictService");
// const dbService = require('../services/dbService'); // Jika Anda punya layanan DB

async function handlePredict(request, h) {
  const { symptoms } = request.payload || {};

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return h
      .response({
        error: "Input tidak valid. Harap berikan array gejala (symptoms).",
      })
      .code(400);
  }

  try {
    const result = await mlService.predict(symptoms);

    if (result && result.error) {
      return h.response(result).code(503);
    }

    return h.response(result).code(200);
  } catch (error) {
    console.error("Error saat melakukan diagnosis:", error);
    return h
      .response({ error: "Terjadi kesalahan di server." })
      .code(500);
  }
}

module.exports = {
  handlePredict,
};
