const cardsContainer = document.querySelector('.places-list.root__section');
const divPopupEditProfile = document.querySelector('div.popup.root__about');
const divPopupImage = document.querySelector('div.root__image');
const divPopupNewCard = document.querySelector('div.root__new-card');

const userPhoto = document.querySelector('div.user-info__photo');
const userNameHTML = document.querySelector('h1.user-info__name');
const userAboutHTML = document.querySelector('p.user-info__job');

const formNewCardValidator = new FormValidator(divPopupNewCard);
const formEditValidator = new FormValidator(divPopupEditProfile);
const newCardPopup = new NewCardPopup(divPopupNewCard);
const userInfo = new UserInfo(userNameHTML, userAboutHTML, userPhoto);
const imagePopup = new ImagePopup(divPopupImage);
const cardlist = new CardList(cardsContainer);

const options = {
  url: 'http://localhost:3000/',
  getRequest: {
    headers: {
      authorization: '5783e296-2ee3-4f4f-aa27-91c21b36586c'
    }
  },
};
const api = new Api(options);
const editProfilePopup = new EditProfilePopup(divPopupEditProfile, userInfo, userNameHTML, userAboutHTML, api);

api.getInitialCards()
  .then((data) => {
    const cards = data.map(i => new Card(i.name, i.link, imagePopup));
    const cardlist = new CardList(cardsContainer, cards);
    cardlist.render();
  })
  .catch((err) => {
    console.log(err);
  });

api.getUserInfo()
  .then((data) => {
    const randomPerson = Math.floor(Math.random() * data.length); // new
    userInfo.setUserInfo(data[randomPerson].name, data[randomPerson].about); // new
    userInfo.updateUserPhoto(data[randomPerson].avatar); // new
  })
  .catch((err) => {
    console.log(err);
  });



document.querySelector('.button.user-info__edit').addEventListener('click', () => {
  editProfilePopup.open();
  formEditValidator.resetErrorrs();
});

document.querySelector('.button.user-info__button').addEventListener('click', () => {
  newCardPopup.open();
  formNewCardValidator.resetErrorrs();
});

newCardPopup.popup.addEventListener('submit', e => {
  e.preventDefault();

  const card = new Card(newCardPopup.userCardName.value, newCardPopup.userCardURL.value, imagePopup);
  cardlist.addCard(card.create());

  newCardPopup.close();
});