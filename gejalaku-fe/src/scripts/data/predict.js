import { BASE_URL } from '../config';

const ENDPOINTS = {
  // Auth
  SYMTOPMS_BY_BODYPART: `${BASE_URL}/symptoms-by-bodypart`,
  PREDICT_SYMPTOMS: `${BASE_URL}/predict-symptoms`,
};

export async function getAllSymptomsByBodyPart() {
  const fetchResponse = await fetch(SYMTOPMS_BY_BODYPART);

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function predictSymptoms(symptoms) {
  const data = JSON.stringify(symptoms);

  const fetchResponse = await fetch(PREDICT_SYMPTOMS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symptoms: this.selectedSymptoms.map((s) => s.id),
    }),
    mode: 'cors',
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
