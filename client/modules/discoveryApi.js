class DiscoveryApi {
  constructor() {
    this.basePath = "/api/discoveries";
  }

  async request(url, options = {}) {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const body = await response.text();
    let data = null;

    if (body) {
      try {
        data = JSON.parse(body);
      } catch (error) {
        data = { error: body };
      }
    }

    if (!response.ok) {
      const errorMessage = data?.error || "Ошибка запроса к API";
      throw new Error(errorMessage);
    }

    return data;
  }

  getListUrl(title) {
    const url = new URL(this.basePath, window.location.origin);

    if (title) {
      url.searchParams.set("title", title);
    }

    return `${url.pathname}${url.search}`;
  }

  async getDiscoveries(title) {
    const url = this.getListUrl(title);
    return this.request(url);
  }

  async getDiscoveryById(id) {
    return this.request(`${this.basePath}/${id}`);
  }

  async deleteDiscoveryById(id) {
    return this.request(`${this.basePath}/${id}`, {
      method: "DELETE"
    });
  }
}

export const discoveryApi = new DiscoveryApi();
