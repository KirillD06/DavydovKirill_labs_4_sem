import { CatalogPage } from "./pages/catalog/index.js";
import { ItemPage } from "./pages/item/index.js";

const root = document.getElementById("root");

function showCatalogPage() {
  const page = new CatalogPage(root, showItemPage);
  page.render();
}

function showItemPage(id) {
  const page = new ItemPage(root, id, showCatalogPage);
  page.render();
}

showCatalogPage();
