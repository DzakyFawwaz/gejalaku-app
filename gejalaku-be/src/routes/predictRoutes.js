const Joi = require("joi");
const { handlePredict } = require("../controllers/predictController");
const { ALL_MODEL_SYMPTOMS_ARRAY } = require("../services/predictService");

console.log(ALL_MODEL_SYMPTOMS_ARRAY);


module.exports = [  
    {
        method: "POST",
        path: "/predict",
        handler: handlePredict,
        options: {
            // validate: {
            //     payload: Joi.object({
            //         selected_symptoms: Joi.array().items(
            //             Joi.string().valid(...ALL_MODEL_SYMPTOMS_ARRAY) // Validasi bahwa gejala yang dikirim ada di daftar
            //         ).min(1).required() // Minimal 1 gejala dipilih
            //     })
            // },
            cors: { // Aktifkan CORS jika frontend dan backend beda origin
                origin: ['*'], // Ganti dengan domain frontend Anda untuk produksi
                // credentials: 'true' // Jika perlu
            }
        }
    }
];
  