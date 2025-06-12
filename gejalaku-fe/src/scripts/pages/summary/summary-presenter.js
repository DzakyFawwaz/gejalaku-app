export default class SummaryPresenter {
  #view;
  summary = null;

  constructor({ view, model }) {
    this.#view = view;
  }

  async loadSummaryFromDB() {
    try {
      const historyData = await this.getPredictions();
      let id = null;
      if (window.location.hash) {
        const match = window.location.hash.match(/[?&]id=([^&]+)/);
        if (match) id = parseInt(match[1], 10);
      }
      if (id === null) {
        this.#view.showError('ID prediksi tidak ditemukan di URL.');
        return;
      }
      const prediction = historyData.find((history) => history.id === id);

      if (prediction) {
        this.#view.summary = prediction;
        await this.#view.rerenderContent();
      } else {
        this.#view.showError('Data prediksi tidak ditemukan.');
      }
    } catch (error) {
      this.#view.showError('Gagal mengambil data dari database. Silakan coba lagi.');
    }
  }

  async getPredictions() {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('SymptomAnalyzerDB', 1);
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('predictions')) {
          db.createObjectStore('predictions', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
    const transaction = db.transaction(['predictions'], 'readonly');
    const store = transaction.objectStore('predictions');
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  handlePrint() {
    try {
      window.print();
    } catch (error) {
      this.#view.showError('Failed to print results.');
    }
  }

  navigateToHome() {
    window.location.hash = '/';
  }

  navigateToCheckSymptom() {
    window.location.hash = '/check-symptom';
  }
}
