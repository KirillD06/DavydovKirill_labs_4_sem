import { DiscovererProfileComponent } from "../../components/discoverer-profile/index.js";
import { RocketModelComponent } from "../../components/rocket-gif/index.js";
import { getDiscovererById } from "../../data/discoverers.js";

export class DiscovererPage {
  constructor(parent, discovererId, onOpenCatalog) {
    this.parent = parent;
    this.discovererId = discovererId;
    this.onOpenCatalog = onOpenCatalog;
  }

  get contentRoot() {
    return document.getElementById("discoverer-page");
  }

  getHTML() {
    return `
      <header class="gagarin-topbar">
        <a href="#" id="brand-home-link" class="gagarin-brand gagarin-brand-link" aria-label="Вернуться в каталог">
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
            <h1 class="display-6 fw-bold mb-2">Страница первооткрывателя</h1>
            <p class="text-secondary mb-1">Картинка + описание + 3D модель</p>
            <p class="author-line mb-0">Давыдов Кирилл Игоревич, группа ИУ5-44Б</p>
          </div>
        </header>

        <div id="discoverer-page" class="d-grid gap-3"></div>
      </section>
    `;
  }

  addListeners() {
    document.getElementById("brand-home-link").addEventListener("click", (event) => {
      event.preventDefault();
      this.onOpenCatalog();
    });
  }

  renderEmptyState() {
    this.contentRoot.insertAdjacentHTML(
      "beforeend",
      `
        <div class="alert alert-warning" role="alert">
          Карточка не найдена. Вернитесь на главную страницу.
        </div>
      `
    );
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.addListeners();

    const discovererCard = getDiscovererById(this.discovererId);

    if (!discovererCard) {
      this.renderEmptyState();
      return;
    }

    const discovererProfile = new DiscovererProfileComponent(this.contentRoot);
    discovererProfile.render(discovererCard);

    const rocketModel = new RocketModelComponent(this.contentRoot);
    rocketModel.render(discovererCard);
  }
}
