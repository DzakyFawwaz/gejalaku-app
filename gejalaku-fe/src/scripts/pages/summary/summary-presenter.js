export default class SummaryPresenter {
  constructor({ view }) {
    this.view = view;
  }

  // async loadData() {
  //   try {
  //     const summaryData = await this.summaryService.getSummaryResult();

  //     this.view.updateSummaryData(summaryData);
  //   } catch (error) {
  //     this.view.showError('Failed to load summary results. Please try again.');
  //     console.error('Error loading summary data:', error);
  //   }
  // }

  handlePrint() {
    try {
      window.print();
    } catch (error) {
      this.view.showError('Failed to print results.');
      console.error('Error handling print:', error);
    }
  }

  navigateToHome() {
    this.navigateTo('/');
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
