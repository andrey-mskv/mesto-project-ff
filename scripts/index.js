// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function makeCard(cardContent, cardRemove) {

    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title')
    const deleteButton = cardItem.querySelector('.card__delete-button');

    cardImage.setAttribute('src', cardContent.link);
    cardImage.setAttribute('alt', cardContent.description);
    cardTitle.textContent = cardContent.name;

    deleteButton.addEventListener('click', function () {
      cardRemove(cardItem);
    })

    return(cardItem);
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
 
  initialCards.forEach(function (itemContent) {
    const cardItem = makeCard(itemContent, deleteCard);
    placesList.append(cardItem);
})