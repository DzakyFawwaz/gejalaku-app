// const Joi = require("joi");
const {
  handlePredict,
  getAllPredictions,
} = require("../controllers/predictController");
const {
  ALL_MODEL_SYMPTOMS_ARRAY,
  getAllSymptoms,
  getAllSymptomsByBodyPart,
} = require("../services/predictService");

console.log(ALL_MODEL_SYMPTOMS_ARRAY);

module.exports = [
  {
    method: "GET",
    path: "/symptoms",
    handler: getAllSymptoms,
  },
  {
    method: "GET",
    path: "/symptoms-by-bodypart",
    handler: getAllSymptomsByBodyPart,
  },
  {
    method: "POST",
    path: "/predict-symptoms",
    handler: handlePredict,
  },
  {
    method: "GET",
    path: "/predictions",
    handler: getAllPredictions,
  },
];
