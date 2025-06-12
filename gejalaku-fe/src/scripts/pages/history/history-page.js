import HistoryPresenter from './history-presenter';

export default class HistoryPage {
  #presenter = null;

  showError(message) {
    const listContainer = document.querySelector('#history-list-container');
    if (listContainer) {
      listContainer.innerHTML = `<p class="text-center text-red-600">${message}</p>`;
    }
  }

  showEmpty() {
    const listContainer = document.querySelector('#history-list-container');
    if (listContainer) {
      listContainer.innerHTML = `
        <div class="text-center py-10 px-4">
            <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-800">Tidak Ada Riwayat</h3>
            <p class="text-gray-500 mt-2">Anda belum memiliki riwayat analisa gejala. Mulai cek gejala untuk melihat riwayat Anda di sini.</p>
        </div>
        `;
    }
  }

  renderHistoryList(historyData) {
    const listContainer = document.querySelector('#history-list-container');
    if (!listContainer) return;

    const historyHtml = historyData
      .map((item) => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const { predictedDisease, confidence, symptoms = [] } = item;
        const probability = parseFloat(confidence);
        const color = probability > 0.7 ? 'green' : probability > 0.4 ? 'yellow' : 'red';

        const symptomsToShow = symptoms.slice(0, 3);
        const remainingSymptoms = symptoms.length - symptomsToShow.length;

        const symptomsHtml = symptomsToShow
          .map(
            (s) =>
              `<span class="bg-gray-200 text-gray-700 text-xs font-medium mr-2 px-2.5 py-1 rounded-full">${s.name}</span>`,
          )
          .join('');
        const moreSymptomsHtml =
          remainingSymptoms > 0
            ? `<span class="text-sm text-gray-500 font-medium">+${remainingSymptoms} lagi</span>`
            : '';

        return `
          <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div class="p-6">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <p class="text-sm text-gray-500">${formattedDate} - ${formattedTime}</p>
                  <h3 class="text-xl font-bold text-gray-900 mt-1">${predictedDisease}</h3>
                </div>
                <div class="text-sm font-medium text-${color}-800 bg-${color}-100 rounded-full px-3 py-1 whitespace-nowrap">${(probability * 100).toFixed(0)}% Keyakinan</div>
              </div>

              <div class="mt-5 pt-4 border-t border-gray-200">
                <p class="text-sm font-semibold text-gray-600 mb-3">Gejala yang dilaporkan:</p>
                <div class="flex flex-wrap items-center">
                  ${symptomsHtml}
                  ${moreSymptomsHtml}
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-6 py-4">
              <button data-id="${item.id}" class="view-detail-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Lihat Detail Analisa
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    listContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        ${historyHtml}
      </div>
    `;
    this.#setupEventListeners();
  }

  render() {
    return `
        <main class="max-w-7xl mx-auto py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight mb-8">Riwayat Analisa Anda</h1>
            <div id="history-list-container">
                <p class="text-center text-gray-500">Memuat riwayat...</p>
            </div>
        </main>
    `;
  }

  afterRender() {
    this.#presenter = new HistoryPresenter({ view: this });
    this.#presenter.loadHistory();
  }

  #setupEventListeners() {
    const detailButtons = document.querySelectorAll('.view-detail-btn');
    detailButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = event.currentTarget.dataset.id;
        this.#presenter.navigateToSummary(id);
      });
    });
  }
}
