export class ProductComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <article class="card shadow-sm border-0 p-2 p-md-3">
        <div class="row g-3 align-items-stretch">
          <div class="col-12 col-lg-6">
            <img src="${data.src}" class="detail-image rounded" alt="${data.title}">
          </div>
          <div class="col-12 col-lg-6 d-flex">
            <div class="card-body d-flex flex-column">
              <div class="d-flex gap-2 mb-2">
                <span class="badge text-bg-secondary">${data.tag}</span>
                <span class="badge text-bg-light border">1960-е</span>
              </div>
              <h2 class="h3 mb-2">${data.title}</h2>
              <p class="text-secondary mb-3">${data.subtitle}</p>
              <p class="mb-4">${data.text}</p>
              <a class="btn btn-outline-primary mt-auto source-link" href="${data.sourceLink}" target="_blank" rel="noopener noreferrer">
                Источник
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  render(data) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
  }
}
