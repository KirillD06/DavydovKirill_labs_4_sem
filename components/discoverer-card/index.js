export class DiscovererCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(discovererCard, homeworkMetrics) {
    const missionStats = discovererCard.expeditionSteps;
    const impactScores = discovererCard.expeditionScores;

    return `
      <article class="col-12 col-lg-6">
        <div class="card h-100 shadow-sm border-0">
          <img
            src="${discovererCard.imageUrl}"
            class="card-img-top"
            style="object-position: ${discovererCard.imagePosition || "center"};"
            alt="${discovererCard.fullName}"
          >
          <div class="card-body d-flex flex-column">
            <span class="badge rounded-pill text-bg-secondary align-self-start mb-2">${discovererCard.shortPeriod}</span>
            <h5 class="card-title">${discovererCard.fullName}</h5>
            <p class="card-text text-secondary">${discovererCard.shortText}</p>

            <p class="metric-input mb-2">
              <strong>Данные для sumOfSquares:</strong>
              полеты — ${missionStats[0]}, выходы в открытый космос — ${missionStats[1]}, длительность ключевой миссии (сутки) — ${missionStats[2]}.
            </p>
            <p class="metric-input mb-3">
              <strong>Данные для sum и mult:</strong>
              научная ценность — ${impactScores[0]}, историческая значимость — ${impactScores[1]}, влияние на отрасль — ${impactScores[2]}.
            </p>

            <div class="d-flex flex-wrap gap-2 mb-3">
              <span class="badge text-bg-light border metric-badge">sumOfSquares: ${homeworkMetrics.squareSum}</span>
              <span class="badge text-bg-light border metric-badge">sum: ${homeworkMetrics.sumAndMult.sum}</span>
              <span class="badge text-bg-light border metric-badge">mult: ${homeworkMetrics.sumAndMult.mult}</span>
            </div>

            <div class="d-flex gap-2 mt-auto">
              <button class="btn btn-primary" id="open-card-${discovererCard.id}" data-id="${discovererCard.id}">
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  addListeners(discovererCard, onOpen) {
    const openButton = document.getElementById(`open-card-${discovererCard.id}`);

    openButton.addEventListener("click", () => onOpen(discovererCard.id));
  }

  render(discovererCard, homeworkMetrics, onOpen) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(discovererCard, homeworkMetrics));
    this.addListeners(discovererCard, onOpen);
  }
}
