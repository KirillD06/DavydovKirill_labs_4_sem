export class CardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(item) {
    return `
      <article class="col-12 col-lg-6">
        <div class="card h-100 shadow-sm border-0">
          <img src="${item.src}" alt="${item.title}" class="card-img-top" loading="lazy">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text text-secondary">${item.text}</p>
          </div>
        </div>
      </article>
    `;
  }

  render(item) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(item));
  }
}
