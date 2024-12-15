import { insertCard } from "./card";

export const placesList = document.querySelector('.places__list');

// иницилизация кнопок "редактировать", "добавить", "закрыть"
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');

// инициализация модальных окон
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// массив модальных окон
const popupWindowsArr = [popupEdit, popupNewCard, popupImage];

// анимация открытия модального окна
popupWindowsArr.forEach((item) => {
  item.classList.add('popup_is-animated');
})

// Модальные окна с картинками
function createModalCard (evt) {
  const image = document.querySelector('.popup__image');
  const caption = document.querySelector('.popup__caption');
  image.setAttribute('src', evt.target.src);
  caption.textContent = evt.target.alt;
}
// "слушатель" на картинках
placesList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    createModalCard(evt);
    popupOpen(popupImage);
  };
});

// закрытие МО по нажатию на Esc
function escapeHandler (evt) {
  popupWindowsArr.forEach((item) => {
    if (evt.key === "Escape" && item.classList.contains('popup_is-opened')) {
      popupClose(item);
    };
  });
};

// закрытие МО по нажатию на оверлей
function overlayHandler () {
  popupWindowsArr.forEach((item) => {
    item.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget){
        popupClose(evt.target);
      }
    });
  })
};

// функция отрытия МО
function popupOpen(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeHandler);
  overlayHandler(popup);
  typeFields();
};

// слушатель на массиве кнопок "закрыть"
closeButton.forEach((elem) => {
  elem.addEventListener('click', () => {
    popupWindowsArr.forEach((item) =>{
      popupClose(item);
    });
  });
});

// функция закрытия МО по кнопке "закрыть"
function popupClose(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
};

// слушатель на кнопке "редактировать"
editButton.addEventListener('click', function() {
  popupOpen(popupEdit);
});

// слушатель на кнопке "добавить"
addButton.addEventListener('click', function() {
  popupOpen(popupNewCard);
});

// * * * формы * * * //

// поля МО "редактировать"
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
 
// обработчик форм МО "редактировать"
export function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = evt.target.name.value;
  profileDescription.textContent = evt.target.description.value;
  evt.target.name.value = '';
  evt.target.description.value = '';
  popupClose(popupEdit);
};

// заполнение полей МО 
function typeFields () {
  editProfile.name.value = profileTitle.textContent;
  editProfile.description.value = profileDescription.textContent;
};

// обработчик МО "добавить"
export function newPlaceFormSubmit(evt){
  evt.preventDefault();
  const newName = newPlace.placeName.value;
  const newLink = newPlace.link.value;
  const newItem = {
    name: `${newName}`, 
    link: newLink,
    local: 0,
    description: 0
  };
  insertCard(newItem, "prepend");
  newPlace.placeName.value = '';
  newPlace.link.value = '';
  popupClose(popupNewCard);
};