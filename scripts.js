import { splitInputValuesBySymbol, concatenateVariablesWithSymbol, inputModeValidation, errorMessageClear } from "./js/inputManipulation.js";
import { processCreditCardInput, processCardExpirationInput, processCardVerificationInput, processZipCodeInput } from "./js/formValidation.js";


// --------------
// Variables
// --------------
const creditCardContainer = document.querySelector('#credit_card_container');

// credit card banner variables
const creditCardBanner = creditCardContainer.querySelector('#credit_card_banner');
const cardDisplay = creditCardBanner.querySelector('#card_number_display');
const nameDisplay = creditCardBanner.querySelector('#name_display');
const expirationDisplay = creditCardBanner.querySelector('#expiration_display');
const verificationDisplay = creditCardBanner.querySelector('#verification_display');

// form variables
const creditCardForm = creditCardContainer.querySelector('#credit_card_form');
const numericInputs = creditCardForm.querySelectorAll('[inputmode="numeric"]');
const creditCardNumberInput = creditCardForm.querySelector('#credit_card_number');
const firstNameInput = creditCardForm.querySelector('#first_name');
const lastNameInput = creditCardForm.querySelector('#last_name');
const expirationDateInput = creditCardForm.querySelector('#expiration_date');
const verificationCodeInput = creditCardForm.querySelector('#verification_code');
const zipCodeInput = creditCardForm.querySelector('#zip_code');
const submitButton = creditCardForm.querySelector('#submit');

// loose conditions
let mergedName;
let isValidCardNumber = false;
let isValidExpiration = false;
let isValidVerification = false;
let isValidFirstName = false;
let isValidLastName = false;
let isValidZip = false;


// validator to enable form submit when all conditions met
const submitValidator = () => {
    if(isValidCardNumber && isValidExpiration && isValidVerification && isValidFirstName && isValidLastName && isValidZip) {
        if(!submitButton.hasAttribute('disabled')) {
            return;
        }
        return submitButton.removeAttribute('disabled');
    }
    if(submitButton.hasAttribute('disabled')) {
        return;
    }
    return submitButton.setAttribute('disabled', '');
}


// --------------
// Events
// --------------

// force all inputs to respect numeric patterns
numericInputs.forEach(input => inputModeValidation(input));


// credit card events
creditCardNumberInput.addEventListener('focus', () => {
    errorMessageClear(creditCardNumberInput);
});
creditCardNumberInput.addEventListener('keyup', () => {
    cardDisplay.innerText = (creditCardNumberInput.value.length === 0) ? 'XXXX XXXX XXXX XXXX' : creditCardNumberInput.value;
});
creditCardNumberInput.addEventListener('blur', () => {
    if(creditCardNumberInput === undefined || creditCardNumberInput.value.length < 1) {
        return;
    }
    isValidCardNumber = processCreditCardInput(creditCardNumberInput);

    creditCardNumberInput.value = splitInputValuesBySymbol(creditCardNumberInput.value, 4, ' ');
    cardDisplay.innerText = (creditCardNumberInput.value.length === 0) ? 'XXXX XXXX XXXX XXXX' : creditCardNumberInput.value;
    submitValidator();
});


// expiry events
expirationDateInput.addEventListener('focus', () => {
    errorMessageClear(expirationDateInput);
});
expirationDateInput.addEventListener('keyup', () => {
    expirationDisplay.innerText = (expirationDateInput.value.length === 0) ? 'XX/XX' : expirationDateInput.value;
});
expirationDateInput.addEventListener('blur', () => {
    if(expirationDateInput === undefined || expirationDateInput.value.length < 1) {
        return;
    }
    isValidExpiration = processCardExpirationInput(expirationDateInput);

    expirationDateInput.value = splitInputValuesBySymbol(expirationDateInput.value, 2, '/');
    expirationDisplay.innerText = (expirationDateInput.value.length === 0) ? 'XX/XX' : expirationDateInput.value;
    submitValidator();
});


// CVV events
verificationCodeInput.addEventListener('focus', () => {
    errorMessageClear(verificationCodeInput);
});
verificationCodeInput.addEventListener('keyup', () => {
    verificationDisplay.innerText = verificationCodeInput.value;
});
verificationCodeInput.addEventListener('blur', () => {
    if(verificationCodeInput === undefined || verificationCodeInput.value.length < 1) {
        return;
    }
    isValidVerification = processCardVerificationInput(verificationCodeInput);
    submitValidator();
});


// first and last name events
firstNameInput.addEventListener('keyup', () => {
    mergedName = concatenateVariablesWithSymbol(firstNameInput.value, lastNameInput.value, " ");
    nameDisplay.innerText = nameDisplay.innerText.length === 0 ? 'Your Name' : mergedName;
});
firstNameInput.addEventListener('blur', () => {
    if(firstNameInput === undefined || firstNameInput.value.length < 1) {
        return;
    }
    isValidFirstName = true;
    submitValidator()
});

lastNameInput.addEventListener('keyup', () => {
    mergedName = concatenateVariablesWithSymbol(firstNameInput.value, lastNameInput.value, " ");
    nameDisplay.innerText = nameDisplay.innerText.length === 0 ? '' : mergedName;
});
lastNameInput.addEventListener('blur', () => {
    if(lastNameInput === undefined || lastNameInput.value.length < 1) {
        return;
    }
    isValidLastName = true;
    submitValidator();
});


// zipcode events
zipCodeInput.addEventListener('focus', () => {
    errorMessageClear(zipCodeInput);
});
zipCodeInput.addEventListener('blur', () => {
    if(zipCodeInput === undefined || zipCodeInput.value.length < 1) {
        return;
    }
    isValidZip = processZipCodeInput(zipCodeInput);

    zipCodeInput.value = splitInputValuesBySymbol(zipCodeInput.value, 5, '-');
    submitValidator();
});


// submit form
creditCardForm.addEventListener('submit', event => {
    // not looking to be redirected
    event.preventDefault();

    const formData = new FormData(creditCardForm);
    const data = Object.fromEntries(formData);


    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch(error => console.log(error));
});
