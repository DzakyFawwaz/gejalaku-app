// CSS imports
import "../styles/styles.css";
import '../styles/responsives.css';

// Components
import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.getElementById("main-content"),
    drawerButton: document.getElementById("drawer-button"),
    drawerNavigation: document.getElementById("navigation-drawer"),
    skipLinkButton: document.getElementById("skip-link"),
  });

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
