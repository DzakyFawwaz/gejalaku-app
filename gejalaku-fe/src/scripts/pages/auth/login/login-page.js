export default class LoginPage {
  async render() {
    return `
        <main class="mx-auto max-w-md flex justify-center mt-16">
            <form class="w-full" action="#" method="POST">
                <label
                for="email"
                class="block mb-1 text-gray-900 font-semibold text-sm"
                >Email</label
                >
                <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                class="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                />
                <label
                for="password"
                class="block mb-1 text-gray-900 font-semibold text-sm"
                >Password</label
                >
                <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                class="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                />
                <div class="flex items-center mb-6">
                <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="remember" class="ml-2 block text-gray-700 text-sm"
                    >Remember me</label
                >
                </div>
                <button
                id="login-button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                Log In
                </button>
                <p class="text-center text-gray-700 text-sm">
                Don't have an account?
                <a
                    href="register-page.html"
                    class="text-blue-600 font-semibold hover:underline"
                    >Register</a
                >
                </p>
            </form>
        </main>
    `;
  }

  afterRender() {
    document.getElementById("login-button").addEventListener("click", () => {
      window.location.href = "home-page.html";
    });
  }
}
