const initialCards = [
  {
    name: "In a galaxy far, far away...",
    link: "images/1.2scott-lord-hnBcyFZR--Q-unsplash.jpg",
  },
  {
    name: "Pacific North West",
    link: "images/2.2aiden-_luqEchlLxQ-unsplash.jpg",
  },
  {
    name: "Fall, my favorite time of the year!",
    link: "images/3.2noah-silliman-y3IwQ9hUE4A-unsplash.jpg",
  },
  {
    name: "Rocky Mountain high",
    link: "images/4.2mike-scheid-xoYPV4oVQJI-unsplash.jpg",
  },
  {
    name: "Gravel ride'n",
    link: "images/5.2alessio-soggetti-sJE9qSemdFk-unsplash.jpg",
  },
  {
    name: "Pike Place Market, reminds me of grandpa.",
    link: "images/6.2david-izquierdo-XXec738eA9I-unsplash.jpg",
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
