import { BASE_URL } from '../config';

const ENDPOINTS = {
  // Auth
  SYMTOPMS_BY_BODYPART: `${BASE_URL}/symptoms-by-bodypart`,
  PREDICT_SYMPTOMS: `${BASE_URL}/predict-symptoms`,
};

export async function getAllSymptomsByBodyPart() {
  const fetchResponse = await fetch(ENDPOINTS.SYMTOPMS_BY_BODYPART);

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function predictSymptoms(symptoms) {
  const fetchResponse = await fetch(ENDPOINTS.PREDICT_SYMPTOMS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symptoms: symptoms,
    }),
    mode: 'cors',
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
