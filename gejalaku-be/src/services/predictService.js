const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Load paths from model.json
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "model.json"), "utf8")
);

const ALL_MODEL_SYMPTOMS = path.resolve(__dirname, config.ALL_MODEL_SYMPTOMS);
const allSymptomsRaw = fs.readFileSync(ALL_MODEL_SYMPTOMS, "utf8");
const ALL_MODEL_SYMPTOMS_ARRAY = allSymptomsRaw
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

let model;
let symptomsList;
let labelMapping;
let diseaseInfo;

// --- FASE 2: Data Informasi Penyakit ---
const loadDiseaseInfo = () => {
  try {
    const descriptions = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, config.DISEASE_DESCRIPTIONS),
        "utf-8"
      )
    );
    const precautions = JSON.parse(
      fs.readFileSync(path.join(__dirname, config.DISEASE_PRECAUTIONS), "utf-8")
    );
    const drugs = JSON.parse(
      fs.readFileSync(path.join(__dirname, config.DISEASE_DRUGS), "utf-8")
    );

    diseaseInfo = {};
    Object.keys(descriptions).forEach((disease) => {
      diseaseInfo[disease] = {
        description: descriptions[disease] || "Deskripsi tidak tersedia.",
        precautions: precautions[disease] || [
          "Informasi pencegahan tidak tersedia.",
        ],
        drugs: drugs[disease] || [
          "Konsultasikan dengan dokter untuk rekomendasi obat.",
        ],
      };
    });
    console.log("✅ Data informasi penyakit berhasil dimuat.");
  } catch (error) {
    console.error("❌ Gagal memuat data informasi penyakit:", error);
    diseaseInfo = {}; // Fallback dengan data kosong
  }
};

// --- FASE 3: Fungsi untuk Memuat Model dan Artefak ---
async function loadModelAndArtifacts() {
  try {
    const modelPath = `file://${path.join(__dirname, config.MODEL_PATH)}`;
    model = await tf.loadLayersModel(modelPath);
    console.log("✅ Model TensorFlow.js berhasil dimuat.");

    const artifactsDir = path.join(__dirname, config.ARTIFACTS_DIR);

    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }

    const symptomsPath = path.join(__dirname, config.SYMPTOMS_LIST);
    const labelsPath = path.join(__dirname, config.LABELS);

    if (fs.existsSync(symptomsPath)) {
      symptomsList = JSON.parse(fs.readFileSync(symptomsPath, "utf8"));
      console.log(`✅ Artefak gejala dimuat (${symptomsList.length} gejala).`);
    } else {
      console.warn(
        "⚠️ Peringatan: file 'symptoms_list.json' tidak ditemukan. Diagnosis mungkin tidak akurat."
      );
      symptomsList = []; // Fallback
    }

    if (fs.existsSync(labelsPath)) {
      labelMapping = JSON.parse(fs.readFileSync(labelsPath, "utf8"));
      console.log(
        `✅ Artefak label penyakit dimuat (${
          Object.keys(labelMapping).length
        } penyakit).`
      );
    } else {
      console.warn(
        "⚠️ Peringatan: file 'labels.json' tidak ditemukan. Diagnosis mungkin tidak akurat."
      );
      labelMapping = {}; // Fallback
    }
  } catch (error) {
    console.error(
      '❌ Gagal memuat model TensorFlow.js atau artefaknya. Pastikan folder "gejalaku_model_tfjs" sudah benar.',
      error
    );
  }
}

const predict = async (symptoms) => {
  if (!model || !symptomsList || !labelMapping) {
    return {
      error: "Model sedang dimuat atau gagal dimuat. Silakan coba lagi nanti.",
    };
  }

  const inputVector = symptomsList.map((symptom) =>
    symptoms.includes(symptom) ? 1 : 0
  );

  const inputTensor = tf.tensor2d([inputVector]);
  const prediction = model.predict(inputTensor);
  const predictionData = await prediction.data();

  const predictedIndex = prediction.as1D().argMax().dataSync()[0];
  const predictedDisease = labelMapping[predictedIndex];
  const confidence = predictionData[predictedIndex];

  const details = diseaseInfo[predictedDisease] || {
    description: "Informasi detail tidak ditemukan.",
    precautions: [],
    drugs: [],
  };

  tf.dispose([inputTensor, prediction]);

  return {
    predictedDisease,
    confidence: confidence.toFixed(4),
    details: details,
  };
};

module.exports = {
  predict,
  symptomsList,
  labelMapping,
  loadDiseaseInfo,
  loadModelAndArtifacts,
  ALL_MODEL_SYMPTOMS_ARRAY,
};
