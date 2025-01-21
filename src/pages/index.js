import "./index.css";
import Api from "../utils/Api.js";
import { enableValidation } from "../scripts/validation.js";
import { disableButton } from "../scripts/validation.js";
import { settings } from "../scripts/validation.js";
import { resetValidation } from "../scripts/validation.js";

import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/avatar.jpg";
import pencilSrc from "../images/pencil.svg";
import newPostSrc from "../images/new_post.svg";
import pencilAvatarSrc from "../images/pencil-white.svg";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1810d547-91a3-4cf2-9027-84faa0c5dd2e",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, users]) => {
    cards.forEach((card) => {
      renderCard(card);
    });

    editProfileName.textContent = users.name;
    editProfileDescription.textContent = users.about;
    avatarImage.src = users.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

const logoImage = document.getElementById("logo-svg");
logoImage.src = logoSrc;
const avatarImage = document.getElementById("avatar");
avatarImage.src = avatarSrc;
const pencilImage = document.getElementById("pencil-svg");
pencilImage.src = pencilSrc;
const newPostImage = document.getElementById("new_post-svg");
newPostImage.src = newPostSrc;
const avatarEdit = document.getElementById("pencil-avatar");
avatarEdit.src = pencilAvatarSrc;

const closeButtons = document.querySelectorAll(".modal__close-button");
const cancelButton = document.querySelector(".modal__button-cancel");

// profile edit selectors
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileName = document.querySelector(".profile__name");
const editProfileDescription = document.querySelector(".profile__description");

// edit modal elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile-form"];
const editPostSubmitButton = editModal.querySelector(".modal__button");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalName = editModal.querySelector("#profile-name-input");
const editModalDescription = editModal.querySelector(
  "#profile-description-input"
);

const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarFormElement = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-pic-input");
const avatarSubmitButton = avatarModal.querySelector(".modal__button");

const cardDeleteModal = document.querySelector("#card-delete-modal");
const cardDeleteForm = cardDeleteModal.querySelector(".modal__form");
const submitDeleteBtn = cardDeleteModal.querySelector("#delete-submit");

// new-post button
const newPostButton = document.querySelector(".profile__new-post-button");

// new-post modal elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = document.forms["new-post-form"];
const newPostSubmitButton = newPostModal.querySelector(".modal__button");
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

let selectedCard;
let selectedCardId;

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

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-button_liked");
  }

  cardLikeBtn.addEventListener("click", (evt) =>
    handleCardLike(evt, data._id, data.isLiked)
  );

  cardDeleteBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );

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

function handleCardLike(evt, id, isLiked) {
  api
    .handleLike(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_liked");
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data;
  openModal(cardDeleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(cardDeleteModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitBtn.textContent = "Delete";
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: editModalName.value,
      about: editModalDescription.value,
    })
    .then((data) => {
      editProfileName.textContent = data.name;
      editProfileDescription.textContent = data.about;
      closeModal(editModal);
      disableButton(editPostSubmitButton, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  api
    .editUserAvatar({ avatar: avatarInput.value })
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
      evt.target.reset();
      disableButton(avatarSubmitButton, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .postCard({ name: newPostCaption.value, link: newPostLink.value })
    .then((data) => {
      renderCard(data);
      closeModal(newPostModal);
      evt.target.reset();
      disableButton(newPostSubmitButton, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
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

cancelButton.addEventListener("click", () => {
  closeModal(cardDeleteModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);
cardDeleteForm.addEventListener("submit", handleDeleteSubmit);

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

profileAvatarBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

enableValidation(settings);
