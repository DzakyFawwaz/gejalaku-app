// src/services/mlService.js
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const ALL_MODEL_SYMPTOMS = path.resolve(__dirname, '../../../gejalaku-ml/symptoms.txt')
const allSymptomsRaw = fs.readFileSync(ALL_MODEL_SYMPTOMS, 'utf8');
const ALL_MODEL_SYMPTOMS_ARRAY = allSymptomsRaw.split('\n').map(s => s.trim()).filter(Boolean);

let model;
let labels;

async function loadModel() {
    try {
        const modelJsonPath = path.resolve(__dirname, '../../../gejalaku-ml/tfjs_model/model.json');
        console.log(`Mencoba memuat model dari: file://${modelJsonPath}`); 
        model = await tf.loadLayersModel(`file://${modelJsonPath}`);
        console.log('Model TFJS berhasil dimuat.');
    } catch (error) {
        console.error('Gagal memuat model TFJS:', error);
        throw error; 
    }
}

function loadLabels() {
    try {
        const labelsPath = path.resolve(__dirname, '../../../gejalaku-ml/labels.txt');
        console.log(`Mencoba memuat labels dari: ${labelsPath}`); 
        const rawLabels = fs.readFileSync(labelsPath, 'utf8');
        labels = rawLabels.split('\n').map(label => label.trim()).filter(label => label);
        console.log('Labels berhasil dimuat.');
    } catch (error) {
        console.error('Gagal memuat labels.txt:', error);
        throw error;
    }
}

function preprocessInput(selectedSymptoms) {

    const inputVector = ALL_MODEL_SYMPTOMS_ARRAY.map(symptom =>
        selectedSymptoms.includes(symptom) ? 1 : 0
    );

    // Model mungkin mengharapkan input dalam bentuk tertentu (misalnya, [1, num_symptoms])
    // Sesuaikan dimensi tensor sesuai kebutuhan model Anda.
    // Contoh: jika model menerima tensor 2D dengan shape [1, jumlah_gejala]
    return tf.tensor2d([inputVector]);
}

function predict(inputTensor) {

    console.log({model})

    if (!model) {
        throw new Error('Model belum dimuat.');
    }
    const prediction = model.predict(inputTensor);
    return prediction; // Ini adalah tensor output dari model
}

function postprocessOutput(predictionTensor) {
    // Misal output model adalah probabilitas untuk setiap kelas penyakit
    // Kita ambil index dengan probabilitas tertinggi
    const outputArray = predictionTensor.arraySync()[0]; // Ambil array dari tensor output, misal shape [1, num_classes]
    const predictedIndex = outputArray.indexOf(Math.max(...outputArray));

    if (labels && labels[predictedIndex]) {
        return labels[predictedIndex]; // Kembalikan nama penyakit dari labels.txt
    }
    return "Penyakit tidak diketahui"; // Fallback
}

module.exports = {
    loadModel,
    loadLabels,
    preprocessInput,
    predict,
    postprocessOutput,
    ALL_MODEL_SYMPTOMS_ARRAY 
};