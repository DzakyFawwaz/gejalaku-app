const { handlePredict } = require("../controllers/predictController");
const {
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
    handler: getAllSymptomsByBodyPart,
  },
  {
    method: "POST",
    path: "/predict-symptoms",
    handler: handlePredict,
  },
];
