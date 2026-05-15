class StockUrls {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  getStocks(title) {
    const url = new URL("/stocks", this.baseUrl);

    if (title) {
      url.searchParams.set("title", title);
    }

    return url.toString();
  }
}

export const stockUrls = new StockUrls();
