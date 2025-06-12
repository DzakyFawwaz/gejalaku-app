const mlService = require("../services/predictService");

const handlePredict = async (request, h) => {
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
    return h.response({ error: "Terjadi kesalahan di server." }).code(500);
  }
};

const handleSymptomsByBodypart = async (request, h) => {
  try {
    const symptoms = await mlService.getAllSymptomsByBodyPart();
    return h.response(symptoms).code(200);
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return h.response({ error: "Terjadi kesalahan di server." }).code(500);
  }
};

module.exports = {
  handlePredict,
  handleSymptomsByBodypart,
};
