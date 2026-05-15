export class DetailComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(item) {
    return `
      <article class="detail-card">
        <img src="${item.src}" alt="${item.title}" class="detail-image">
        <div class="detail-body">
          <h2>${item.title}</h2>
          <p class="detail-meta">Год: ${item.year} · Маршрут: ${item.route}</p>
          <p>${item.text}</p>
          <button id="delete-item-button" class="danger-btn">Удалить карточку</button>
        </div>
      </article>
    `;
  }

  render(item, onDelete) {
    this.parent.innerHTML = this.getHTML(item);
    const deleteButton = document.getElementById("delete-item-button");

    if (deleteButton) {
      deleteButton.addEventListener("click", onDelete);
    }
  }
}
