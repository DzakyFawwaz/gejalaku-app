export default class SummaryPage {
  constructor() {
    this.summary = null;
    this.presenter = null;
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  updateSummaryData(data) {
    this.summary = data;
  }

  showError(message) {
    console.error(message);
  }

  renderCondition() {
    if (!this.summary) return '';

    return `
      <section class="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm">
        <div>
          <p class="text-lg font-semibold text-gray-900 mb-1">
            Kondisi Potensial
          </p>
          <a href="#" class="text-blue-700 font-bold text-base leading-tight">
            ${this.summary.condition}
          </a>
        </div>
        <span class="text-md text-green-800 bg-green-100 rounded-full px-3 py-1">
          ${this.summary.confidence}
        </span>
      </section>
    `;
  }

  renderDescription() {
    if (!this.summary) return '';

    return `
      <section class="bg-white rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">
          Deskripsi Kondisi
        </h2>
        <p class="text-gray-700 text-lg px-4 py-3 leading-relaxed">
          ${this.summary.description}
        </p>
      </section>
    `;
  }

  renderTreatments() {
    if (!this.summary) return '';

    return `
      <section class="bg-white rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">
          Penanganan Utama
        </h2>
        <div class="text-gray-700 text-lg px-4 py-3 leading-relaxed">
          <p>
            Tidak ada obat untuk flu biasa. Antibiotik tidak efektif terhadap virus flu. Penanganan ditujukan untuk meredakan gejala:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            ${this.summary.treatments.map((treatment) => `<li>${treatment}</li>`).join('')}
          </ul>
        </div>
      </section>
    `;
  }

  renderPreventions() {
    if (!this.summary) return '';

    return `
      <section class="bg-white rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3">
          Langkah Pencegahan
        </h2>
        <ul class="list-disc list-inside text-gray-700 text-lg px-4 py-3 space-y-1">
          ${this.summary.preventions.map((prevention) => `<li>${prevention}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  renderMedications() {
    if (!this.summary) return '';

    return `
      <section class="bg-white rounded-lg border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Obat Bebas yang Dapat Digunakan
        </h3>
        <ul class="list-disc list-inside text-gray-700 text-md space-y-1">
          ${this.summary.medications.map((medication) => `<li>${medication}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  renderActions() {
    return `
      <button id="home-button" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3">
        Kembali ke Beranda
      </button>
      <button id="print-button" class="w-full border border-blue-400 text-blue-600 font-semibold rounded-md py-3 hover:bg-blue-50">
        Download Hasil Analisa
      </button>
      <button id="check-symptom-button" class="w-full border border-gray-300 text-gray-900 font-semibold rounded-md py-3 hover:bg-gray-100">
        Cek Gejala Lain
      </button>
    `;
  }

  async render() {
    await this.presenter.loadData();

    return `
      <main class="max-w-xl mx-auto py-4 space-y-4">
        ${this.renderCondition()}
        ${this.renderDescription()}
        ${this.renderTreatments()}
        ${this.renderPreventions()}
        ${this.renderMedications()}

        <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-md text-yellow-800">
          <strong class="font-semibold">Medical Disclaimer:</strong> Informasi ini hanya 
          untuk tujuan edukasi dan bukan pengganti nasihat medis profesional. Selalu 
          konsultasikan dengan penyedia layanan kesehatan untuk masalah medis.
        </div>

        <div class="space-y-3 mt-6">
          ${this.renderActions()}
        </div>
      </main>
    `;
  }

  async afterRender() {
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    document.getElementById('print-button').addEventListener('click', () => {
      this.presenter.handlePrint();
    });

    document.getElementById('home-button').addEventListener('click', () => {
      this.presenter.navigateToHome();
    });

    document.getElementById('check-symptom-button').addEventListener('click', () => {
      this.presenter.navigateToCheckSymptom();
    });
  }
}
