const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "model.json"), "utf8")
);
const modelPath = `file://${path.resolve(__dirname, config.MODEL_PATH)}`;

let model;
let symptomsList;
let labelMapping;
let diseaseInfo;

const initializeService = async () => {
  console.log("🚀 Memulai inisialisasi layanan prediksi...");
  try {
    const symptomsPath = path.resolve(__dirname, config.SYMPTOMS_LIST);
    const labelsPath = path.resolve(__dirname, config.LABELS);

    symptomsList = JSON.parse(fs.readFileSync(symptomsPath, "utf8"));
    labelMapping = JSON.parse(fs.readFileSync(labelsPath, "utf8"));
    console.log(
      `✅ Artefak dimuat: ${symptomsList.length} gejala, ${
        Object.keys(labelMapping).length
      } penyakit.`
    );

    const descriptionsPath = path.resolve(
      __dirname,
      config.DISEASE_DESCRIPTIONS
    );
    const precautionsPath = path.resolve(__dirname, config.DISEASE_PRECAUTIONS);
    const drugsPath = path.resolve(__dirname, config.DISEASE_DRUGS);

    const descriptions = JSON.parse(fs.readFileSync(descriptionsPath, "utf-8"));
    const precautions = JSON.parse(fs.readFileSync(precautionsPath, "utf-8"));
    const drugs = JSON.parse(fs.readFileSync(drugsPath, "utf-8"));

    diseaseInfo = {};
    Object.keys(labelMapping).forEach((key) => {
      const diseaseName = String(labelMapping[key]);
      diseaseInfo[diseaseName] = {
        description:
          descriptions.find((desc) => desc["Disease"] == diseaseName) ||
          "Deskripsi tidak tersedia.",
        precautions: precautions.find(
          (prec) => prec["Disease"] == diseaseName
        ) || ["Informasi pencegahan tidak tersedia."],
        drugs: drugs.find((drug) => drug["disease"] == diseaseName) || [
          "Konsultasikan dengan dokter untuk rekomendasi obat.",
        ],
      };
    });

    console.log("✅ Data informasi penyakit berhasil dimuat.");

    console.log(`Memuat model dari: ${modelPath}`);
    model = await tf.loadGraphModel(modelPath);

    tf.tidy(() => {
      model.predict(tf.zeros([1, symptomsList.length]));
    });

    console.log("✅ Model berhasil dimuat dan siap digunakan.");
    console.log("🎉 Layanan prediksi berhasil diinisialisasi!");
  } catch (error) {
    console.error("❌ Gagal total saat inisialisasi layanan:", error);
    process.exit(1);
  }
};

const predict = async (symptoms) => {
  if (!model || !symptomsList || !labelMapping) {
    console.error(
      "Model atau artefak belum diinisialisasi. Jalankan initializeService() terlebih dahulu."
    );
    throw new Error("Layanan prediksi belum siap. Silakan coba lagi sesaat.");
  }

  return tf.tidy(() => {
    const inputVector = symptomsList.map((symptom) =>
      symptoms.includes(symptom) ? 1 : 0
    );
    const inputTensor = tf.tensor2d([inputVector]);
    const prediction = model.predict(inputTensor);
    const predictionData = prediction.dataSync();
    const predictedIndex = prediction.argMax(1).dataSync()[0];

    const predictedDisease = labelMapping[predictedIndex];
    const confidence = predictionData[predictedIndex];

    // console.log({ diseaseInfo });

    const details = diseaseInfo[predictedDisease] || {
      description: "Informasi detail tidak ditemukan.",
      precautions: [],
      drugs: [],
    };

    const symptompList = symptoms.map((symptom) => ({
      id: symptom,
      name: symptom.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    }));

    return {
      predictedDisease,
      confidence: confidence.toFixed(4),
      details,
      symptoms: symptompList,
      // diseaseInfo
    };
  });
};

const getAllSymptoms = () => {
  const symptompList = symptomsList.map((symptom) => ({
    id: symptom,
    name: symptom.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  return { symptoms: symptompList };
};

const getAllSymptomsByBodyPart = () => {
  if (!symptomsList) {
    throw new Error("Daftar gejala belum dimuat.");
  }

  // TODO : penambahan klasifikasi nantinya akan secara otomatis melalui backend dan machine learning
  const bodyPartKeywords = {
    kepala: ["kepala", "pusing", "penglihatan"],
    pernapasan: ["batuk", "napas", "dada", "bersin", "paru"],
    pencernaan: ["mual", "muntah", "diare", "perut", "lambung", "usus"],
    kulit: ["ruam", "gatal", "kulit", "bintik", "kemerahan"],
    umum: ["demam", "lemas", "berat_badan", "depresi", "nyeri"],
    tenggorokan: ["tenggorokan", "dahak", "dehidrasi", "radang"],
    mata: ["mata", "penglihatan"],
    hidung: ["hidung", "pilek"],
    mulut: ["mulut", "lidah", "gigi"],
  };

  const classified = {};
  symptomsList.forEach((symptom) => {
    let foundPart = "lainnya";
    for (const [part, keywords] of Object.entries(bodyPartKeywords)) {
      if (keywords.some((kw) => symptom.includes(kw))) {
        foundPart = part;
        break;
      }
    }
    if (!classified[foundPart]) classified[foundPart] = [];
    classified[foundPart].push({
      id: symptom,
      name: symptom.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    });
  });

  return { symptomsByBodyPart: classified };
};

module.exports = {
  initializeService,
  getAllSymptoms,
  predict,
  symptomsList,
  getAllSymptomsByBodyPart,
};
