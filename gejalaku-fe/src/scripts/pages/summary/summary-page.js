export default class SummaryPage {
  async render() {
    return `
        <main class="max-w-xl mx-auto py-4 space-y-4">
            <section
                class="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm"
            >
                <div>
                <p class="text-lg font-semibold text-gray-900 mb-1">
                    Potential Condition
                </p>
                <a href="#" class="text-blue-700 font-bold text-base leading-tight"
                    >Common Cold</a
                >
                </div>
                <span class="text-md text-green-800 bg-green-100 rounded-full px-3 py-1"
                >High Confidence</span
                >
            </section>

            <section class="bg-white rounded-lg shadow-sm">
                <h2
                class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3"
                >
                Condition Description
                </h2>
                <p class="text-gray-700 text-lg px-4 py-3 leading-relaxed">
                The common cold is a viral infection of your nose and throat (upper
                respiratory tract). It's usually harmless, although it might not feel
                that way. Many types of viruses can cause a common cold.
                </p>
            </section>

            <section class="bg-white rounded-lg shadow-sm">
                <h2
                class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3"
                >
                Primary Treatment
                </h2>
                <div class="text-gray-700 text-lg px-4 py-3 leading-relaxed">
                <p>
                    There's no cure for the common cold. Antibiotics are of no use
                    against cold viruses. Treatment is directed at relieving signs and
                    symptoms:
                </p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                    <li>Rest and stay hydrated</li>
                    <li>Use over-the-counter pain relievers</li>
                    <li>Use decongestants or saline nasal drops</li>
                </ul>
                </div>
            </section>

            <section class="bg-white rounded-lg shadow-sm">
                <h2
                class="text-lg font-semibold text-gray-900 border-b border-gray-200 px-4 py-3"
                >
                Prevention Measures
                </h2>
                <ul
                class="list-disc list-inside text-gray-700 text-lg px-4 py-3 space-y-1"
                >
                <li>Wash your hands thoroughly and often</li>
                <li>Avoid touching your face with unwashed hands</li>
                <li>Disinfect frequently touched surfaces</li>
                <li>Don't share drinking glasses or utensils</li>
                <li>Stay home when you're sick</li>
                </ul>
            </section>

            <section class="bg-white rounded-lg border border-gray-200 p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Over-the-counter Medications
                </h3>
                <ul class="list-disc list-inside text-gray-700 text-md space-y-1">
                <li>Acetaminophen (Tylenol, others) for fever and pain</li>
                <li>Ibuprofen (Advil, Motrin IB, others) for inflammation</li>
                <li>Pseudoephedrine (Sudafed) for nasal congestion</li>
                <li>Loratadine (Claritin) for allergic rhinitis</li>
                </ul>
            </section>

            <div
                class="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-md text-yellow-800"
            >
                <strong class="font-semibold">Medical Disclaimer:</strong> This
                information is for educational purposes only and not a substitute for
                professional medical advice. Always consult with a healthcare provider
                for medical concerns.
            </div>

            <button
                id="home-button"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3"
            >
                Kembali ke Beranda
            </button>
            <button
                id="print-button"
                class="w-full border border-blue-400 text-blue-600 font-semibold rounded-md py-3 hover:bg-blue-50"
            >
                Download Hasil Analisa
            </button>
            <button
                id="check-symptom-button"
                class="w-full border border-gray-300 text-gray-900 font-semibold rounded-md py-3 hover:bg-gray-100"
            >
                Cek Gejala Lain
            </button>
        </main>
    `;
  }

  async afterRender() {
    document.getElementById('print-button').addEventListener('click', () => {
      window.print();
    });
    document.getElementById('home-button').addEventListener('click', () => {
      window.location.href = 'home-page.html';
    });
    document.getElementById('check-symptom-button').addEventListener('click', () => {
      window.location.href = 'check-symptom-page.html';
    });
  }
}
