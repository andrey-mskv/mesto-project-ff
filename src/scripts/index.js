import '../pages/index.css';
import {closePopup, openPopup} from './modal.js';
import {createCard, deleteCard, updateLike, statusLikeBtn} from './card.js';
import {getCards,
        getUser,
        deleteCardAPI,
        postCard,
        putLike,
        deleteLike,
        editUser,
        editAvatar
        } from './api.js';
import {enableValidation,
        clearValidation
        } from './validation.js';
import {config} from './validationConfig.js'

// кнопки "редактировать", "добавить", "закрыть"
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const avatarButton = document.querySelector('.profile__image-button');

// модальные окна (МО)
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');

// массив МО
const popups = [popupEdit, popupNewCard, popupImage, popupAvatar];

// формы МО
const editProfile = document.forms.editProfile;
const newPlace = document.forms.newPlace;
const newAvatar = document.forms.newAvatar;

// поля МО ПРОФИЛЬ
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// поле МО АВАТАР
const profileAvatar = document.querySelector('.profile__image');

// контейнер списка карточек
const placesList = document.querySelector('.places__list');

// заполнение полей МО ПРОФИЛЬ
function typeFields () {
  editProfile.name.value = profileTitle.textContent;
  editProfile.description.value = profileDescription.textContent;
};

// слушатель на кнопке ПРОФИЛЬ
editButton.addEventListener('click', function() {
  clearValidation(popupEdit, config);
  typeFields(); //заполнение полей формы
  openPopup(popupEdit);
});

// слушатель на кнопке ДОБАВИТЬ карточку
addButton.addEventListener('click', function() {
  clearValidation(popupNewCard, config);
  openPopup(popupNewCard);
});

// слушатель на кнопке АВАТАР
avatarButton.addEventListener('click', function() {
  clearValidation(popupAvatar, config);
  openPopup(popupAvatar);
})

// слушатель на массиве кнопок ЗАКРЫТЬ
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
  image.src = evt.target.src;
  image.alt = evt.target.alt
  caption.textContent = evt.target.alt;
}

// открытия МО с изображением
function showImage (evt) {
  if (evt.target.classList.contains('card__image')) {
    createImagePopup(evt);
    openPopup(popupImage);
  };
}

// слушатель на форме ПРОФИЛЯ
editProfile.addEventListener('submit', profileFormSubmit);

// обработчик формы МО ПРОФИЛЯ
function profileFormSubmit(evt) {
  evt.preventDefault(); // сброс стандарного повведения формы
  renderLoad(true, evt.target);
  editUser(editProfile.name.value, editProfile.description.value)
  .then(data => {
    profileTitle.textContent = data.name; // получение значения name
    profileDescription.textContent = data.about; // получение значения description
    console.log(`Имя: ${data.name}\nОписание: ${data.about}`);
  })
  .then(() => {
    closePopup(popupEdit)
  })
  .catch((err) => console.log(err))
  .finally(() => {
    renderLoad(false, evt.target);
  });
};

// слушалетль на форме новой КАРТОЧКИ
newPlace.addEventListener('submit', newPlaceFormSubmit);

// обработчик формы МО новой КАРТОЧКИ
function newPlaceFormSubmit(evt){
  evt.preventDefault(); // сброс стандартного поведения кнопки
  renderLoad(true, evt.target); // "спиннер"
 
  postCard(newPlace.placeName.value, newPlace.link.value)
  .then((card) => {
    const cardItem = createCard(card, card.owner, showImage, hdc, hlb);
    placesList.prepend(cardItem);
    newPlace.reset();
    closePopup(popupNewCard);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoad(false, evt.target);
  })
};

// Редактирование АВАТАРА
newAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoad(true, evt.target);
  editAvatar(evt.target.avatar.value)
  .then(data => {
    profileAvatar.style.background = `url(${data.avatar}) center / cover`;
    console.log('Ссылка на аватар ' + data.avatar)
  })
  .then(() => {
    closePopup(popupAvatar);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoad(false, evt.target);
  })
});

// анимация открытия МО
popups.forEach((item) => {
  item.classList.add('popup_is-animated');
})

// "Спиннер"
function renderLoad(isLoad, form) {
  form.button.textContent = isLoad ? 'Сохранение...' : 'Сохранить'; // Условный (тернарный) оператор
};

// первоначальная загрузка cards & user
Promise.all([
  getCards(),
  getUser()
])
.then(([cards, user]) => {
  // данные профиля
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.style.background = `url(${user.avatar}) center / cover`;
  // цикл массива данных карточек
  cards.forEach((card) => {
    const cardItem = createCard(card, user, showImage, hdc, hlb);
    placesList.append(cardItem);
  })
})
.catch((err) => console.log(err));

// удаление карточки
// hdc - handler of delete button of card
const hdc = (item, cardId) => {
  deleteCardAPI(cardId._id)
  .then((data) => deleteCard(item, data.message))
  .catch((err) => console.log(err));
}

// обновление obj.likes.Array
// hlb - handler of like button
const hlb = (btn, cardId) => {
  if(statusLikeBtn(btn)) {
    deleteLike(cardId)
    .then((data) => {
      updateLike(btn, data);
      console.log('дизлайк \n' + 'счетчик: ' + data.likes.length);
    })
    .catch((err) => console.log(err));
  } else {
    putLike(cardId)
    .then((data) => {
      updateLike(btn, data);
      console.log('лайк \n' + 'счетчик: ' + data.likes.length);
    })
    .catch((err) => console.log(err));
  }
};

enableValidation(config); 