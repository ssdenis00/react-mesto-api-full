class ApiAuth {
  #url;
  #headers;

  constructor(options) {
    this.#url = options.url;
    this.#headers = options.headers;
  }

  #getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  register(userData) {
    return fetch(`${this.#url}/signup`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify({
        password: userData.pass,
        email: userData.email,
      }),
    }).then(this.#getResponseData);
  }

  login(userData) {
    return fetch(`${this.#url}/signin`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify({
        password: userData.pass,
        email: userData.email,
      }),
    }).then(this.#getResponseData);
  }

  checkToken(jwt) {
    return fetch(`${this.#url}/users/me`, {
      method: "GET",
      headers: {
        ...this.#headers,
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#getResponseData);
  }
}

const apiAuth = new ApiAuth({
  url: "https://api.mesto-denis-l.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : '',
  },
});

export default apiAuth;
