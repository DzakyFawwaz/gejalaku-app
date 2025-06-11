// const Joi = require("joi");
const { handlePredict } = require("../controllers/predictController");
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
    path: "/predict",
    handler: handlePredict,
    // options: {
    //   validate: {
    //     payload: Joi.object({
    //       symptoms: Joi.array()
    //         .items(Joi.string().valid(...ALL_MODEL_SYMPTOMS_ARRAY))
    //         .min(1)
    //         .required()
    //         .messages({
    //           "array.base": `"selected_symptoms" harus berupa array.`,
    //           "array.min": `"selected_symptoms" minimal harus memiliki 1 gejala.`,
    //           "any.required": `"selected_symptoms" wajib diisi.`,
    //           "string.base": `Setiap gejala harus berupa string.`,
    //           "any.only": `Gejala yang dipilih harus sesuai dengan daftar gejala yang tersedia.`,
    //         }),
    //     }),
    //   },
    //   cors: {
    //     origin: ["*"],
    //   },
    // },
  },
];
