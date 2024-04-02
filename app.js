// const links = document.querySelectorAll("a");
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
const modalInputs = document.querySelectorAll("input:not(.modal__submit)");

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

// links.forEach((link) => link.addEventListener("click", activeLink));
// // effet de style sur le lien actif du menu
// function activeLink(e) {
//   for (let link of links) {
//     link === e.target
//       ? link.classList.add("active")
//       : link.classList.remove("active");
//   }
// }

btn.addEventListener("click", openModal);
// ouverture de la modal
function openModal(e) {
  modal.style.display = "block";
  modalForm.style.display = "block";
  modalConfirm.style.display = "none";
  document.body.style.overflow = "hidden";
}

modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// fermeture de la modal
function closeModal() {
  resetForm();
  modal.style.display = "none";
  document.body.style.overflow = "auto";
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
    let errorMsgElt = radio.parentElement.parentElement.lastElementChild;
    if (radio.checked) {
      errorMsgElt.textContent = isEmpty;
      errorMsgElt.style.display = "none";
      break;
    } else {
      errorMsgElt.textContent = response.choice;
      errorMsgElt.style.display = "block";
    }
  }
}

function checkCheckboxInput() {
  let errorMsgElt = conditions.parentElement.lastElementChild;
  if (conditions.checked) {
    errorMsgElt.textContent = "";
    errorMsgElt.style.display = "none";
  } else {
    errorMsgElt.textContent = response.conditions;
    errorMsgElt.style.display = "block";
  }
}

// callback qui vérifie si les messages d'erreur sont affichés
const validateForm = (msg) =>
  msg.textContent === "" && msg.style.display === "none";

modalForm.addEventListener("submit", handleSubmit);
// soumission du formulaire
function handleSubmit(e) {
  e.preventDefault();
  // appel des fonctions chargées de vérifier les champs
  checkBasicInput();
  checkRadioInput();
  checkCheckboxInput();
  // validation globale du formulaire via la vérification des messages d'erreur
  let isFormValid = [...modalErrorMsg].every(validateForm);
  if (isFormValid) {
    modalForm.style.display = "none";
    modalConfirm.style.display = "block";
  }
}
