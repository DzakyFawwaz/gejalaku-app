import RegisterPage from '../pages/auth/register/register-page';
import LoginPage from '../pages/auth/login/login-page';
import DashboardPage from '../pages/dashboard/dashboard-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import AboutPage from '../pages/about/about-page';
import CheckSymptomPage from '../pages/check-symptom/check-symptom-page';
import AnalyzingSymptomPage from '../pages/analyzing/analyzing-page';
import SummaryPage from '../pages/summary/summary-page';

export const routes = {
  //   "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  //   "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  //   "/": () => checkAuthenticatedRoute(new HomePage()),
  //   "/new": () => checkAuthenticatedRoute(new NewPage()),
  //   "/reports/:id": () => checkAuthenticatedRoute(new ReportDetailPage()),
  //   "/bookmark": () => checkAuthenticatedRoute(new BookmarkPage()),
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/': () => new DashboardPage(),
  '/about': () => new AboutPage(),
  '/check-symptom': () => checkAuthenticatedRoute(new CheckSymptomPage()),
  '/analyzing': () => checkAuthenticatedRoute(new AnalyzingSymptomPage()),
  '/summary': () => checkAuthenticatedRoute(new SummaryPage()),
};
