import { DiscovererCardComponent } from "../../components/discoverer-card/index.js";
import {
  closedPioneerBaseIdList,
  getDiscovererCardList,
  pioneerBaseIdList,
  pioneerBaseNameById,
  pioneerSloganText
} from "../../data/discoverers.js";
import {
  collectOpenBaseNames,
  diff,
  getSumAndMultOfArray,
  sort,
  sumOfSquares
} from "../../utils/discoverer-homework.js";

export class CatalogPage {
  constructor(parent, onOpenDiscoverer) {
    this.parent = parent;
    this.onOpenDiscoverer = onOpenDiscoverer;
    this.searchValue = "";
    this.cardsPerPage = 2;
    this.currentPage = 0;
  }

  get cardsRoot() {
    return document.getElementById("catalog-cards");
  }

  get paginationRoot() {
    return document.getElementById("catalog-pagination");
  }

  getFilteredDiscovererList() {
    const discovererCardList = getDiscovererCardList();
    const normalizedSearchValue = this.searchValue.toLowerCase().trim();

    if (normalizedSearchValue === "") {
      return discovererCardList;
    }

    return discovererCardList.filter((discovererCard) =>
      discovererCard.fullName.toLowerCase().includes(normalizedSearchValue)
    );
  }

  getHomeworkSummary() {
    const allBaseNameList = collectOpenBaseNames(pioneerBaseIdList, pioneerBaseNameById);
    const openBaseIdList = diff(pioneerBaseIdList, closedPioneerBaseIdList);
    const openBaseNameList = collectOpenBaseNames(openBaseIdList, pioneerBaseNameById);
    const closedBaseNameList = collectOpenBaseNames(closedPioneerBaseIdList, pioneerBaseNameById);
    const transformedSlogan = sort(pioneerSloganText);

    return {
      allBaseNameList,
      openBaseNameList,
      closedBaseNameList,
      sourceSloganText: pioneerSloganText,
      transformedSlogan
    };
  }

  getHTML() {
    const homeworkSummary = this.getHomeworkSummary();

    return `
      <header class="gagarin-topbar">
        <a href="#" class="gagarin-brand gagarin-brand-link" aria-label="Главная страница">
          <p class="gagarin-brand-caption">ФГБУК МУЗЕЙ-ЗАПОВЕДНИК</p>
          <p class="gagarin-brand-name">Ю. А. ГАГАРИНА</p>
        </a>

        <div class="gagarin-top-right">
          <div class="gagarin-fast-links">
            <span class="gagarin-pill">GAGARIN'S DICTATION</span>
            <span class="gagarin-pill">BUY A TICKET</span>
            <span class="gagarin-pill">PUSHKIN'S MAP</span>
            <a class="gagarin-pill gagarin-pill-link" href="https://github.com/KirillD06/DavydovKirill_labs_4_sem" target="_blank" rel="noopener noreferrer">MY GITHUB</a>
          </div>

          <div class="gagarin-menu-links">
            <span>MUSEUM</span>
            <span>FOR GUESTS</span>
            <span>MEDIA</span>
            <span>SERVICES</span>
            <span>YURI GAGARIN</span>
          </div>
        </div>
      </header>

      <section class="container py-4 content-shell">
        <header class="d-flex flex-wrap justify-content-between gap-3 align-items-start mb-4">
          <div>
            <h1 class="display-6 fw-bold mb-2">Каталог «Первооткрыватели»</h1>
            <p class="text-secondary mb-1">Домашняя работа по JavaScript</p>
            <p class="author-line mb-0">Давыдов Кирилл Игоревич, группа ИУ5-44Б</p>
          </div>
        </header>

        <section class="homework-panel alert alert-primary mb-4">
          <h2 class="h5 mb-3">Точки миссий</h2>
          <p class="mb-2"><strong>Все точки программы:</strong> ${homeworkSummary.allBaseNameList.join(", ")}</p>
          <p class="mb-2"><strong>Временно закрыты:</strong> ${homeworkSummary.closedBaseNameList.join(", ")}</p>
          <p class="mb-2"><strong>Доступны сейчас:</strong> ${homeworkSummary.openBaseNameList.join(", ")}</p>
          <p class="mb-2"><strong>Как считаем доступные:</strong> все точки минус временно закрытые.</p>
          <p class="mb-2"><strong>Слоган:</strong> ${homeworkSummary.sourceSloganText}</p>
          <p class="mb-0"><strong>Слоган по алфавиту:</strong> ${homeworkSummary.transformedSlogan}</p>
        </section>

        <section class="card border-0 shadow-sm p-3 mb-4">
          <div class="d-flex flex-wrap gap-2">
            <input
              id="discoverer-filter"
              class="form-control filter-input"
              placeholder="Фильтр по фамилии или имени"
              value="${this.searchValue}"
            >
          </div>
        </section>

        <div id="catalog-cards" class="row g-3 mb-4"></div>
        <div id="catalog-pagination" class="dot-pagination" aria-label="Навигация по карточкам"></div>
      </section>
    `;
  }

  onSearchInput(event) {
    this.searchValue = event.target.value;
    this.currentPage = 0;
    this.renderCardsAndPagination();
  }

  getPageCount(discovererCardList) {
    return Math.ceil(discovererCardList.length / this.cardsPerPage);
  }

  getCurrentPageDiscovererList(discovererCardList) {
    const startIndex = this.currentPage * this.cardsPerPage;
    return discovererCardList.slice(startIndex, startIndex + this.cardsPerPage);
  }

  setCurrentPage(pageIndex) {
    this.currentPage = pageIndex;
    this.renderCardsAndPagination();
  }

  renderCards(filteredDiscovererList) {
    this.cardsRoot.innerHTML = "";

    if (filteredDiscovererList.length === 0) {
      this.cardsRoot.insertAdjacentHTML(
        "beforeend",
        `
          <div class="col-12">
            <div class="alert alert-warning mb-0">По фильтру ничего не найдено.</div>
          </div>
        `
      );
      return;
    }

    const visibleDiscovererCardList = this.getCurrentPageDiscovererList(filteredDiscovererList);

    visibleDiscovererCardList.forEach((discovererCard) => {
      const homeworkMetrics = {
        squareSum: sumOfSquares(discovererCard.expeditionSteps),
        sumAndMult: getSumAndMultOfArray(discovererCard.expeditionScores)
      };

      const discovererCardComponent = new DiscovererCardComponent(this.cardsRoot);
      discovererCardComponent.render(discovererCard, homeworkMetrics, this.onOpenDiscoverer);
    });
  }

  renderPagination(filteredDiscovererList) {
    const pageCount = this.getPageCount(filteredDiscovererList);
    this.paginationRoot.innerHTML = "";

    if (pageCount <= 1) {
      return;
    }

    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const isActive = pageIndex === this.currentPage;
      this.paginationRoot.insertAdjacentHTML(
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

    this.paginationRoot
      .querySelectorAll(".dot-pagination-button")
      .forEach((buttonElement) => {
        buttonElement.addEventListener("click", () => {
          this.setCurrentPage(Number(buttonElement.dataset.page));
        });
      });
  }

  renderCardsAndPagination() {
    const filteredDiscovererList = this.getFilteredDiscovererList();
    const pageCount = this.getPageCount(filteredDiscovererList);

    if (pageCount === 0) {
      this.currentPage = 0;
    } else if (this.currentPage > pageCount - 1) {
      this.currentPage = pageCount - 1;
    }

    this.renderCards(filteredDiscovererList);
    this.renderPagination(filteredDiscovererList);
  }

  addListeners() {
    document
      .getElementById("discoverer-filter")
      .addEventListener("input", this.onSearchInput.bind(this));
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.addListeners();
    this.renderCardsAndPagination();
  }
}
