import { CardComponent } from "../../components/card/index.js";
import { discoveryApi } from "../../modules/discoveryApi.js";

export class CatalogPage {
  constructor(parent, onOpenItem) {
    this.parent = parent;
    this.onOpenItem = onOpenItem;
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
      <header class="topbar">
        <a class="brand" href="#" aria-label="Главная">Эпоха географических открытий</a>
      </header>

      <main class="layout">
        <section class="panel">
          <h1>Каталог экспедиций</h1>
          <p class="subtitle">ЛР 6: загрузка карточек с сервера через fetch</p>

          <div class="controls">
            <label class="field">
              <span>Фильтр по названию</span>
              <input id="search-title-input" type="text" placeholder="Например: Магеллан">
            </label>

            <button id="search-title-button" class="primary-btn">Найти</button>

            <label class="field field-small">
              <span>Лимит карточек</span>
              <input id="limit-input" type="number" min="1" placeholder="Без лимита">
            </label>

            <button id="limit-apply-button" class="secondary-btn">Применить лимит</button>
            <button id="reset-button" class="secondary-btn">Сбросить</button>
          </div>

          <div id="catalog-state" class="state"></div>
          <div id="catalog-list" class="cards-grid"></div>
          <div id="catalog-dots" class="dot-pagination" aria-label="Навигация по карточкам"></div>
        </section>
      </main>
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
    this.stateRoot.className = `state state-${type}`;
  }

  clickCard(event) {
    const itemId = Number(event.currentTarget.dataset.id);
    this.onOpenItem(itemId);
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
      card.render(item, this.clickCard.bind(this));
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
            class="dot-button ${isActive ? "active" : ""}"
            data-page="${pageIndex}"
            aria-label="Страница ${pageIndex + 1}"
          ></button>
        `
      );
    }

    this.dotsRoot.querySelectorAll(".dot-button").forEach((button) => {
      button.addEventListener("click", () => {
        this.setCurrentPage(Number(button.dataset.page));
      });
    });
  }

  async fetchData() {
    this.renderState("Загрузка данных с сервера...", "info");

    try {
      const data = await discoveryApi.getDiscoveries(this.searchValue.trim());
      this.items = Array.isArray(data) ? data : [];
      this.currentPage = 0;
      this.renderCards();
      this.renderPagination();
    } catch (error) {
      this.items = [];
      this.listRoot.innerHTML = "";
      this.dotsRoot.innerHTML = "";
      this.renderState(error.message || "Не удалось загрузить карточки.", "error");
    }
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
