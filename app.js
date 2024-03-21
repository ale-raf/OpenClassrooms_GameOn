const modal = document.querySelector(".modal");
const btn = document.querySelector(".btn.register");
const modalCloseBtn = document.querySelectorAll(".modal__close");
const links = document.querySelectorAll("a");
const form = document.querySelector("form");
const modalConfirm = document.querySelector(".modal__confirm");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const birth = document.querySelector("#birth");
const experience = document.querySelector("#experience");
const conditions = document.querySelector("#conditions");
const radioButtons = document.getElementsByName("tournament");
const modalErrorMsg = document.querySelectorAll(".modal__error-msg");

let inputList = [firstname, lastname, email, birth, experience];

let response = {
  firstname: "Le champ prénom ne peut être vide",
  lastname: "Le champ nom ne peut être vide",
  email: "Veuillez renseigner une adresse mail valide",
  birth: "Renseignez une date de naissance",
  experience: "Veuillez renseigner un nombre",
  choice: "Veuillez choisir une ville",
  conditions: "Vous devez accepter nos conditions d'utilisation",
};

function resetForm() {
  document
    .querySelectorAll("input:not(.modal__submit")
    .forEach((input) => ((input.checked = false), (input.value = "")));
  modalErrorMsg.forEach(
    (msg) => ((msg.textContent = ""), (msg.style.display = "block"))
  );
}

links.forEach((link) => link.addEventListener("click", activeLink));

function activeLink(e) {
  for (let link of links) {
    link === e.target
      ? link.classList.add("active")
      : link.classList.remove("active");
  }
}

btn.addEventListener("click", openModal);

function openModal(e) {
  resetForm();
  let isModalOpen = window.getComputedStyle(modal).display === "none";
  if (isModalOpen) {
    modal.style.display = "block";
    form.style.display = "block";
    modalConfirm.style.display = "none";
  } else {
    modal.style.display = "none";
  }
}

modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

function closeModal() {
  resetForm();
  modal.style.display = "none";
}

form.addEventListener("submit", handleSubmit);

function checkBasicInput() {
  let isEmpty = "";
  for (let input of inputList) {
    if (input.value === isEmpty) {
      input.nextElementSibling.textContent = response[input.id];
      input.nextElementSibling.style.display = "block";
    } else {
      input.nextElementSibling.textContent = isEmpty;
      input.nextElementSibling.style.display = "none";
    }
  }
}

function checkRadioInput() {
  let isEmpty = "";
  for (let radio of radioButtons) {
    if (radio.checked) {
      radio.parentElement.lastElementChild.textContent = isEmpty;
      radio.parentElement.lastElementChild.style.display = "none";
      break;
    } else {
      radio.parentElement.lastElementChild.textContent = response.choice;
      radio.parentElement.lastElementChild.style.display = "block";
    }
  }
}

function checkCheckboxInput() {
  if (conditions.checked) {
    conditions.parentElement.lastElementChild.textContent = "";
    conditions.parentElement.lastElementChild.style.display = "none";
  } else {
    conditions.parentElement.lastElementChild.textContent = response.conditions;
    conditions.parentElement.lastElementChild.style.display = "block";
  }
}

function handleSubmit(e) {
  e.preventDefault();
  checkBasicInput();
  checkRadioInput();
  checkCheckboxInput();
  let isFormValid = [...modalErrorMsg].every(
    (msg) => msg.textContent === "" && msg.style.display === "none"
  );
  if (isFormValid) {
    form.style.display = "none";
    modalConfirm.style.display = "block";
  }
}
