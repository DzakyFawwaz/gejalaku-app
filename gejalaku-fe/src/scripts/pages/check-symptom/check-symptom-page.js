import CheckSymptomPresenter from './check-symptom-presenter';
import * as PredictApi from '../../data/predict-api';

export default class CheckSymptomPage {
  allSymptoms = [];
  selectedSymptoms = [];
  symptomsByCategory = [];
  symptomSearchQuery = '';
  isDropdownVisible = false;

  #presenter = null;
  #content = null;

  renderSelectedSymptoms() {
    if (this.selectedSymptoms.length === 0) {
      return `<li class="px-4 py-8 text-center text-gray-400 text-sm">Belum ada gejala yang dipilih.</li>`;
    }
    return this.selectedSymptoms
      .map(
        (symptom) => `
            <li class="flex justify-between items-center px-4 py-3 text-gray-800 text-md transition-all hover:bg-gray-50">
                <span class="font-medium">${symptom?.name}</span>
                <button type="button" aria-label="Hapus ${symptom?.name}" class="text-gray-400 hover:text-red-500 transition-colors remove-symptom-btn" data-symptom-id="${symptom?.id}">
                    <i class="fas fa-times"></i>
                </button>
            </li>
        `,
      )
      .join('');
  }

  renderSymptomCategories() {
    if (!this.symptomsByCategory) {
      return '<p class="text-gray-500">Memuat kategori gejala...</p>';
    }

    // Check if mobile view (screen width <= 640px)
    const isMobile = window.innerWidth <= 640;
    const categories =
      isMobile && this.symptomsByCategory['umum']
        ? { umum: this.symptomsByCategory['umum'] }
        : this.symptomsByCategory;

    return Object.entries(categories)
      .map(([category, symptoms]) => {
        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

        const symptomsHtml = symptoms
          .map((symptom) => {
            const isSelected = this.selectedSymptoms.some((s) => s.id === symptom.id);
            return `
                        <button
                            type="button"
                            class="flex items-center gap-2 rounded-full text-sm px-4 py-2 transition-all common-symptom-btn
                                ${
                                  isSelected
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                }"
                            data-symptom='${JSON.stringify(symptom)}'
                        >
                            ${symptom.name} 
                            ${isSelected ? '<i class="fas fa-check text-sm"></i>' : '<i class="fas fa-plus text-sm"></i>'}
                        </button>
                    `;
          })
          .join('');

        return `
                <section class="flex flex-col gap-4">
                    <h2 class="font-semibold text-lg text-gray-800 capitalize">${categoryTitle}</h2>
                    <div class="flex flex-wrap gap-3">
                        ${symptomsHtml}
                    </div>
                </section>
            `;
      })
      .join('');
  }

  renderAutocompleteSuggestions() {
    console.log({ sym: this.allSymptoms });
    const filtered = this.allSymptoms.filter((s) =>
      s.name.toLowerCase().includes(this.symptomSearchQuery.toLowerCase()),
    );

    if (filtered.length === 0 && this.symptomSearchQuery) {
      return `<div class="p-4 text-sm text-gray-500">Gejala tidak ditemukan.</div>`;
    }

    return filtered
      .map((symptom) => {
        const isSelected = this.selectedSymptoms.some((s) => s.id === symptom.id);
        return `
        <div 
            class="px-4 py-2 text-md cursor-pointer hover:bg-blue-50 autocomplete-item ${isSelected ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}"
            data-symptom='${JSON.stringify(symptom)}'
            data-selected="${isSelected}"
        >
            ${symptom.name}
        </div>`;
      })
      .join('');
  }

  async render() {
    return `     
      <div class="w-full max-w-7xl mx-auto flex-auto py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-5 lg:gap-12">
        <div class="lg:col-span-3 flex flex-col gap-10">
          <div class="mb-4">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Cek Gejala Kesehatan Anda</h1>
          <p class="text-gray-600 mt-3 text-lg">Pilih gejala yang Anda rasakan untuk mendapatkan analisa kemungkinan penyebabnya. Semakin banyak gejala, semakin akurat hasilnya.</p>
          </div>
          
          <div class="sticky top-0 z-10 py-6 -my-6">
          <label 
            for="symptoms-input" 
            class="block font-semibold text-lg text-gray-800 mb-3 bg-white/40 py-1 backdrop-blur-md w-fit rounded-lg"
            style="backdrop-filter: blur(8px);"
          >
            Cari Semua Gejala
          </label>
          <section>
            <form id="symptom-form" autocomplete="off" onsubmit="return false;">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="fas fa-search text-gray-400"></i>
              </div>
              <input
                id="symptoms-input"
                type="text"
                placeholder="Contoh: Sakit kepala, demam, batuk..."
                class="w-full rounded-lg border border-gray-300 bg-white/60 backdrop-blur-md py-3 px-4 text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                value="${this.symptomSearchQuery}"
              />
              <div id="autocomplete-suggestions" class="autocomplete-suggestions absolute z-20 w-full mt-2 bg-white/60 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60 ${!this.isDropdownVisible ? 'hidden' : ''}">
              ${this.renderAutocompleteSuggestions()}
              </div>
            </div>
            </form>
          </section>
          </div>

          <div id="symptom-categories-container" class="flex flex-col gap-8">
          ${this.renderSymptomCategories()}
          </div>
        </div>

        <aside class="lg:col-span-2 mt-10 lg:mt-0 sticky top-8">
          <div class="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md sticky top-8">
          <div class="flex justify-between items-center mb-5">
            <h2 class="font-bold text-xl text-gray-800">Gejala Saya</h2>
            <span class="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">${this.selectedSymptoms.length} Dipilih</span>
          </div>
          <ul class="bg-white/40 backdrop-blur rounded-lg border border-gray-200 divide-y divide-gray-200 max-h-96 overflow-y-auto" id="selected-symptoms-list">
            ${this.renderSelectedSymptoms()}
          </ul>
          <div class="mt-6">
            <div class="flex justify-between items-center text-sm text-gray-600 mb-2 px-1 select-none">
              <span>Langkah 1 dari 2</span>
              <span class="font-semibold">50%</span>
            </div>
            <div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full w-1/2 bg-blue-600 rounded-full transition-all"></div>
            </div>
          </div>
          <button 
            id="check-symptom-button" 
            class="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            ${this.selectedSymptoms.length === 0 ? 'disabled' : ''}
            >
            Analisa Gejalaku
          </button>
          <button 
            id="back-to-home" 
            class="w-full text-black cursor-pointer border border-transparent hover:border hover:border-gray-500 py-3 rounded-lg mt-3 transition-all duration-200"
            >
            Kembali ke Beranda
          </button>
          </div>
        </aside>
        </div>
      </main>
      `;
  }

  async afterRender() {
    this.#presenter = new CheckSymptomPresenter({
      view: this,
      model: PredictApi,
    });

    await this.#presenter.fetchSymptoms();

    document.querySelector('main').innerHTML = await this.render();
    this.#setup();
  }

  #setup() {
    const backbutton = document.getElementById('back-to-home');
    if (backbutton) {
      backbutton.onclick = () => {
        window.location.href = '/';
      };
    }
    document.querySelectorAll('.common-symptom-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const symptom = JSON.parse(btn.getAttribute('data-symptom'));
        const isSelected = this.selectedSymptoms.some((s) => s.id === symptom.id);

        if (isSelected) {
          this.#presenter.removeSymptom(symptom.id);
        } else {
          this.#presenter.addSymptom(symptom);
        }
      });
    });

    document.querySelectorAll('.remove-symptom-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const symptomId = btn.getAttribute('data-symptom-id');
        this.#presenter.removeSymptom(symptomId);
      });
    });

    const input = document.getElementById('symptoms-input');
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');
    let activeIndex = -1;

    if (input && suggestionsContainer) {
      const updateSuggestions = () => {
        suggestionsContainer.innerHTML = this.renderAutocompleteSuggestions();
        activeIndex = -1;
      };

      const setActiveSuggestion = () => {
        const items = suggestionsContainer.querySelectorAll('.autocomplete-item');
        items.forEach((item, index) => {
          item.classList.toggle('suggestion-active', index === activeIndex);
        });
        if (items[activeIndex]) {
          items[activeIndex].scrollIntoView({ block: 'nearest' });
        }
      };

      input.addEventListener('focus', () => {
        this.isDropdownVisible = true;
        suggestionsContainer.classList.remove('hidden');
        updateSuggestions();
      });

      input.addEventListener('blur', () => {
        setTimeout(() => {
          this.isDropdownVisible = false;
          suggestionsContainer.classList.add('hidden');
          activeIndex = -1;
        }, 150);
      });

      input.addEventListener('input', (e) => {
        this.symptomSearchQuery = e.target.value;
        if (!this.isDropdownVisible) {
          this.isDropdownVisible = true;
          suggestionsContainer.classList.remove('hidden');
        }
        updateSuggestions();
      });

      input.addEventListener('keydown', (e) => {
        const items = suggestionsContainer.querySelectorAll(
          '.autocomplete-item:not(.cursor-not-allowed)',
        );
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeIndex = (activeIndex + 1) % items.length;
          setActiveSuggestion();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeIndex = (activeIndex - 1 + items.length) % items.length;
          setActiveSuggestion();
        } else if (e.key === 'Enter' || e.key === 'Tab') {
          input.focus();
          if (this.isDropdownVisible && activeIndex > -1) {
            e.preventDefault();
            items[activeIndex].dispatchEvent(new Event('mousedown', { bubbles: true }));
          }
        }
      });

      suggestionsContainer.addEventListener('mousedown', (e) => {
        const item = e.target.closest('.autocomplete-item');
        if (item && item.dataset.selected === 'false') {
          const symptom = JSON.parse(item.getAttribute('data-symptom'));
          this.symptomSearchQuery = '';
          this.#presenter.addSymptom(symptom);
        }
      });
    }

    document.getElementById('check-symptom-button').addEventListener('click', async () => {
      this.#presenter.analyzeSymptoms();
    });
  }

  async rerender() {
    const appContainer = document.querySelector('main');
    appContainer.innerHTML = await this.render();
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.#setup();
  }
}
