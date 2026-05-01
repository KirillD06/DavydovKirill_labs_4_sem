import { ProductCardComponent } from "../../components/product-card/index.js";
import { exhibitions } from "../../data/exhibitions.js";

export class MainPage {
  constructor(parent, onOpenProduct) {
    this.parent = parent;
    this.onOpenProduct = onOpenProduct;
    this.cardsPerPage = 2;
    this.currentPage = 0;
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  get paginationRoot() {
    return document.getElementById("main-pagination");
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
        <header class="mb-4">
          <h1 class="display-6 fw-bold mb-2">Музей-заповедник Ю.А. Гагарина</h1>
          <p class="text-secondary mb-0">Мини-каталог выставок по мотивам museumgagarin.ru</p>
        </header>
        <div id="main-page" class="row g-3 mb-4"></div>
        <div id="main-pagination" class="dot-pagination" aria-label="Навигация по карточкам"></div>
      </section>
    `;
  }

  clickCard(event) {
    const cardId = Number(event.currentTarget.dataset.id);
    this.onOpenProduct(cardId);
  }

  getPageCount() {
    return Math.ceil(exhibitions.length / this.cardsPerPage);
  }

  getCurrentPageExhibitions() {
    const startIndex = this.currentPage * this.cardsPerPage;
    return exhibitions.slice(startIndex, startIndex + this.cardsPerPage);
  }

  setCurrentPage(pageIndex) {
    this.currentPage = pageIndex;
    this.renderCards();
    this.renderPagination();
  }

  renderCards() {
    this.pageRoot.innerHTML = "";
    const pageExhibitions = this.getCurrentPageExhibitions();

    pageExhibitions.forEach((item) => {
      const productCard = new ProductCardComponent(this.pageRoot);
      productCard.render(item, this.clickCard.bind(this));
    });
  }

  renderPagination() {
    const pageCount = this.getPageCount();
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

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.renderCards();
    this.renderPagination();
  }
}
