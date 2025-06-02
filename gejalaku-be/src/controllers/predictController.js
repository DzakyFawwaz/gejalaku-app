// src/handlers/predictionHandler.js
const mlService = require('../services/predictService');
// const dbService = require('../services/dbService'); // Jika Anda punya layanan DB

async function handlePredict(request, h) {
    try {
        const { selected_symptoms } = request.payload;

    

        // 1. Preprocess input
        const inputTensor = mlService.preprocessInput(selected_symptoms);

        // 2. Get prediction from model
        const predictionTensor = mlService.predict(inputTensor);

        // 3. Postprocess output
        const predictedDiseaseName = mlService.postprocessOutput(predictionTensor);

        // (Opsional) 4. Ambil detail penyakit dari database
        // let diseaseDetails = {};
        // if (dbService && predictedDiseaseName !== "Penyakit tidak diketahui") {
        //     diseaseDetails = await dbService.getDiseaseDetailsByName(predictedDiseaseName);
        // }
        // Rencana awal menyebutkan deskripsi, pencegahan, dan obat diambil dari dataset terpisah [cite: 21]
        // Ini bisa diimplementasikan dengan mengambilnya dari DB di sini.

        // Bersihkan tensor untuk membebaskan memori
        inputTensor.dispose();
        predictionTensor.dispose();

        return h.response({
            status: 'success',
            message: 'Prediksi berhasil.',
            data: {
                predicted_disease: predictedDiseaseName,
                // ...diseaseDetails // gabungkan detail dari DB
                // Tambahkan deskripsi, pencegahan, obat yang sesuai dengan predictedDiseaseName
            }
        }).code(200);

    } catch (error) {
        console.error('Error during prediction:', error);
        // Kirim error yang lebih spesifik jika perlu
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi.',
        }).code(500);
    }
}

module.exports = {
    handlePredict
};