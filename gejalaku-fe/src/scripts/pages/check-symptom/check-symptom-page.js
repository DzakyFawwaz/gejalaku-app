export default class CheckSymptomPage {
  constructor() {
    this.commonSymptoms = [
      'Fever',
      'Headache',
      'Cough',
      'Fatigue',
      'Sore Throat',
      'Dizziness',
      'Nausea',
    ];
    this.selectedSymptoms = [];
  }

  renderSelectedSymptoms() {
    if (this.selectedSymptoms.length === 0) {
      return `<li class="px-4 py-3 text-gray-400 text-md">No symptoms selected.</li>`;
    }
    return this.selectedSymptoms
      .map(
        (symptom) => `
                <li class="flex justify-between items-center px-4 py-3 text-gray-700 text-md">
                    ${symptom}
                    <button type="button" aria-label="Remove ${symptom}" class="text-gray-400 hover:text-gray-600 remove-symptom-btn" data-symptom="${symptom}">
                        <i class="fas fa-times"></i>
                    </button>
                </li>
            `,
      )
      .join('');
  }

  renderCommonSymptoms() {
    return this.commonSymptoms
      .map(
        (symptom) => `
                <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1 common-symptom-btn"
                    data-symptom="${symptom}"
                    ${this.selectedSymptoms.includes(symptom) ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}
                >
                    ${symptom} <i class="fas fa-plus text-sm"></i>
                </button>
            `,
      )
      .join('');
  }

  async render() {
    return `
            <main class="max-w-md mx-auto py-8">
                <form class="flex flex-col gap-6" id="symptom-form" autocomplete="off">
                    <div class="w-full max-w-md mx-auto">
                        <label for="symptoms" class="sr-only">What symptoms are you experiencing?</label>
                        <div class="relative w-full">
                            <input
                                id="symptoms"
                                type="search"
                                placeholder="What symptoms are you experiencing?"
                                class="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                autocomplete="off"
                            />
                            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                    </div>

                    <section>
                        <h2 class="font-semibold text-md text-gray-800 mb-2">Common Symptoms</h2>
                        <div class="flex flex-wrap gap-2" id="common-symptoms-list">
                            ${this.renderCommonSymptoms()}
                        </div>
                    </section>

                    <section>
                        <h2 class="font-semibold text-md text-gray-800 mb-2">Selected Symptoms</h2>
                        <ul class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200 max-w-md" role="list" id="selected-symptoms-list">
                            ${this.renderSelectedSymptoms()}
                        </ul>
                    </section>

                    <section>
                        <h2 class="font-semibold text-md text-gray-800 mb-2">Additional Information</h2>
                        <div class="bg-white rounded-lg border border-gray-200 max-w-md p-4 mb-6">
                            <label for="duration" class="block mb-2 text-sm text-gray-700 font-normal">How long have you been experiencing these symptoms?</label>
                            <select id="duration" name="duration" class="w-full rounded-md border border-gray-300 py-2 px-3 text-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option>Less than 24 hours</option>
                                <option>1-3 days</option>
                                <option>More than 3 days</option>
                            </select>
                        </div>
                        <div class="bg-white rounded-lg border border-gray-200 max-w-md p-4">
                            <label for="severity" class="block mb-2 text-sm text-gray-700 font-normal">Severity (1-10)</label>
                            <input id="severity" type="range" min="1" max="10" value="5" class="w-full accent-blue-600" />
                            <div class="flex justify-between text-[10px] text-gray-500 mt-1 px-1 select-none">
                                <span>Mild</span>
                                <span>Moderate</span>
                                <span>Severe</span>
                            </div>
                        </div>
                    </section>
                </form>
                <button id="check-symptom-button" class="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-5">
                    Analisa Gejalaku
                </button>
                <div class="max-w-md flex justify-between items-center text-sm text-gray-500 mt-2 px-1 select-none">
                    <span>Step 1 of 2</span>
                    <div class="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div class="h-full w-10 bg-blue-600 rounded-full"></div>
                    </div>
                </div>
            </main>
        `;
  }

  async afterRender() {
    this.#setup();
  }

  #setup() {
    const rerender = async () => {
      document.querySelector('main').outerHTML = await this.render();
      this.afterRender();
    };

    // Add symptom from common symptoms
    document.querySelectorAll('.common-symptom-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const symptom = btn.getAttribute('data-symptom');
        if (!this.selectedSymptoms.includes(symptom)) {
          this.selectedSymptoms.push(symptom);
          rerender();
        }
      });
    });

    // Remove symptom from selected list
    document.querySelectorAll('.remove-symptom-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const symptom = btn.getAttribute('data-symptom');
        this.selectedSymptoms = this.selectedSymptoms.filter((s) => s !== symptom);
        rerender();
      });
    });

    // Add symptom from input
    const input = document.getElementById('symptoms');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const value = input.value.trim();
          if (value && !this.selectedSymptoms.includes(value)) {
            this.selectedSymptoms.push(value);
            input.value = '';
            rerender();
          }
        }
      });
    }

    // Button navigation
    document.getElementById('check-symptom-button').addEventListener('click', () => {
      window.location.hash = '/analyzing';
    });
  }
}
