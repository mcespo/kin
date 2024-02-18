// --------------
// Variables
// --------------
const creditCardContainer = document.querySelector('#credit_card_container');
const creditCardBanner = creditCardContainer.querySelector('#credit_card_banner');
const cardDisplay = creditCardBanner.querySelector('#card_number_display');
const nameDisplay = creditCardBanner.querySelector('#name_display');
const expirationDisplay = creditCardBanner.querySelector('#expiration_display');
const verificationDisplay = creditCardBanner.querySelector('#verification_display');
const creditCardForm = creditCardContainer.querySelector('#credit_card_form');
const creditCardNumberInput = creditCardForm.querySelector('input[name="credit_card_number"]');
const firstNameInput = creditCardForm.querySelector('input[name="first_name"]');
const lastNameInput = creditCardForm.querySelector('input[name="last_name"]');
const expirationDateInput = creditCardForm.querySelector('input[name="expiration_date"]');
const verificationCodeInput = creditCardForm.querySelector('input[name="verification_code"]');
const zipCodeInput = creditCardForm.querySelector('input[name="zip_code"]');
let sanitizedCreditCardNumber;
let mergedName;


const numericInputs = creditCardForm.querySelectorAll("[inputmode='numeric']");
numericInputs.forEach(input => validateInput(input))


function validateInput(el) {
  el.addEventListener("beforeinput", function (e) {
    let beforeValue = el.value;
    e.target.addEventListener(
      "input",
      function () {
        if (el.validity.patternMismatch) {
          el.value = beforeValue;
        }
      },
      { once: true }
    );
  });
}

const sanitizeString = string => string.replace(/\s/g, '');
const firstAndLastCharValidator = string => string.charAt(0) === string.at(-1);



// --------------
// Generic functions
// --------------
const concatenateVariablesWithSymbol = (a, b, symbol) => {
    return a.concat(symbol, b);
}



const splitInputsBySymbol = (input, groupValue, symbol) => input.split("").reduce((value, next, index) => {
    if (index !== 0 && !(index % groupValue)) value += symbol;
    return value + next;
}, "");



// --------------
// Events
// --------------

// restrict characters on credit card and ... TODO: (exp, cvv, zip)



// set gaps on credit card number input. TODO: Consider an if condition  should I need to change patterns for 15 digit pattern IE: 4_6_5 vs 4_4_4_4
creditCardNumberInput.addEventListener('keyup', () => {
    creditCardNumberInput.value = splitInputsBySymbol(creditCardNumberInput.value.replaceAll(' ', ''), 4 , ' ');
    cardDisplay.innerText = cardDisplay.innerText.length === 0 ? 'XXXX XXXX XXXX XXXX' : creditCardNumberInput.value;
});

firstNameInput.addEventListener('keyup', () => {
    mergedName = concatenateVariablesWithSymbol(firstNameInput.value, lastNameInput.value, " ");
    nameDisplay.innerText = nameDisplay.innerText.length === 0 ? 'XXXX XXXX XXXX XXXX' : mergedName;
});

lastNameInput.addEventListener('keyup', () => {
    mergedName = concatenateVariablesWithSymbol(firstNameInput.value, lastNameInput.value, " ");
    nameDisplay.innerText = nameDisplay.innerText.length === 0 ? 'XXXX XXXX XXXX XXXX' : mergedName;
});

zipCodeInput.addEventListener('keyup', () => {
    zipCodeInput.value = splitInputsBySymbol(zipCodeInput.value.replaceAll('-', ''), 5, '-');
});

expirationDateInput.addEventListener('keyup', () => {
    expirationDateInput.value = splitInputsBySymbol(expirationDateInput.value.replaceAll('/', ''), 2, '/');
    expirationDisplay.innerText = expirationDateInput.value;
});

verificationCodeInput.addEventListener('keyup', () => {
    verificationDisplay.innerText = verificationCodeInput.value;
});


// we want a clean numeric credit card to validate and submit
creditCardNumberInput.addEventListener('blur', () => {
    const creditCardNumber = sanitizeString(creditCardNumberInput.value);

    console.log(creditCardNumber)
    console.log(firstAndLastCharValidator(creditCardNumber))

    // sanitizedCreditCardNumber = Number(creditCardNumberInput.value.replaceAll(' ', ''));
});
