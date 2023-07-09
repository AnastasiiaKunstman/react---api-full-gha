export const BASE_URL = 'https://api.akunstman.nomoreparties.sbs';

class Auth {
    constructor({ headers }) {
        this._headers = headers;
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
        return fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
    };


    //вход
    login(email, password) {
        return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
    };


    //проверка токена
    checkToken(token) {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'Accept': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(this._checkResponse);
    };
};

const auth = new Auth({
    //baseUrl: "https://auth.nomoreparties.co",
    //baseUrl: 'https://localhost:3000',
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
    },
});

export default auth;