class Auth {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers
    };

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    };

    //регистрация
    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
    };


    //вход
    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
    };


    //проверка токена
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(this._checkResponse);
    };
};

const auth = new Auth({
    //baseUrl: "https://auth.nomoreparties.co",
    //baseUrl: 'https://localhost:3000',
    baseUrl: 'https://api.akunstman.nomoreparties.sbs',
    headers: {
        'content-type': 'application/json',
    },
});

export default auth;