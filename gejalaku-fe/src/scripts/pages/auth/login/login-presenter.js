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
        console.error('showReportDetailAndMap: response:', response);
        this.#view.populateReportDetailError(response.message);
        return;
      }
      this.#authModel.putAccessToken(response.data.accessToken);
      window.location.href = '/';

      //   this.#view.populateReportDetailAndInitialMap(response.message, response.data);
    } catch (error) {
      console.error('showReportDetailAndMap: error:', error);
      //   this.#view.populateReportDetailError(error.message);
    } finally {
      //   this.#view.hideReportDetailLoading();
    }
  }
}
