// отрытия МО
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeHandler);
  popup.addEventListener('click', closeByOverlay);
};

// закрытиe МО
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
  popup.removeEventListener('click', closeByOverlay);
};

// закрытие МО по Esc
function escapeHandler (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'));
  };
};

// Закрытие МО по оверлей
function closeByOverlay(item) {
  if (item.target === item.currentTarget){
    closePopup(item.target);
  }
};

export { openPopup, closePopup}