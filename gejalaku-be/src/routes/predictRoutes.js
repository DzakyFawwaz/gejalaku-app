const { handlePredict } = require("../controllers/predictController");
const {
  ALL_MODEL_SYMPTOMS_ARRAY,
  getAllSymptoms,
  getAllSymptomsByBodyPart,
} = require("../services/predictService");

module.exports = [
  {
    method: "GET",
    path: "/symptoms",
    handler: getAllSymptoms,
  },
  {
    method: "GET",
    path: "/symptoms-by-bodypart",
    handler: getAllSymptoms,
  },
  {
    method: "POST",
    path: "/predict-symptoms",
    handler: handlePredict,
  },
  // {
  //   method: "GET",
  //   path: "/predictions",
  //   handler: getAllPredictions,
  // },
];
