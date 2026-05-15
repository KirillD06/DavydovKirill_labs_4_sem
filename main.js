import { CatalogPage } from "./pages/catalog/index.js";

const root = document.getElementById("root");

function showCatalogPage() {
  const page = new CatalogPage(root);
  page.render();
}

showCatalogPage();
