export default class RegisterPage {
  async render() {
    return `
            <main class="flex justify-center mt-10 px-4">
                <form class="w-full max-w-md" novalidate>
                    <div class="mb-5">
                    <label
                        for="email"
                        class="block text-gray-900 text-sm font-semibold mb-1"
                        >Email</label
                    >
                    <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>
                    <div class="mb-5">
                    <label
                        for="password"
                        class="block text-gray-900 text-sm font-semibold mb-1"
                        >Password</label
                    >
                    <input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>
                    <div class="mb-1">
                    <label
                        for="confirm-password"
                        class="block text-gray-900 text-sm font-semibold mb-1"
                        >Confirm Password</label
                    >
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>
                    <p class="text-xs text-green-600 flex items-center mb-5">
                    <i class="fas fa-check mr-1"></i> Passwords match
                    </p>
                    <button
                    id="register-button
                    type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                    Register
                    </button>
                    <p class="text-center text-gray-600 text-sm mt-4">
                    Already have an account?
                    <a
                        href="./login-page.html"
                        class="text-blue-600 font-semibold hover:underline"
                        >Login</a
                    >
                    </p>
                </form>
            </main>
        `;
  }

  afterRender() {
    document.getElementById("register-button").addEventListener("click", () => {
      window.location.href = "home-page.html";
    });
  }
}
