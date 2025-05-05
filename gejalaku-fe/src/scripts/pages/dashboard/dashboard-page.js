export default class DashboardPage {
  async render() {
    return `
        <main class="flex-grow flex flex-col justify-center items-center px-4 text-center max-w-md mx-auto">
            <div class="mb-6">
                <div
                class="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center mx-auto"
                >
                <i class="fas fa-heartbeat text-blue-600 text-4xl"></i>
                </div>
            </div>
            <h2 class="font-semibold text-gray-900 text-lg leading-6 mb-2">
                Check your symptoms, get instant health insights
            </h2>
            <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                <span class="font-normal">GejalaKu</span> helps you understand your
                symptoms and guides you on your next steps.
            </p>
            <button
                class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mb-2 hover:bg-blue-700 transition"
            >
                Login
            </button>
            <button
                class="w-full border border-blue-600 text-blue-600 font-normal py-2 rounded-md hover:bg-blue-50 transition"
            >
                Register
            </button>
        </main>
    `;
  }
}
