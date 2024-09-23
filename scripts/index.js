const initialCards = [
  {
    name: "In a galaxy far, far away...",
    link: "images/1.2scott-lord-hnBcyFZR--Q-unsplash.jpg",
    alt: "photo of galaxy",
  },
  {
    name: "Pacific North West",
    link: "images/2.2aiden-_luqEchlLxQ-unsplash.jpg",
    alt: "photo of pacific north west ocean",
  },
  {
    name: "Fall, my favorite time of the year!",
    link: "images/3.2noah-silliman-y3IwQ9hUE4A-unsplash.jpg",
    alt: "photo of mountains in fall",
  },
  {
    name: "Rocky Mountain high",
    link: "images/4.2mike-scheid-xoYPV4oVQJI-unsplash.jpg",
    alt: "photo of mountains",
  },
  {
    name: "Gravel ride'n",
    link: "images/5.2alessio-soggetti-sJE9qSemdFk-unsplash.jpg",
    alt: "photo of riding a bike on a dirt road",
  },
  {
    name: "Pike Place Market, reminds me of grandpa.",
    link: "images/6.2david-izquierdo-XXec738eA9I-unsplash.jpg",
    alt: "photo of Pikes Place Market",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileName = document.querySelector(".profile__name");
const editProfileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const modalCloseButton = editModal.querySelector(".modal__close-button");
const editModalName = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardNameEl.textContent = data.name;
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", data.alt);
  return cardElement;
}

function openModal() {
  editModalName.value = editProfileName.textContent;
  editModalDescription.value = editProfileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfileName.textContent = editModalName.value;
  editProfileDescription.textContent = editModalDescription.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
editFormElement.addEventListener("submit", handleEditFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
