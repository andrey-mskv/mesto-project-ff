
import { placesList } from "./modal";

function createCard(cardContent, cardRemove, likeToggle) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title')
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');

  cardImage.setAttribute('src', cardContent.link);
  cardImage.setAttribute('alt', cardContent.name);
  cardTitle.textContent = cardContent.name;

  deleteButton.addEventListener('click', function () {
    cardRemove(cardItem);
  });

  cardLikeButton.addEventListener('click', likeToggle);

  return(cardItem);
};

// вставка карточек /начало-конец/
function insertCard(item, method = "prepend") {
  const cardItem = createCard(item, deleteCard, pressLike);
  placesList[ method ](cardItem);
};

function deleteCard(card) {
  card.remove();
}

function pressLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, insertCard, deleteCard, pressLike};



