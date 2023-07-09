class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._credentials = options.credentials
    };


    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    };

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    };


    //Информация о пользователе
    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            credentials: this._credentials,
        })
    };

    //Картинки с сервера
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: this._credentials,
        })
    };


    //Редактирование информации о пользователе
    changeUserInfo(name, about) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
    };


    //Создать новую карточку
    addNewCard(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify(data)
        })
    };

    //Изменение аватара
    changeAvatar(avatar) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                avatar: avatar
            }),
        })
    };

    //Удаление карточки
    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: this._credentials,
        })
    };

    //Лайк
    changeLikeCardStatus(cardId, isLiked) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
            credentials: this._credentials,
        })
    };

    setToken(token) {
        this._headers.authorization = `Bearer ${token}`;
    };
    
};

const api = new Api({
    //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    //baseUrl: 'https://localhost:3000',
    baseUrl: 'https://api.akunstman.nomoreparties.sbs',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
    },
    credentials: 'include',
});

export default api;