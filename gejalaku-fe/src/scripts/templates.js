export function generateUnauthenticatedNavigationListTemplate() {
  return `
  <li><a tabIndex="-1" id="navlist-login" href="#/login" class="text-blue-600 text-sm font-normal hover:underline cursor-pointer">Login</a></li>
  <li><a tabIndex="-1" id="register-button" href="#/register" class="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Register</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
  <li><a tabIndex="-1" id="view-home-button" href="#/" class="text-sm font-normal hover:underline cursor-pointer">Home</a></li>
  <li>•</li>
  <li><a tabIndex="-1" id="view-home-button" href="#/check-symptom" class="text-sm font-normal hover:underline cursor-pointer">Cek Gejala</a></li>
  <li>•</li>
  <li><a tabIndex="-1" id="view-history-button" href="#/history" class="text-sm font-normal hover:underline cursor-pointer">Riwayat Medis</a></li>
  <li>•</li>
  <li><a tabIndex="-1" id="view-history-button" href="#/about" class="text-sm font-normal hover:underline cursor-pointer">Tentang Kami</a></li>
  <li>•</li>
  <li><a tabIndex="-1" id="logout-button" href="#/login" class="text-red-600 text-sm font-normal hover:underline cursor-pointer">Logout</a></li>
  `;
}

export const generateUnauthenticatedNavigationListMainTemplate = () => {
  return `
    <div id="navlist-main" class="flex items-center space-x-3">
      <img id="navlist-logo" src="images/logo-with-text.png" alt="GejalaKu Logo" class="max-h-26">
    </div>
    `;
};
