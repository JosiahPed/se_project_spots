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

// profile edit selectors
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileName = document.querySelector(".profile__name");
const editProfileDescription = document.querySelector(".profile__description");

// edit modal elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const modalCloseButton = editModal.querySelector(".modal__close-button");
const editModalName = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);

// new-post button
const newPostButton = document.querySelector(".profile__new-post-button");

// new-post modal elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostLink = newPostModal.querySelector(".new-post-link-input");
const newPostCaption = newPostModal.querySelector(".new-post-caption-input");

// cards
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

// open, close, and submit modal-forms functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfileName.textContent = editModalName.value;
  editProfileDescription.textContent = editModalDescription.value;
  closeModal(editModal);
}

// event listeners for buttons
profileEditButton.addEventListener("click", () => {
  editModalName.value = editProfileName.textContent;
  editModalDescription.value = editProfileDescription.textContent;
  openModal(editModal);
});
modalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});
editFormElement.addEventListener("submit", handleEditFormSubmit);

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});
newPostCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

initialCards.forEach((card) => {
  const cardEl = getCardElement(card);
  cardsList.prepend(cardEl);
});
