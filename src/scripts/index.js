import '../pages/index.css';
import { initialCards } from './cards.js';
import { profileFormSubmit, newPlaceFormSubmit } from './modal.js';
import { insertCard } from './card.js';

// перебор массива, создание карточек при загрузке
initialCards.forEach(function (item) {
  insertCard(item, "append");
});

// редактирование профиля
const editProfile = document.forms.editProfile;
const newPlace = document.forms.newPlace;
editProfile.addEventListener('submit', profileFormSubmit);

// добавление новой карточки
newPlace.addEventListener('submit', newPlaceFormSubmit);



