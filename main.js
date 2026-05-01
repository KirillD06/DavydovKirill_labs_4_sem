import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";

const root = document.getElementById("root");

function showMainPage() {
  const mainPage = new MainPage(root, showProductPage);
  mainPage.render();
}

function showProductPage(id) {
  const productPage = new ProductPage(root, id, showMainPage);
  productPage.render();
}

showMainPage();
