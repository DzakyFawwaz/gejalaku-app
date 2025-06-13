import { getActiveRoute } from '../routes/url-parser';
import { setupSkipToContent, transitionHelper } from '../utils';
import { getAccessToken, getLogout } from '../utils/auth';
import { routes } from '../routes/routes';
import {
  generateUnauthenticatedNavigationListTemplate,
  generateUnauthenticatedNavigationListMainTemplate,
  generateAuthenticatedNavigationListTemplate,
  generateAuthenticatedNavigationListTemplateMobile,
} from '../templates';

export default class App {
  #content;
  #drawerNavigation;
  #skipLinkButton;

  constructor({ content, drawerNavigation, skipLinkButton }) {
    this.#content = content;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navListMain = this.#drawerNavigation.children.namedItem('navlist-main');
    const navList = this.#drawerNavigation.children.namedItem('navlist');

    navListMain.innerHTML = generateUnauthenticatedNavigationListMainTemplate();
    const navListLogo = document.getElementById('navlist-logo');
    if (navListLogo) {
      navListLogo.addEventListener('click', () => {
        if (window.location.hash === '#/' || window.location.hash === '/') {
          window.location.reload();
        } else {
          window.location.hash = '/';
        }
      });
    }

    if (!isLogin) {
      navList.innerHTML = generateUnauthenticatedNavigationListTemplate();

      return;
    }

    const handleLogout = () => {
      getLogout();
      this.#setupNavigationList();
    };
    const handleViewHistoryPage = () => {
      window.location.hash = '/history';
    };

    const handleLoginRegister = (event) => {
      const target = event.target;
      if (target.id === 'login-button') {
        window.location.hash = '/login';
      } else if (target.id === 'register-button') {
        window.location.hash = '/register';
      }
    };

    const isMobile = window.innerWidth <= 640;

    if (isMobile) {
      navList.innerHTML = generateAuthenticatedNavigationListTemplateMobile();
    } else {
      navList.innerHTML = generateAuthenticatedNavigationListTemplate();
    }
    const logoutButton = navList.querySelector('#logout-button');
    const historyButton = navList.querySelector('#history-button');
    const loginRegisterContainer = navList.querySelector('#login-register-container');

    if (logoutButton) {
      logoutButton.addEventListener('click', handleLogout);
    }

    if (historyButton) {
      historyButton.addEventListener('click', handleViewHistoryPage);
    }

    if (loginRegisterContainer) {
      loginRegisterContainer.addEventListener('click', handleLoginRegister);
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const urlWithParams = url.split('?');
    const route = routes[urlWithParams.length == 1 ? url : urlWithParams[0]];

    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page?.render();
        page?.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'instant' });
      this.#setupNavigationList();
    });
  }
}
