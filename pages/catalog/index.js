import { CardComponent } from "../../components/card/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class CatalogPage {
  constructor(parent) {
    this.parent = parent;
    this.cardsPerPage = 2;
    this.currentPage = 0;
    this.searchValue = "";
    this.limitValue = 0;
    this.items = [];
  }

  get listRoot() {
    return document.getElementById("catalog-list");
  }

  get dotsRoot() {
    return document.getElementById("catalog-dots");
  }

  get stateRoot() {
    return document.getElementById("catalog-state");
  }

  getHTML() {
    return `
      <header class="gagarin-topbar">
        <a href="#" class="gagarin-brand gagarin-brand-link" aria-label="Главная страница">
          <p class="gagarin-brand-caption">ФГБУК МУЗЕЙ-ЗАПОВЕДНИК</p>
          <p class="gagarin-brand-name">Ю. А. ГАГАРИНА</p>
        </a>

        <div class="gagarin-top-right">
          <div class="gagarin-fast-links">
            <span class="gagarin-pill">CATALOG</span>
          </div>

          <div class="gagarin-menu-links">
            <span>МУЗЕЙ</span>
            <span>ЭКСПОЗИЦИИ</span>
            <span>НОВОСТИ</span>
            <span>МЕДИА</span>
          </div>
        </div>
      </header>

      <section class="container py-4 content-shell">
        <header class="mb-4">
          <h1 class="display-6 fw-bold mb-2">Каталог</h1>
          <p class="text-secondary mb-0">ЛР 5</p>
        </header>

        <div class="filters-panel mb-4">
          <div class="row g-2 align-items-end">
            <div class="col-12 col-md-5">
              <label class="form-label mb-1">Фильтр по названию</label>
              <input id="search-title-input" class="form-control" type="text" placeholder="Например: акция">
            </div>
            <div class="col-12 col-md-2 d-grid">
              <button id="search-title-button" class="btn btn-primary">Найти</button>
            </div>
            <div class="col-12 col-md-3">
              <label class="form-label mb-1">Лимит карточек</label>
              <input id="limit-input" class="form-control" type="number" min="1" placeholder="Без лимита">
            </div>
            <div class="col-6 col-md-1 d-grid">
              <button id="limit-apply-button" class="btn btn-outline-light">Ок</button>
            </div>
            <div class="col-6 col-md-1 d-grid">
              <button id="reset-button" class="btn btn-outline-light">Сброс</button>
            </div>
          </div>
        </div>

        <div id="catalog-state" class="state mb-3"></div>
        <div id="catalog-list" class="row g-3 mb-4"></div>
        <div id="catalog-dots" class="dot-pagination" aria-label="Навигация по карточкам"></div>
      </section>
    `;
  }

  getLimitedItems() {
    if (!this.limitValue || this.limitValue <= 0) {
      return this.items;
    }

    return this.items.slice(0, this.limitValue);
  }

  getPageCount() {
    const limitedItems = this.getLimitedItems();
    return Math.max(1, Math.ceil(limitedItems.length / this.cardsPerPage));
  }

  getCurrentPageItems() {
    const limitedItems = this.getLimitedItems();
    const start = this.currentPage * this.cardsPerPage;
    return limitedItems.slice(start, start + this.cardsPerPage);
  }

  renderState(text, type = "info") {
    this.stateRoot.textContent = text;
    this.stateRoot.className = `state state-${type} mb-3`;
  }

  setCurrentPage(pageIndex) {
    this.currentPage = pageIndex;
    this.renderCards();
    this.renderPagination();
  }

  renderCards() {
    this.listRoot.innerHTML = "";

    const pageItems = this.getCurrentPageItems();

    if (pageItems.length === 0) {
      this.renderState("По вашему запросу ничего не найдено.", "warning");
      return;
    }

    pageItems.forEach((item) => {
      const card = new CardComponent(this.listRoot);
      card.render(item);
    });

    const visibleCount = this.getLimitedItems().length;
    this.renderState(`Показано ${visibleCount} карточек.`, "success");
  }

  renderPagination() {
    this.dotsRoot.innerHTML = "";

    const pageCount = this.getPageCount();

    if (pageCount <= 1) {
      return;
    }

    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const isActive = pageIndex === this.currentPage;
      this.dotsRoot.insertAdjacentHTML(
        "beforeend",
        `
          <button
            type="button"
            class="dot-pagination-button ${isActive ? "active" : ""}"
            data-page="${pageIndex}"
            aria-label="Страница ${pageIndex + 1}"
          ></button>
        `
      );
    }

    this.dotsRoot.querySelectorAll(".dot-pagination-button").forEach((button) => {
      button.addEventListener("click", () => {
        this.setCurrentPage(Number(button.dataset.page));
      });
    });
  }

  fetchData() {
    this.renderState("Загрузка данных с сервера...", "info");

    const requestUrl = stockUrls.getStocks(this.searchValue.trim());

    ajax.get(requestUrl, (data, status) => {
      if (status >= 200 && status < 300 && Array.isArray(data)) {
        this.items = data;
        this.currentPage = 0;
        this.renderCards();
        this.renderPagination();
        return;
      }

      this.items = [];
      this.listRoot.innerHTML = "";
      this.dotsRoot.innerHTML = "";
      this.renderState("Не удалось загрузить карточки. Проверьте, что сервер ЛР 4 запущен на порту 3000.", "error");
    });
  }

  applyLimitFromInput() {
    const input = document.getElementById("limit-input");
    const parsedValue = Number.parseInt(input.value, 10);

    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
      this.limitValue = 0;
    } else {
      this.limitValue = parsedValue;
    }

    this.currentPage = 0;
    this.renderCards();
    this.renderPagination();
  }

  addListeners() {
    const searchInput = document.getElementById("search-title-input");
    const searchButton = document.getElementById("search-title-button");
    const applyLimitButton = document.getElementById("limit-apply-button");
    const resetButton = document.getElementById("reset-button");

    searchButton.addEventListener("click", () => {
      this.searchValue = searchInput.value;
      this.fetchData();
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.searchValue = searchInput.value;
        this.fetchData();
      }
    });

    applyLimitButton.addEventListener("click", () => {
      this.applyLimitFromInput();
    });

    resetButton.addEventListener("click", () => {
      this.searchValue = "";
      this.limitValue = 0;
      searchInput.value = "";
      document.getElementById("limit-input").value = "";
      this.fetchData();
    });
  }

  render() {
    this.parent.innerHTML = this.getHTML();
    this.addListeners();
    this.fetchData();
  }
}
