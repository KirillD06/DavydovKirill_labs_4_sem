import { ProductComponent } from "../../components/product/index.js";
import { getExhibitionById } from "../../data/exhibitions.js";

export class ProductPage {
  constructor(parent, id, onBack) {
    this.parent = parent;
    this.id = id;
    this.onBack = onBack;
  }

  get pageRoot() {
    return document.getElementById("product-page");
  }

  getHTML() {
    return `
      <header class="gagarin-topbar">
        <a href="#" id="brand-home-link" class="gagarin-brand gagarin-brand-link" aria-label="Вернуться к списку">
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
        <div id="product-page" class="d-grid gap-3"></div>
      </section>
    `;
  }

  clickBack() {
    this.onBack();
  }

  addListeners() {
    document.getElementById("brand-home-link").addEventListener("click", (event) => {
      event.preventDefault();
      this.clickBack();
    });
  }

  renderEmptyState() {
    this.pageRoot.insertAdjacentHTML(
      "beforeend",
      `
        <div class="alert alert-warning" role="alert">
          Экспозиция не найдена.
        </div>
      `
    );
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.addListeners();

    const data = getExhibitionById(this.id);

    if (!data) {
      this.renderEmptyState();
      return;
    }

    const product = new ProductComponent(this.pageRoot);
    product.render(data);
  }
}
