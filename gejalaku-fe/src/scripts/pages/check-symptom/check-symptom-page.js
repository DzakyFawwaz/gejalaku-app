export default class CheckSymptomPage {
  async render() {
    return `
        <main class="max-w-md mx-auto py-8">
            <form class="flex flex-col gap-6">
                <div class="w-full max-w-md mx-auto">
                <label for="symptoms" class="sr-only"
                    >What symptoms are you experiencing?</label
                >
                <div class="relative w-full">
                    <input
                    id="symptoms"
                    type="search"
                    placeholder="What symptoms are you experiencing?"
                    class="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span
                    class="absolute inset-y-0 left-3 flex items-center text-gray-400"
                    >
                    <i class="fas fa-search"></i>
                    </span>
                </div>
                </div>

                <section>
                <h2 class="font-semibold text-md text-gray-800 mb-2">
                    Common Symptoms
                </h2>
                <div class="flex flex-wrap gap-2">
                    <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1"
                    >
                    Fever <i class="fas fa-times text-sm"></i>
                    </button>
                    <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1"
                    >
                    Headache <i class="fas fa-times text-sm"></i>
                    </button>
                    <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1"
                    >
                    Cough <i class="fas fa-times text-sm"></i>
                    </button>
                    <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1"
                    >
                    Fatigue <i class="fas fa-times text-sm"></i>
                    </button>
                    <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1"
                    >
                    Sore Throat <i class="fas fa-times text-sm"></i>
                    </button>
                    <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1"
                    >
                    Dizziness <i class="fas fa-times text-sm"></i>
                    </button>
                    <button
                    type="button"
                    class="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-sm px-3 py-1"
                    >
                    Nausea <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
                </section>

                <section>
                <h2 class="font-semibold text-md text-gray-800 mb-2">
                    Selected Symptoms
                </h2>
                <ul
                    class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200 max-w-md"
                    role="list"
                >
                    <li
                    class="flex justify-between items-center px-4 py-3 text-gray-700 text-md"
                    >
                    Headache
                    <button
                        type="button"
                        aria-label="Remove Headache"
                        class="text-gray-400 hover:text-gray-600"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                    </li>
                    <li
                    class="flex justify-between items-center px-4 py-3 text-gray-700 text-md"
                    >
                    Fever
                    <button
                        type="button"
                        aria-label="Remove Fever"
                        class="text-gray-400 hover:text-gray-600"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                    </li>
                </ul>
                </section>

                <section>
                <h2 class="font-semibold text-md text-gray-800 mb-2">
                    Additional Information
                </h2>
                <div
                    class="bg-white rounded-lg border border-gray-200 max-w-md p-4 mb-6"
                >
                    <label
                    for="duration"
                    class="block mb-2 text-sm text-gray-700 font-normal"
                    >How long have you been experiencing these symptoms?</label
                    >
                    <select
                    id="duration"
                    name="duration"
                    class="w-full rounded-md border border-gray-300 py-2 px-3 text-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <option>Less than 24 hours</option>
                    <option>1-3 days</option>
                    <option>More than 3 days</option>
                    </select>
                </div>

                <div class="bg-white rounded-lg border border-gray-200 max-w-md p-4">
                    <label
                    for="severity"
                    class="block mb-2 text-sm text-gray-700 font-normal"
                    >Severity (1-10)</label
                    >
                    <input
                    id="severity"
                    type="range"
                    min="1"
                    max="10"
                    value="5"
                    class="w-full accent-blue-600"
                    />
                    <div
                    class="flex justify-between text-[10px] text-gray-500 mt-1 px-1 select-none"
                    >
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                    </div>
                </div>
                </section>
            </form>
            <button
                id="check-symptom-button"
                class="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
            >
                Analisa Gejalaku
            </button>

            <div
                class="max-w-md flex justify-between items-center text-sm text-gray-500 mt-2 px-1 select-none"
            >
                <span>Step 1 of 2</span>
                <div class="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div class="h-full w-10 bg-blue-600 rounded-full"></div>
                </div>
            </div>
        </main>
    `;
  }

  afterRender() {
    document
      .getElementById("check-symptom-button")
      .addEventListener("click", () => {
        window.location.href = "analyze-symptom-page.html";
      });
  }
}
