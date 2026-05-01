export class HomeButtonComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(buttonText = "Домой") {
    return `
      <button id="home-button" class="btn btn-outline-secondary" type="button">${buttonText}</button>
    `;
  }

  addListener(listener) {
    document.getElementById("home-button").addEventListener("click", listener);
  }

  render(listener, buttonText) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(buttonText));

    if (listener) {
      this.addListener(listener);
    }
  }
}
