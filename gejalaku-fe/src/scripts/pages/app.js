import { getActiveRoute } from '../routes/url-parser';
// import {
//   generateAuthenticatedNavigationListTemplate,
//   generateMainNavigationListTemplate,
//   generateUnauthenticatedNavigationListTemplate,
// } from "../templates";
import { setupSkipToContent, transitionHelper } from '../utils';
import { getAccessToken, getLogout } from '../utils/auth';
import { routes } from '../routes/routes';
import {
  generateUnauthenticatedNavigationListTemplate,
  generateUnauthenticatedNavigationListMainTemplate,
  generateAuthenticatedNavigationListTemplate,
} from '../templates';

export default class App {
  #content;
  #drawerButton;
  #drawerNavigation;
  #skipLinkButton;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    // this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#drawerNavigation.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(event.target);
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove('open');
      }

      this.#drawerNavigation.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove('open');
        }
      });
    });
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navListMain = this.#drawerNavigation.children.namedItem('navlist-main');
    const navList = this.#drawerNavigation.children.namedItem('navlist');

    navListMain.innerHTML = generateUnauthenticatedNavigationListMainTemplate();
    document.getElementById('navlist-logo').addEventListener('click', () => {
      window.location.hash = '/';
    });

    // User not log in
    if (!isLogin) {
      navList.innerHTML = generateUnauthenticatedNavigationListTemplate();

      return;
    }

    const handleLogout = () => {
      getLogout();
      this.#setupNavigationList();
    };

    const handleLoginRegister = (event) => {
      const target = event.target;
      if (target.id === 'login-button') {
        // Handle login button click
        console.log('Login button clicked');
      } else if (target.id === 'register-button') {
        // Handle register button click
        console.log('Register button clicked');
      }
    };

    navList.innerHTML = generateAuthenticatedNavigationListTemplate();
    const logoutButton = navList.querySelector('#logout-button');
    const loginRegisterContainer = navList.querySelector('#login-register-container');

    if (logoutButton) {
      logoutButton.addEventListener('click', handleLogout);
    }

    if (loginRegisterContainer) {
      loginRegisterContainer.addEventListener('click', handleLoginRegister);
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    // Get page instance
    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'instant' });
      this.#setupNavigationList();
    });
  }
}
