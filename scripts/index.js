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

const editButton = document.querySelector(".profile__edit-button");

const editModal = document.querySelector("#edit-modal");

const modalCloseButton = editModal.querySelector(".modal__close-button");

function openModal() {
  editModal.classList.add("modal_opened");
}

editButton.addEventListener("click", openModal);

function closeModal() {
  editModal.classList.remove("modal_opened");
}

modalCloseButton.addEventListener("click", closeModal);
