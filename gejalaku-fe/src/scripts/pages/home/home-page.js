export default class HomePage {
  async render() {
    return `
        <main class="flex-grow flex flex-col items-center pt-8 px-4">
            <button
                id="check-symptom-button"
                class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-8 py-3 w-full max-w-md"
                type="button"
            >
                <i class="fas fa-wave-square text-xl"></i>
                <span>Cek Gejalaku</span>
            </button>

            <section class="w-full max-w-md mt-8">
                <h1 class="font-semibold text-gray-900 mb-2 text-xl">
                Recent Health Checks
                </h1>
                <button
                class="w-full bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-3 flex justify-between items-center text-left hover:shadow-md"
                type="button"
                >
                <div>
                    <p class="font-semibold text-gray-900 text-lg leading-tight">
                    Headache &amp; Fever
                    </p>
                    <p class="text-gray-500 mt-0.5">2 days ago</p>
                </div>
                <i class="fas fa-chevron-right text-gray-400 text-lg"></i>
                </button>
            </section>

            <section class="w-full max-w-md mt-8">
                <h2 class="font-semibold text-gray-900 mb-2 text-xl">Health Tips</h2>
                <div
                class="bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-4 text-gray-700"
                >
                <p class="font-semibold text-gray-900 text-lg leading-tight mb-1">
                    Stay Hydrated
                </p>
                <p class="text-md mt-4">
                    Drinking enough water each day is crucial for many reasons: to
                    regulate body temperature, keep joints lubricated, prevent
                    infections, deliver nutrients to cells, and keep organs functioning
                    properly.
                </p>
                </div>
            </section>
        </main>
    `;
  }

  async afterRender() {
    document
      .getElementById("check-symptom-button")
      .addEventListener("click", () => {
        window.location.href = "check-symptom-page.html";
      });
  }
}
