const creditCardContainer = document.querySelector("#credit_card_container");
const creditCardBanner = creditCardContainer.querySelector(
    "#credit_card_banner"
);
const creditCardForm = creditCardContainer.querySelector("#credit_card_form");
const creditCardNumberInput = creditCardForm.querySelector(
    'input[name="credit_card_number"]'
);
const verificationCodeInput = creditCardForm.querySelector(
    'input[name="verification_code"]'
);
let sanitizedCreditCardNumber;

// --------------
// Generic functions
// --------------
const restrictInputToNumbers = (event) => {
    if (isNaN(event.key) && event.key !== "Backspace") {
        event.preventDefault();
    }
};

const setInputValueSpacerGroups = (input, groupValue) =>
    input.split("").reduce((value, next, index) => {
        if (index !== 0 && !(index % groupValue)) value += " ";
        return value + next;
    }, "");

// --------------
// Events
// --------------

// restrict characters on credit card and ... TODO: (exp, cvv, zip)
creditCardNumberInput.onkeydown = restrictInputToNumbers;
verificationCodeInput.onkeydown = restrictInputToNumbers;

// set gaps on credit card number input. TODO: Consider an if condition  should I need to change patterns for 15 digit pattern IE: 4_6_5 vs 4_4_4_4
creditCardNumberInput.addEventListener(
    "input",
    () =>
        (creditCardNumberInput.value = setInputValueSpacerGroups(
            creditCardNumberInput.value.replaceAll(" ", ""),
            4
        ))
);

// we want a clean numeric credit card to validate and submit
creditCardNumberInput.addEventListener(
    "blur",
    () =>
        (sanitizedCreditCardNumber = Number(
            creditCardNumberInput.value.replaceAll(" ", "")
        ))
);
