import RegisterPage from '../pages/auth/register/register-page';
import LoginPage from '../pages/auth/login/login-page';
import DashboardPage from '../pages/dashboard/dashboard-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import AboutPage from '../pages/about/about-page';
import CheckSymptomPage from '../pages/check-symptom/check-symptom-page';
import AnalyzingSymptomPage from '../pages/analyzing/analyzing-page';
import SummaryPage from '../pages/summary/summary-page';
import HistoryPage from '../pages/history/history-page';

export const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  '/': () => new DashboardPage(),
  '/dashboard': () => new DashboardPage(),
  '/about': () => new AboutPage(),
  '/history': () => new HistoryPage(),
  '/check-symptom': () => checkAuthenticatedRoute(new CheckSymptomPage()),
  '/analyzing': () => checkAuthenticatedRoute(new AnalyzingSymptomPage()),
  '/summary': () => checkAuthenticatedRoute(new SummaryPage()),
};
