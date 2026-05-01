export class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <article class="col-12 col-lg-6">
        <div class="card h-100 shadow-sm border-0">
          <img src="${data.src}" class="card-img-top" alt="${data.title}">
          <div class="card-body d-flex flex-column">
            <span class="badge rounded-pill text-bg-secondary align-self-start mb-2">${data.tag}</span>
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text text-secondary">${data.subtitle}</p>
            <button class="btn btn-primary mt-auto" id="open-card-${data.id}" data-id="${data.id}">
              Подробнее
            </button>
          </div>
        </div>
      </article>
    `;
  }

  addListeners(data, listener) {
    document
      .getElementById(`open-card-${data.id}`)
      .addEventListener("click", listener);
  }

  render(data, listener) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
    this.addListeners(data, listener);
  }
}
