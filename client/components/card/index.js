export class CardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(item) {
    return `
      <article class="catalog-card">
        <img src="${item.src}" alt="${item.title}" class="catalog-card-image" loading="lazy">
        <div class="catalog-card-body">
          <h3 class="catalog-card-title">${item.title}</h3>
          <p class="catalog-card-meta">${item.year} · ${item.route}</p>
          <p class="catalog-card-text">${item.text}</p>
          <button class="primary-btn" id="open-item-${item.id}" data-id="${item.id}">Подробнее</button>
        </div>
      </article>
    `;
  }

  addListeners(item, listener) {
    const button = document.getElementById(`open-item-${item.id}`);
    button.addEventListener("click", listener);
  }

  render(item, listener) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(item));
    this.addListeners(item, listener);
  }
}
