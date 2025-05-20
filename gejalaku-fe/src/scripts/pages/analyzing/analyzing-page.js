export default class AnalyzingSymptomPage {
  async render() {
    return `
        <main class="text-center px-4">
            <div
                class="mx-auto mb-6 w-24 h-24 rounded-full bg-[#d6e4ff] flex items-center justify-center"
            >
                <svg
                class="animate-spin text-[#3b82f6]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                width="48"
                height="48"
                aria-hidden="true"
                >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
                </svg>
            </div>
            <p class="font-semibold text-[#111827] mb-4 text-base">
                Analyzing your symptoms...
            </p>
            <div class="w-64 h-2 bg-[#e5e7eb] rounded-full mx-auto mb-6">
                <div class="h-2 bg-[#3b82f6] rounded-full w-44"></div>
            </div>
            <p class="text-[#4b5563] text-sm mb-1">
                Matching with possible conditions...
            </p>
            <p class="text-[#4b5563] text-sm mb-1">Preparing your results...</p>
            <p class="text-[#4b5563] text-sm mb-6">This will only take a moment</p>
            <a href="analyze-result-page.html" class="text-[#6b7280] text-xs"
                >Tap to speed up (demo only)</a
            >
        </main>
    `;
  }

  afterRender() {
    setTimeout(() => {
      window.location.href = 'analyze-result-page.html';
    }, 3000);
  }
}
