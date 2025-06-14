export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async login(username, password) {
    try {
      const response = await this.#model.login(username, password);

      if (!response.ok) {
        this.#view.showErrorMessage('Login failed. Please check your username and password.');
        return;
      }
      this.#authModel.putAccessToken(response.data.accessToken);
      this.#authModel.showSuccessMessage('Login successful!');

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('c') === 'true') {
        setTimeout(() => {
          window.location.hash = '/check-symptom';
        }, 1000);
      } else {
        setTimeout(() => {
          window.location.hash = '/';
        }, 1000);
      }
    } catch (error) {
      console.error('showReportDetailAndMap: error:', error);
    }
  }
}
