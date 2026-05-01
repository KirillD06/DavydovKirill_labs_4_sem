export class DiscovererProfileComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(discovererCard) {
    return `
      <article class="card shadow-sm border-0 p-2 p-md-3">
        <div class="row g-3 align-items-stretch">
          <div class="col-12 col-lg-6">
            <img
              src="${discovererCard.imageUrl}"
              class="detail-image rounded"
              style="object-position: ${discovererCard.imagePosition || "center"};"
              alt="${discovererCard.fullName}"
            >
          </div>
          <div class="col-12 col-lg-6 d-flex">
            <div class="card-body d-flex flex-column">
              <span class="badge text-bg-secondary align-self-start mb-2">${discovererCard.shortPeriod}</span>
              <h2 class="h3 mb-3">${discovererCard.fullName}</h2>
              <p class="mb-3">${discovererCard.longText}</p>
              <a
                class="btn btn-outline-primary mt-auto source-link"
                href="${discovererCard.sourceLink}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Источник
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  render(discovererCard) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(discovererCard));
  }
}
