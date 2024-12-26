import '../pages/index.css';
import { initialCards } from './cards.js';
import { closePopup, openPopup } from './modal.js';
import { createCard, removeCard, pressLike } from './card.js';

// кнопки "редактировать", "добавить", "закрыть"
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// модальные окна (МО)
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
// массив МО
const popups = [popupEdit, popupNewCard, popupImage];

// формы МО
const editProfile = document.forms.editProfile;
const newPlace = document.forms.newPlace;

// поля МО "редактировать"
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// инициализация(?) карточек в списке
function insertCard(content, method = "prepend") {
  const placesList = document.querySelector('.places__list');
  const cardItem = createCard(content, removeCard, pressLike, openImage);
  placesList[ method ](cardItem);
};

// размещение карточек при загрузке страницы
initialCards.forEach(function (item) {
  insertCard(item, "append");
});

// заполнение полей МО "редактировать"
function typeFields () {
  editProfile.name.value = profileTitle.textContent;
  editProfile.description.value = profileDescription.textContent;
};

// слушатель на кнопке "редактировать"
editButton.addEventListener('click', function() {
  typeFields();
  openPopup(popupEdit);
});

// слушатель на кнопке "добавить"
addButton.addEventListener('click', function() {
  openPopup(popupNewCard);
});

// слушатель на массиве кнопок "закрыть"
closeButtons.forEach((btn) => {
  const popup = btn.closest('.popup')
  btn.addEventListener('click', () => {
      closePopup(popup);
  });
});

// сборка МО с изображением
function createImagePopup (evt) {
  const image = document.querySelector('.popup__image');
  const caption = document.querySelector('.popup__caption');
  image.setAttribute('src', evt.target.src);
  image.setAttribute('alt', evt.target.alt);
  caption.textContent = evt.target.alt;
}

// открытия МО с картинкой
function openImage (evt) {
  if (evt.target.classList.contains('card__image')) {
    createImagePopup(evt);
    openPopup(popupImage);
  };
}

// редактирование профиля
editProfile.addEventListener('submit', profileFormSubmit);

// добавление новой карточки
newPlace.addEventListener('submit', newPlaceFormSubmit);

// обработчик формы МО "добавить"
function newPlaceFormSubmit(evt){
  evt.preventDefault();
  const newName = newPlace.placeName.value;
  const newLink = newPlace.link.value;
  const newItem = {
    name: newName,
    link: newLink,
  };
  insertCard(newItem, "prepend");
  newPlace.reset();
  closePopup(popupNewCard);
};

// обработчик формы МО "редактировать"
function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = evt.target.name.value;
  profileDescription.textContent = evt.target.description.value;
  closePopup(popupEdit);
};

// анимация открытия модального окна
popups.forEach((item) => {
  item.classList.add('popup_is-animated');
})