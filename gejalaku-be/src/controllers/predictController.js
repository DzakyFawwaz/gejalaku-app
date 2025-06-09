// src/handlers/predictionHandler.js
const mlService = require("../services/predictService");
// const dbService = require('../services/dbService'); // Jika Anda punya layanan DB

async function handlePredict(req, res) {
  const { symptoms } = req.body;

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({
      error: "Input tidak valid. Harap berikan array gejala (symptoms).",
    });
  }

  try {
    // Call predict and get the result object
    const result = await mlService.predict(symptoms);

    // If predict returns an error object, handle it
    if (result && result.error) {
      return res.status(503).json(result);
    }

    // Return the prediction result
    res.status(200).json(result);
  } catch (error) {
    console.error("Error saat melakukan diagnosis:", error);
    res.status(500).json({ error: "Terjadi kesalahan di server." });
  }
}

module.exports = {
  handlePredict,
};
