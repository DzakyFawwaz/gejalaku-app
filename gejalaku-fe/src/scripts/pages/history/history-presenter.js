export default class HistoryPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async loadHistory() {
    try {
      const historyData = await this.getPredictions();

      if (historyData && historyData.length > 0) {
        const sortedData = historyData.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
        this.#view.renderHistoryList(sortedData);
      } else {
        this.#view.showEmpty();
      }
    } catch (error) {
      console.error('Error loading history:', error);
      this.#view.showError('Gagal memuat riwayat analisa.');
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

  navigateToSummary(id) {
    window.location.hash = `/summary?id=${id}`;
  }
}
