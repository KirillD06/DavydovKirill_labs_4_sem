import { CatalogPage } from "./pages/catalog/index.js";
import { DiscovererPage } from "./pages/discoverer/index.js";

const root = document.getElementById("root");

function openCatalogPage() {
  const catalogPage = new CatalogPage(root, openDiscovererPage);
  catalogPage.render();
}

function openDiscovererPage(discovererId) {
  const discovererPage = new DiscovererPage(root, discovererId, openCatalogPage);
  discovererPage.render();
}

openCatalogPage();
