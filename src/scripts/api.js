const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '2a027149-b10c-4632-913a-0fa2880270f5',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Запрос массива карточек
export const getCards = () => {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
}

// Запрос данных пользователя
export const getUser = () => {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
}

// Запрос на УДАЛЕНИЕ карточки
export const deleteCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers:  config.headers,
  })
  .then(handleResponse)
}

// Запрос на размещение данных НОВОЙ карточки
export const postCard = (newName, newLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink
    })
  })
  .then(handleResponse)
}

// Запрос при постановке LIKE
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse)
}

// Запрос при снятии LIKE
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse)
}

// редактирование ПРОФИЛЯ
export const editUser = (newName, newDecription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDecription
    })
  })
  .then(handleResponse)
};

// редактирование АВАТАРА
export const editAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
  .then(handleResponse)
};