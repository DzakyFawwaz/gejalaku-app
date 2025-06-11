export default class SummaryPresenter {
  constructor({ view }) {
    this.view = view;
  }

  handlePrint() {
    try {
      window.print();
    } catch (error) {
      this.view.showError('Failed to print results.');
      console.error('Error handling print:', error);
    }
  }

  navigateToHome() {
    window.location.hash = '/';
  }

  navigateToCheckSymptom() {
    this.navigateTo('/check-symptom');
  }

  navigateTo(url) {
    try {
      window.location.hash = url;
    } catch (error) {
      this.view.showError(`Failed to navigate to ${url}.`);
      console.error('Navigation error:', error);
    }
  }
}
