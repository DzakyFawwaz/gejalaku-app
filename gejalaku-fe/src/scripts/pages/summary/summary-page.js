import SummaryPresenter from './summary-presenter';

export default class SummaryPage {
  constructor(container) {
    this.container = container;
    this.summary = null;
    this.presenter = null;
  }

  updateSummaryData(data) {
    this.summary = data;
  }

  async showError(message) {
    const errorHtml = `
        <main class="max-w-xl flex-auto mx-auto py-8 text-center"><p class="text-red-600 bg-red-100 p-4 rounded-lg">${message}</p></main>
    `;

    const appContainer = document.querySelector('main');
    appContainer.outerHTML = errorHtml;
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.#setupEventListeners();
    // this.container.innerHTML = errorHtml;
  }

  renderSymptoms() {
    console.log({ summary: this.summary });

    if (!this.summary || !this.summary['symptoms']) {
      return '';
    }

    const symptoms = this.summary['symptoms'];
    const symptomsHtml = symptoms
      .map(
        (s) =>
          `<span class="bg-gray-200 text-gray-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">${s.name}</span>`,
      )
      .join('');
    return `
      <section class="bg-white rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">Gejala yang Dilaporkan</h2>
        <div class="px-4 py-4 flex flex-wrap">
          ${symptomsHtml}
        </div>
      </section>
    `;
  }

  renderPredictedCondition() {
    if (!this.summary) return '';
    const { predictedDisease, confidence } = this.summary;
    const probability = parseFloat(confidence);
    const confidenceText = probability > 0.7 ? 'Tinggi' : probability > 0.4 ? 'Sedang' : 'Rendah';
    const color = probability > 0.7 ? 'green' : probability > 0.4 ? 'yellow' : 'red';

    return `
      <section class="bg-white rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">Hasil Prediksi</h2>
        <div class="px-4 py-3">
            <div class="flex justify-between items-center">
                <span class="font-semibold text-xl text-gray-800">${predictedDisease}</span>
                <span class="text-sm font-medium text-${color}-800 bg-${color}-100 rounded-full px-3 py-1">${(probability * 100).toFixed(0)}% (${confidenceText})</span>
            </div>
        </div>
      </section>
    `;
  }

  renderConditionDetails() {
    if (!this.summary || !this.summary || !this.summary.details) return '';
    const { details, predictedDisease } = this.summary;

    const description = details.description?.Description || 'Informasi tidak tersedia.';
    const precautions = details.precautions
      ? Object.values(details.precautions).filter((p) => p !== predictedDisease)
      : [];
    const medications = details.drugs?.drug ? [details.drugs.drug] : [];

    const precautionsHtml =
      precautions.length > 0
        ? precautions.map((item) => `<li>${item}</li>`).join('')
        : '<li>Informasi tidak tersedia.</li>';
    const medicationsHtml =
      medications.length > 0
        ? medications.map((item) => `<li>${item}</li>`).join('')
        : '<li>Informasi tidak tersedia.</li>';

    return `
        <div class="space-y-4">
            <h2 class="text-2xl font-bold text-gray-900 px-1">Detail untuk: ${predictedDisease}</h2>
            <section class="bg-white rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">Deskripsi</h3>
                <p class="text-gray-700 text-base px-4 py-3 leading-relaxed">${description}</p>
            </section>
            <section class="bg-white rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">Pencegahan & Penanganan</h3>
                <div class="text-gray-700 text-base px-4 py-3 leading-relaxed">
                  <ul class="list-disc list-inside space-y-1">${precautionsHtml}</ul>
                </div>
            </section>
            <section class="bg-white rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">Obat yang Mungkin Disarankan</h3>
                <ul class="list-disc list-inside text-gray-700 text-base px-4 py-3 space-y-1">${medicationsHtml}</ul>
            </section>
        </div>
    `;
  }

  renderActions() {
    return `
      <button id="home-button" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3">Kembali ke Beranda</button>
      <button id="print-button" class="w-full border border-blue-400 text-blue-600 font-semibold rounded-md py-3 hover:bg-blue-50">Download Hasil Analisa</button>
      <button id="check-symptom-button" class="w-full border border-gray-300 text-gray-900 font-semibold rounded-md py-3 hover:bg-gray-100">Cek Gejala Lain</button>
    `;
  }

  render() {
    let content;
    if (!this.summary) {
      content = `<main class="max-w-xl flex-auto mx-auto py-8 text-center"><p>Data prediksi tidak ditemukan.</p></main>`;
    } else {
      content = `
          <main class="max-w-xl flex-auto mx-auto py-6 space-y-4">
            ${this.renderSymptoms()}
            ${this.renderPredictedCondition()}
            
            <hr class="my-6 border-t border-gray-300">

            ${this.renderConditionDetails()}

            <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800 mt-6">
              <strong class="font-semibold">Sanggahan Medis:</strong> Informasi ini hanya untuk tujuan edukasi dan bukan pengganti nasihat medis profesional. Selalu konsultasikan dengan penyedia layanan kesehatan untuk masalah medis.
            </div>

            <div class="space-y-3 pt-4">
              ${this.renderActions()}
            </div>
          </main>
        `;
    }

    return content;
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

  async rerenderContent() {
    const appContainer = document.querySelector('main');
    appContainer.outerHTML = await this.render();
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.#setupEventListeners();
  }

  async afterRender() {
    this.presenter = new SummaryPresenter({ view: this });
    this.rerenderContent();

    try {
      const historyData = await this.getPredictions();
      let id = null;

      if (window.location.hash) {
        const match = window.location.hash.match(/[?&]id=([^&]+)/);
        if (match) {
          id = parseInt(match[1], 10); // Ensure ID is an integer
        }
      }

      if (id === null) {
        this.showError('ID prediksi tidak ditemukan di URL.');
        return;
      }

      const prediction = historyData.find((history) => history.id === id);

      console.log({ id, prediction, historyData });

      if (prediction) {
        this.summary = prediction;
        await this.rerenderContent();
      } else {
        // For demonstration, if ID not found, use a mock based on new structure
        console.warn(`Data prediksi dengan ID "${id}" tidak ditemukan. Menggunakan data contoh.`);
        await this.rerenderContent();
      }
    } catch (error) {
      console.error('Gagal memuat data prediksi:', error);
      this.showError('Gagal mengambil data dari database. Silakan coba lagi.');
    }
  }

  #setupEventListeners() {
    const printButton = document.getElementById('print-button');
    if (printButton) {
      printButton.addEventListener('click', () => {
        this.presenter.handlePrint();
      });
    }

    const homeButton = document.getElementById('home-button');
    if (homeButton) {
      homeButton.addEventListener('click', () => {
        this.presenter.navigateToHome();
      });
    }

    const checkSymptomButton = document.getElementById('check-symptom-button');
    if (checkSymptomButton) {
      checkSymptomButton.addEventListener('click', () => {
        this.presenter.navigateToCheckSymptom();
      });
    }
  }
}
