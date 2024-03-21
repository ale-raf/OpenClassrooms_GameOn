const links = document.querySelectorAll("a");
const btn = document.querySelector(".btn.register");
// sélection éléments modal
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelectorAll(".modal__close");
const modalForm = document.querySelector("form");
const modalConfirm = document.querySelector(".modal__confirm");
const modalErrorMsg = document.querySelectorAll(".modal__error-msg");
// sélection éléments input
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const birth = document.querySelector("#birth");
const experience = document.querySelector("#experience");
const conditions = document.querySelector("#conditions");
const radioButtons = document.getElementsByName("tournament");

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

// réinitialisation du formulaire
function resetForm() {
  document
    .querySelectorAll("input:not(.modal__submit")
    .forEach((input) => ((input.checked = false), (input.value = "")));
  modalErrorMsg.forEach(
    (msg) => ((msg.textContent = ""), (msg.style.display = "block"))
  );
}

links.forEach((link) => link.addEventListener("click", activeLink));
// effet de style sur le lien actif du menu
function activeLink(e) {
  for (let link of links) {
    link === e.target
      ? link.classList.add("active")
      : link.classList.remove("active");
  }
}

btn.addEventListener("click", openModal);
// ouverture de la modal
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
// fermeture de la modal
function closeModal() {
  resetForm();
  modal.style.display = "none";
}

// contrôle des différents champs du formulaire
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

modalForm.addEventListener("submit", handleSubmit);
// soumission du formulaire
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
