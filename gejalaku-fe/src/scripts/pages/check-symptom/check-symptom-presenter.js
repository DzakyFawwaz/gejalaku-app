export default class CheckSymptomPresenter {
  #view;
  #model;
  allSymptoms = [];
  selectedSymptoms = [];
  symptomsByCategory = null;
  symptomSearchQuery = '';
  isDropdownVisible = false;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async fetchSymptoms() {
    try {
      const res = await this.#model.getAllSymptomsByBodyPart();
      if (res.ok) {
        const sympomsByBodypart = res['symptomsByBodyPart'];

        this.#view.symptomsByCategory = sympomsByBodypart;
        this.#view.allSymptoms = Object.entries(sympomsByBodypart)
          .filter(([key]) => key !== 'umum')
          .flatMap(([, symptoms]) => symptoms);
      } else {
        console.warn(`Fetch symptoms failed: response not ok`);
      }
    } catch (e) {
      console.error(`Error at fetch symptoms: ${e.message}`);
    }
  }

  addSymptom(symptom) {
    if (symptom && !this.#view.selectedSymptoms.some((s) => s.id === symptom.id)) {
      this.#view.selectedSymptoms.push(symptom);
      this.#view.rerender();
    }
  }

  removeSymptom(symptomId) {
    this.selectedSymptoms = this.selectedSymptoms.filter((s) => s.id !== symptomId);
    this.#view.rerender(this);
  }

  setSearchQuery(query) {
    this.symptomSearchQuery = query;
    this.isDropdownVisible = true;
    this.#view.rerender(this);
  }

  async analyzeSymptoms() {
    try {
      const payload = this.#view.selectedSymptoms.map((s) => s.id);
      const res = await this.#model.predictSymptoms(payload);

      if (res.ok) {
        const predictionData = {
          ...res,
          timestamp: new Date().toISOString(),
        };
        const savedId = await this.savePrediction(predictionData);
        window.location.hash = `/summary?id=${savedId}`;
      }
    } catch (error) {
      console.error(`Error saat analisa : ${error.message}`);
      alert('Gagal menyimpan hasil analisa. Silakan coba lagi.');
    }
  }

  async savePrediction(predictionData) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('SymptomAnalyzerDB', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('predictions')) {
          db.createObjectStore('predictions', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['predictions'], 'readwrite');
        const store = transaction.objectStore('predictions');
        const addRequest = store.add(predictionData);

        addRequest.onsuccess = () => resolve(addRequest.result);
        addRequest.onerror = (event) => reject(event.target.error);
      };

      request.onerror = (event) => reject(event.target.error);
    });
  }
}
