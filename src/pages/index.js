import "./index.css";

import { enableValidation } from "../scripts/validation.js";
import { disableButton } from "../scripts/validation.js";
import { settings } from "../scripts/validation.js";
import { resetValidation } from "../scripts/validation.js";

import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/avatar.jpg";
import pencilSrc from "../images/pencil.svg";
import newPostSrc from "../images/new_post.svg";

const logoImage = document.getElementById("logo-svg");
logoImage.src = logoSrc;
const avatarImage = document.getElementById("avatar");
avatarImage.src = avatarSrc;
const pencilImage = document.getElementById("pencil-svg");
pencilImage.src = pencilSrc;
const newPostImage = document.getElementById("new_post-svg");
newPostImage.src = newPostSrc;

import galaxyImage from "../images/1.2scott-lord-hnBcyFZR--Q-unsplash.jpg";
import pacificNorthWestImage from "../images/2.2aiden-_luqEchlLxQ-unsplash.jpg";
import fallImage from "../images/3.2noah-silliman-y3IwQ9hUE4A-unsplash.jpg";
import rockyMountainsImage from "../images/4.2mike-scheid-xoYPV4oVQJI-unsplash.jpg";
import gravelBikeImage from "../images/5.2alessio-soggetti-sJE9qSemdFk-unsplash.jpg";
import pikesPlaceImage from "../images/6.2david-izquierdo-XXec738eA9I-unsplash.jpg";

const initialCards = [
  {
    name: "In a galaxy far, far away...",
    link: galaxyImage,
    alt: "photo of galaxy",
  },
  {
    name: "Pacific North West",
    link: pacificNorthWestImage,
    alt: "photo of pacific north west ocean",
  },
  {
    name: "Fall, my favorite time of the year!",
    link: fallImage,
    alt: "photo of mountains in fall",
  },
  {
    name: "Rocky Mountain high",
    link: rockyMountainsImage,
    alt: "photo of mountains",
  },
  {
    name: "Gravel ride'n",
    link: gravelBikeImage,
    alt: "photo of riding a bike on a dirt road",
  },
  {
    name: "Pike Place Market, reminds me of grandpa.",
    link: pikesPlaceImage,
    alt: "photo of Pikes Place Market",
  },
];

const closeButtons = document.querySelectorAll(".modal__close-button");

// profile edit selectors
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileName = document.querySelector(".profile__name");
const editProfileDescription = document.querySelector(".profile__description");

// edit modal elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile-form"];
const editPostSubmitButton = editModal.querySelector(".modal__submit-button");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalName = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);

// new-post button
const newPostButton = document.querySelector(".profile__new-post-button");

// new-post modal elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = document.forms["new-post-form"];
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostLink = newPostModal.querySelector("#new-post-link-input");
const newPostCaption = newPostModal.querySelector("#new-post-caption-input");

//image-preview modal elements
const imagePreviewModal = document.querySelector("#preview-modal");
const imagePreviewCloseButton = imagePreviewModal.querySelector(
  ".modal__close-button"
);
const imagePreviewEl = imagePreviewModal.querySelector(".modal__image");
const imagePreviewCaption = imagePreviewModal.querySelector(".modal__caption");

// cards
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", data.alt);

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(imagePreviewModal);
    imagePreviewEl.src = data.link;
    imagePreviewCaption.textContent = data.name;
    imagePreviewEl.alt = data.alt;
  });

  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

// open, close, and submit modal-forms functions
function closeModalOptions(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOptions);
  modal.addEventListener("mousedown", closeModalOptions);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOptions);
  modal.removeEventListener("mousedown", closeModalOptions);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfileName.textContent = editModalName.value;
  editProfileDescription.textContent = editModalDescription.value;
  closeModal(editModal);
  disableButton(editPostSubmitButton, settings);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: newPostCaption.value,
    link: newPostLink.value,
  };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);
  closeModal(newPostModal);
  evt.target.reset();
  disableButton(newPostSubmitButton, settings);
}

// event listeners for buttons
profileEditButton.addEventListener("click", () => {
  editModalName.value = editProfileName.textContent;
  editModalDescription.value = editProfileDescription.textContent;
  resetValidation(
    editFormElement,
    [editModalName, editModalDescription],
    settings
  );
  openModal(editModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

initialCards.forEach((card) => {
  const cardEl = getCardElement(card);
  renderCard(card);
});

enableValidation(settings);
