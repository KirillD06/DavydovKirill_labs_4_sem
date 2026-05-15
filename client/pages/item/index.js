import { DetailComponent } from "../../components/detail/index.js";
import { discoveryApi } from "../../modules/discoveryApi.js";

export class ItemPage {
  constructor(parent, id, onBack) {
    this.parent = parent;
    this.id = id;
    this.onBack = onBack;
  }

  get detailRoot() {
    return document.getElementById("item-detail");
  }

  get stateRoot() {
    return document.getElementById("item-state");
  }

  getHTML() {
    return `
      <header class="topbar">
        <a id="logo-back-link" class="brand" href="#" aria-label="Назад к каталогу">Эпоха географических открытий</a>
      </header>

      <main class="layout">
        <section class="panel">
          <h1>Карточка экспедиции</h1>
          <p class="subtitle">ЛР 6: данные получаются через fetch</p>
          <div id="item-state" class="state state-info">Загрузка карточки...</div>
          <div id="item-detail"></div>
        </section>
      </main>
    `;
  }

  renderState(text, type = "info") {
    this.stateRoot.textContent = text;
    this.stateRoot.className = `state state-${type}`;
  }

  goBack(event) {
    event.preventDefault();
    this.onBack();
  }

  async deleteItem() {
    const confirmed = window.confirm("Удалить эту карточку? Действие нельзя отменить.");

    if (!confirmed) {
      return;
    }

    this.renderState("Удаление карточки...", "info");

    try {
      await discoveryApi.deleteDiscoveryById(this.id);
      this.onBack();
    } catch (error) {
      this.renderState(error.message || "Не удалось удалить карточку.", "error");
    }
  }

  async fetchItem() {
    try {
      const data = await discoveryApi.getDiscoveryById(this.id);
      const detail = new DetailComponent(this.detailRoot);
      detail.render(data, this.deleteItem.bind(this));
      this.renderState("Карточка загружена.", "success");
    } catch (error) {
      if (error.message.toLowerCase().includes("не найд")) {
        this.renderState("Карточка не найдена.", "warning");
        return;
      }

      this.renderState(error.message || "Ошибка загрузки карточки.", "error");
    }
  }

  addListeners() {
    document.getElementById("logo-back-link").addEventListener("click", this.goBack.bind(this));
  }

  render() {
    this.parent.innerHTML = this.getHTML();
    this.addListeners();
    this.fetchItem();
  }
}
