// DOM Elements
const menuIcon = document.querySelector(".icon");
const form = document.querySelector("form[name='reserve']");
const formModalBg = document.querySelector(".form.bground");
const formModalBtn = document.querySelectorAll(".form.modal-btn");
const formModalCloseBtn = document.querySelector(".form.content .close");
let submitModalBg = null;
let submitModalCloseBtn = null;

// Navigation menu
menuIcon.addEventListener("click", editNav);
// Manage the toggling of the navigation between a full menu and a hamburger menu (responsive)
function editNav() {
  const nav = document.getElementById("myTopnav");
  const barsIcon = document.querySelector(".fa-bars");
  const closeIcon = document.querySelector(".fa-close");

  if (nav && barsIcon && closeIcon) {
    nav.classList.toggle("responsive");
    barsIcon.style.display = nav.classList.contains("responsive")
      ? "none"
      : "block";
    closeIcon.style.display = nav.classList.contains("responsive")
      ? "block"
      : "none";
  }
}

/**
 * Submit the form if all inputs are valid
 */
function initializeForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    /**
     * Calls the validation function to check if the form inputs are valid.
     * Validate() returns a boolean indicating if the form is valid
     */
    const isValid = validate();
    if (isValid) {
      closeFormModal();
      clearAllErrors();
      showSubmitModal();
    }
  });
}

// Launch modal event
formModalBtn.forEach((btn) => btn.addEventListener("click", launchFormModal));
// Launch modal
function launchFormModal() {
  if (formModalBg) {
    // Display the modal by changing the display style  to "block"
    formModalBg.style.display = "block";
  }
}

// Close form modal event
formModalCloseBtn.addEventListener("click", closeFormModal);
// Close modal form
function closeFormModal() {
  if (form) {
    // Reset the form and clear all errors when closing the modal
    form.reset();
    clearAllErrors();
    if (formModalBg) {
      // Hide the modal by changing the display style to "none"
      formModalBg.style.display = "none";
    }
  }
}

// Create the HTML structure for the submit modal
function createSubmitModal() {
  const submitModalBtn = document.createElement("button");
  submitModalBtn.classList.add("submitModal", "close-btn");
  submitModalBtn.textContent = "Fermer";
  submitModalBtn.addEventListener("click", closeSubmitModal);

  const submitModalBody = document.createElement("div");
  submitModalBody.classList.add("submitModal", "modal-body");
  submitModalBody.textContent = "Merci pour votre inscription";
  submitModalBody.appendChild(submitModalBtn);

  submitModalCloseBtn = document.createElement("span");
  submitModalCloseBtn.classList.add("submitModal", "close");
  submitModalCloseBtn.addEventListener("click", closeSubmitModal);

  const submitModalContent = document.createElement("div");
  submitModalContent.classList.add("submitModal", "content");
  submitModalContent.appendChild(submitModalBody);
  submitModalContent.appendChild(submitModalCloseBtn);

  submitModalBg = document.createElement("div");
  submitModalBg.classList.add("submitModal", "bground");
  submitModalBg.appendChild(submitModalContent);

  const main = document.querySelector("main");
  main?.appendChild(submitModalBg);
}

// Display the modal by calling the HTML creation function and changing the display style to "block"
function showSubmitModal() {
  createSubmitModal();
  submitModalBg.style.display = "block";
}

// Hides the modal by changing the display style to "none"
function closeSubmitModal() {
  submitModalBg.style.display = "none";
}

// Calls the submission function after the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeForm();
});

/**
 * Gets the value of a form element by its unique ID.
 *
 * @param {string} id - The form element ID.
 * @returns {string | null} - The form element value or null if the form element is not found.
 */
function getFormValueById(id) {
  const element = document.getElementById(id);
  return element ? element.value : "";
}

/**
 * Validates the first name input or handle errors.
 *
 * @param {string} firstName - The first name entered by the user.
 * @returns {Array} - An array containing error messages if validation fails, or an empty array if the validation is successful.
 */
function validateFirstName(firstName) {
  const errors = [];
  // Checks if the first name is empty
  if (firstName === "") {
    errors.push("Veuillez écrire votre prénom.");
    // Checks if the first name has at least 2 characters
  } else if (firstName.trim().length < 2) {
    errors.push(
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
  }

  return errors;
}

/**
 * Validates the last name input or handle errors.
 *
 * @param {string} lastName - The last name entered by the user.
 * @returns {Array} -  An array containing error messages if validation fails, or an empty array if the validation is successful.
 */
function validateLastName(lastName) {
  const errors = [];

  // Checks if the last name is empty
  if (lastName === "") {
    errors.push("Veuillez écrire votre nom.");
    // Checks if the last name has at least 2 characters
  } else if (lastName.trim().length < 2) {
    errors.push("Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }

  return errors;
}

/**
 * Validates the email input or handle errors.
 *
 * @param {string} email - The email entered by the user.
 * @returns {Array} -  An array containing error messages if validation fails, or an empty array if the validation is successful.
 */
function validateEmail(email) {
  const errors = [];
  // Regulars expression for email validation
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Checks if the email is empty
  if (email === "") {
    errors.push("Veuillez écrire votre adresse email.");
    // Checks if the email is valid after the regex test
  } else if (!emailRegExp.test(email.trim())) {
    errors.push("Votre adresse email n'est pas valide.");
  }

  return errors;
}

/**
 * Validates the user's birthdate to ensure it is in the "YYYY-MM-DD" format and the user is of legal age or handle errors otherwise.
 *
 * @param {string} birthdate - The birthdate entered by the user.
 * @returns {Array} - An array containing error messages if validation fails, or an empty array if the validation is successful.
 */
function validateBirthdate(birthdate) {
  const errors = [];
  let ageDiff = null;
  let birthdateDate = null;

  /* Converts a string to a Date object to get the user's age
   * by calculating the difference between the current year and the user's birthdate */
  if (typeof birthdate === "string" && birthdate !== "") {
    birthdateDate = new Date(birthdate);
    // Gets the current date
    const today = new Date();
    ageDiff = today.getFullYear() - birthdateDate.getFullYear();
  } else {
    errors.push(
      "Please enter a valid date of birth in the 'YYYY-MM-DD' format."
    );
  }

  // Checks the age range
  if (ageDiff !== null && (ageDiff < 16 || ageDiff > 150)) {
    errors.push("Your age does not meet our registration requirements.");
  }

  return errors;
}

/**
 * Validates the tournament quantity entered by the user in which he has participated or handle errors.
 *
 * @param {string} quantity - The quantity entered by the user
 * @returns {Array} - An array containing error messages if validation fails, or an empty array if the validation is successful.
 */
function validateTournamentQuantity(quantity) {
  const errors = [];

  // Check if the tournament quantity is empty
  if (quantity === "") {
    errors.push(
      "Veuillez écrire le nombre de tournois auxquels vous avez participé."
    );
    // Verify if the user entry is valid; if not, check for specific error conditions
  } else {
    const quantityValue = parseInt(quantity, 10);
    if (isNaN(quantityValue)) {
      errors.push("Le nombre de tournois doit être un nombre valide.");
    } else if (quantityValue < 0) {
      errors.push("Le nombre de tournois ne peux être négatif.");
    } else if (quantityValue >= 2500) {
      errors.push(
        "Veuillez vérifier le nombre de tournoi que vous avez saisi."
      );
    }
  }
  return errors;
}

/**
 * Retrieves the location input value that the user has checked
 *
 * @returns {string} - A string containing the input value
 */
function getTournamentLocation() {
  const selectedLocation = document.querySelector(
    "input[name=location]:checked"
  );
  return selectedLocation ? selectedLocation.value : "";
}

/**
 * Validates the user's favorite tournament location or handle errors.
 *
 * @param {string} location - The tournament location selected by the user
 * @returns {Array} - An array containing error messages if validation fails, or an empty array if the validation is successful.
 */
function validateTournamentLocation(location) {
  const errors = [];

  // Verifies if the user has selected a tournament
  if (!location) {
    errors.push("Vous devez choisir un tournoi.");
  }

  return errors;
}

/**
 * Retrieves the use conditions input value.
 *
 * @returns {string} - A string containing the input value
 */
function getUseConditions() {
  const inputUseConditions = document.getElementById("useConditions");
  return inputUseConditions && inputUseConditions.checked
    ? inputUseConditions.value
    : "";
}

/**
 * Validates the use conditions input or handle errors.
 *
 * @param {string} useConditions - The value of the use conditions input.
 * @returns {Array} - An array containing error messages if validation fails, or an empty array if the validation is successful.
 */
function validateUseConditions(useConditions) {
  const errors = [];

  // Checks if the user has checked the use conditions input
  if (useConditions === "") {
    errors.push("Vous devez accepter les conditions d'utilisations.");
  }

  return errors;
}

/**
 * Retrieves the value of the newsletter checkbox
 *
 * @returns {string} - A string containing the input value
 */
function getNewsletter() {
  const inputNewsletter = document.getElementById("newsletter");
  return inputNewsletter && inputNewsletter.checked
    ? inputNewsletter.value
    : "";
}

/**
 * Validates all form inputs and handles errors and form submission.
 *
 * @returns {boolean} isValid - True if the form inputs are valid, false otherwise.
 */
function validate() {
  /** Object array containing input values associated with their respective keys,
   *  allowing the retrieval of the error list for each input. */
  const inputsForm = {
    first: getFormValueById("first") || "",
    last: getFormValueById("last") || "",
    email: getFormValueById("email") || "",
    birthdate: getFormValueById("birthdate") || "",
    quantity: getFormValueById("quantity") || "",
    location: getTournamentLocation(),
    useConditions: getUseConditions(),
    newsletter: getNewsletter(),
  };

  /*
   * Object containing input values and their related errors generated by their respective validation functions.
   */
  const errors = {
    first: validateFirstName(inputsForm.first),
    last: validateLastName(inputsForm.last),
    email: validateEmail(inputsForm.email),
    birthdate: validateBirthdate(inputsForm.birthdate),
    quantity: validateTournamentQuantity(inputsForm.quantity),
    location: validateTournamentLocation(inputsForm.location),
    useConditions: validateUseConditions(inputsForm.useConditions),
  };

  /**
   * Displays the form's data, hides all errors and returns true to validate the form in the absence of errors,
   * OR calls displayError() to handle errors if they exist and returns false.
   */
  if (!hasError(errors)) {
    console.log("Entrées du formulaire :", inputsForm);
    // Reset errors on successful submission.
    clearAllErrors();
    return true;
  } else {
    // Displays errors on fail submission.
    displayError(errors);
    return false;
  }
}

/**
 * Iterates through the error object array and, returns a boolean if errors are present or not.
 *
 * @param {object} errors - Object containing input values and their related errors
 *                          generated by their respective validation functions.
 * @returns {boolean} - True if errors are present, false otherwise.
 */
function hasError(errors) {
  for (const error of Object.values(errors)) {
    if (error.length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Iterates through the error object array and, if errors are present,
 * assigns data-error attributes to their corresponding form field,
 * and applies CSS styles based on these attributes.
 *
 * @param {object} errors - Object containing input values and their related errors
 *                          generated by their respective validation functions.
 */
function displayError(errors) {
  for (const [key, error] of Object.entries(errors)) {
    if (error.length) {
      const formData = document.getElementById(key).parentElement;
      if (formData) {
        formData.setAttribute("data-error-visible", "true");
        formData.setAttribute("data-error", error.join(" "));
      }
    }
  }
}

/**
 * Clears all errors on inputs elements by modifying the attributes on their parent elements with the "formData" class.
 */
function clearAllErrors() {
  const formDataList = document.querySelectorAll(".formData");
  for (const formData of formDataList) {
    formData.setAttribute("data-error-visible", "false");
    formData.removeAttribute("data-error");
  }
}

/**
 * Clears the corrected input errors by modifying the attributes of the input's parent element with the class "formData"
 *
 * @param {HTMLElement} inputElement -
 */
function clearError(inputElement) {
  if (inputElement) {
    // Find the closest parent element with the class "formData"
    const formData = inputElement.closest(".formData");
    if (formData) {
      formData.setAttribute("data-error-visible", "false");
      formData.removeAttribute("data-error");
    }
  }
}

/**
 * Iterates through the input list and attaches event listeners to clear errors based on the input type.
 * Radio and checkbox inputs use a change listener, while other inputs use a blur listener.
 */
const inputList = document.querySelectorAll("input");
inputList.forEach((inputElement) => {
  if (inputElement.type !== "radio" && inputElement.type !== "checkbox") {
    // Attach a blur listener to clear errors when the input loses focus
    inputElement.addEventListener("input", () => {
      clearError(inputElement);
    });
  } else if (
    inputElement.type === "checkbox" ||
    inputElement.type === "radio"
  ) {
    // Attaches a change listener to clear errors for radio and checkbox inputs
    inputElement.addEventListener("change", () => {
      clearError(inputElement);
    });
  }
});
