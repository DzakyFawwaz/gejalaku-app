import RegisterPresenter from './register-presenter';
import * as AuthApi from '../../../data/auth-api';
import * as AuthModel from '../../../utils/auth';

export default class RegisterPage {
  #presenter;

  async render() {
    return `
      <form id="register-form" class="flex flex-col justify-center mt-10 w-full px-4 max-w-md mx-auto" novalidate>
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
        <p id="password-match-message" class="text-xs mt-2"></p>
        </div>
        <button
        id="register-button"
        type="submit"
        class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
        Register
        </button>
        <p class="text-center text-gray-600 text-sm mt-4">
        Already have an account?
        <a
          href="#/login"
          class="text-blue-600 font-semibold hover:underline"
          >Login</a
        >
        </p>
      </form>
    
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: AuthApi,
      authModel: AuthModel,
    });

    this.#setupForm();
    this.#listenPasswordConfirmation();
  }

  #listenPasswordConfirmation() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordMatchMessage = document.getElementById('password-match-message');

    confirmPasswordInput.addEventListener('input', () => {
      if (passwordMatchMessage.value === '' || confirmPasswordInput.value === '') {
        return (passwordMatchMessage.textContent = '');
      }

      if (confirmPasswordInput.value === passwordInput.value) {
        passwordMatchMessage.textContent = 'Passwords match';
        passwordMatchMessage.className = 'text-green-600';
      } else {
        passwordMatchMessage.textContent = 'Passwords do not match';
        passwordMatchMessage.className = 'text-red-600';
      }
    });
  }

  #setupForm() {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        return;
      }

      const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };
      await this.#presenter.register(data);
    });
  }

  showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.className =
      'bg-red-50 border border-red-400 text-red-600 font-semibold text-sm p-4 rounded-xl z-50 mt-4';
    document.getElementById('register-form').appendChild(errorMessage);

    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
  }

  registeredSuccessfully(message) {
    location.hash = '/login';
  }

  registeredFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Daftar akun
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit">Daftar akun</button>
    `;
  }
}
