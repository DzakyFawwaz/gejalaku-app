export default class RegisterPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async register(userData) {
    try {
      const response = await this.#model.register(userData);
      console.log({ response });
      if (!response.ok) {
        this.#view.showErrorMessage(response.error || 'Registration failed.');
        return;
      }

      this.#authModel.putAccessToken(response.accessToken);
      this.#authModel.showSuccessMessage('Registration successful!');

      window.location.hash = '/';
    } catch (error) {
      this.#view.showErrorMessage(error.message || 'Registration failed.');
    }
  }
}
