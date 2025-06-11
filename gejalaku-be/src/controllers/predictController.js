const mlService = require("../services/predictService");
const {
  doc,
  getFirestore,
  setDoc,
  getDocs,
  collection,
} = require("firebase/firestore");
const { firebaseApp } = require("../services/firebaseService");

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

    // const db = getFirestore(firebaseApp);

    // const userId = request.auth?.credentials?.user?.id || "guest";
    // const predictionId = Date.now().toString();

    // await setDoc(doc(db, "predictions", predictionId), {
    //   userId,
    //   symptoms,
    //   result,
    //   createdAt: new Date().toISOString(),
    // });

    return h.response(result).code(200);
  } catch (error) {
    console.error("Error saat melakukan diagnosis:", error);
    return h.response({ error: "Terjadi kesalahan di server." }).code(500);
  }
};

const getAllPredictions = async (request, h) => {
  try {
    const db = getFirestore(firebaseApp);
    const predictions = [];
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      predictions.push({ id: doc.id, ...doc.data() });
    });

    return h.response(predictions).code(200);
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return h.response({ error: "Terjadi kesalahan di server." }).code(500);
  }
};

module.exports = {
  handlePredict,
  getAllPredictions,
};
