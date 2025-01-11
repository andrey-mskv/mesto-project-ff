export function createCard(cardContent, user, showImage, remove, disLike, setLike) {

  const cardTemplate = document.querySelector('#card-template').content;

  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title')
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const likeCount = cardItem.querySelector('.card__like-count');

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  // Проверка пользователя у карточек
  if (cardContent.owner._id !== user._id) {
    deleteButton.style.display = 'none';
    deleteButton.disabled = true;
  };

  // Проверка userID у LIKE
  const matchUserId = cardContent.likes.some((id) => {return id._id === user._id});
  if (matchUserId) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  likeCount.textContent = cardContent.likes.length;

  deleteButton.addEventListener('click', () => remove(cardItem, cardContent));

  likeButton.addEventListener('click', (evt) => {
    
    if (evt.target.classList.contains('card__like-button_is-active')) {
      disLike(evt.target, cardContent._id);
      evt.target.classList.remove('card__like-button_is-active')
    } else {
      setLike(evt.target, cardContent._id);
      evt.target.classList.add('card__like-button_is-active')
    }
  });
  
  cardImage.addEventListener('click', showImage);

  return cardItem;
};

// удаление карточки
export function deleteCard(element, message) {
  element.remove();
  console.log(message);
}

// счетчик лайков
export const setCount = (evt, count) => {
  console.log(evt.nextElementSibling.textContent)
  evt.nextElementSibling.textContent = count;
}

