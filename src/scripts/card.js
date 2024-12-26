// генерация карточек
function createCard(cardContent, deleteCard, likeToggle, openImageToggle) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title')
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const placesList = document.querySelector('.places__list');

  cardImage.setAttribute('src', cardContent.link);
  cardImage.setAttribute('alt', cardContent.name);
  cardTitle.textContent = cardContent.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardItem);
  });
  cardLikeButton.addEventListener('click', likeToggle);
  placesList.addEventListener('click', openImageToggle);
  return(cardItem);
};

// удаление карточки
function removeCard(card) {
  card.remove();
}

// обработка like
function pressLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, removeCard, pressLike };



