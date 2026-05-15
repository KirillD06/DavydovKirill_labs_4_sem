class Ajax {
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.handleResponse(xhr, callback);
      }
    };
  }

  handleResponse(xhr, callback) {
    try {
      const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      callback(data, xhr.status);
    } catch (error) {
      callback(null, xhr.status || 0);
    }
  }
}

export const ajax = new Ajax();
