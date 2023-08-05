import apiCfg from "./utils";

export default class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, 
      {  
        headers: this._headers
    }
    )
      .then(res => this._getResponseData(res));
  }

  getUserInfoFromServer(){
    return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers
    }
  )
  .then(res => this._getResponseData(res));
  }

  setUserAvatarOnServer(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => this._getResponseData(res))
  }

  setUserInfoOnServer(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._getResponseData(res))
  }

  addNewCard(data){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._getResponseData(res))    
  }

  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))   
  }

  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))  
  }

  addLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))  
  }
}

// const api = new Api({
//   baseUrl: 'https://api.mesto.nomoredomains.xyz',
//   headers: {
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
//     'Content-Type': 'application/json'
//   }
// });

//export default api