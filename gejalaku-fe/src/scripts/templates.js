export function generateUnauthenticatedNavigationListTemplate() {
  return `
  <li><a tabIndex="-1" id="navlist-login" href="#" class="text-blue-600 text-sm font-normal hover:underline">Login</a></li>
  <li><a tabIndex="-1" id="register-button" href="#" class="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition">Register</a></li>
  `;
}

export const generateUnauthenticatedNavigationListMainTemplate = () => {
    return `
    <div id="navlist-main" class="flex items-center space-x-3">
      <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
        H
      </div>
      <span class="font-semibold text-gray-900 select-none">GejalaKu</span>
    </div>
    `
}
