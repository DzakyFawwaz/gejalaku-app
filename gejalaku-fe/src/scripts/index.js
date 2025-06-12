import '../styles/styles.css';
import '../styles/responsives.css';
import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = await new App({
    content: document.getElementById('main-content'),
    drawerNavigation: document.getElementById('navigation-drawer'),
    skipLinkButton: document.getElementById('skip-link'),
  });

  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });

  window.addEventListener('pageswap', async () => {
    await app.renderPage();
  });
});
