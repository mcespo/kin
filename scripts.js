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
const creditCardNumberInput = creditCardForm.querySelector('#credit_card_number');
const firstNameInput = creditCardForm.querySelector('#first_name');
const lastNameInput = creditCardForm.querySelector('#last_name');
const expirationDateInput = creditCardForm.querySelector('#expiration_date');
const verificationCodeInput = creditCardForm.querySelector('#verification_code');
const zipCodeInput = creditCardForm.querySelector('#zip_code');
let sanitizedCreditCardNumber;
let mergedName;
let isValidCard = false;


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

const validateMinLength = (string, lengthVal) => string.length >= lengthVal;
const validateMaxLength = (string, lengthVal) => string.length <= lengthVal;

const sanitizeString = string => string.replace(/[^\w]/g, '');
const isFirstAndLastCharMatching = string => string.charAt(0) === string.at(-1);



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

const isExpiryValid = string => {
    const today = new Date();
    const possibleDate = sanitizeString(string);
    const month = possibleDate.slice(0, 2);
    const year = possibleDate.slice(-2);

    if(Number(month) <= 12 && Number(year < 40)) {
        const expiryDate = new Date(`20${year}-${month}-01`);

        if (expiryDate < today) {
            console.log('fail')
        } else {
            console.log('pass')
        }
    } else {
        console.log('nope');
    }

}



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


const isLuhnValid = numericString => {
    const reversedNumericString = numericString.split('').reverse().join('');
    const splitStringValuesAsArray = Array.from(reversedNumericString).map(Number);
    let total = 0;


    for(let i = 0; i < splitStringValuesAsArray.length; i++) {
        if(i % 2 !== 0) {
            let doubledValue = splitStringValuesAsArray[i] * 2;
            if(doubledValue > 9) {
                total += doubledValue - 9;
            } else {
                total += doubledValue;
            }
        } else {
            total += splitStringValuesAsArray[i];
        }
    }
    console.log(`after calculation, card is = ${total}`)
    if(total % 10 === 0) {
        return true;
    }
    return false;
}


// we want a clean numeric credit card to validate and submit
expirationDateInput.addEventListener('blur', () => {
    isExpiryValid(expirationDateInput.value);
});

creditCardNumberInput.addEventListener('blur', () => {
    const creditCardNumber = sanitizeString(creditCardNumberInput.value);

    if(validateMinLength(creditCardNumber, 15) || validateMinLength(creditCardNumber, 16)){
        if(isLuhnValid(creditCardNumber)) {
            console.log(`YOU SHALL PASSSSS!`)
            return isValidCard = true;
        }


        // if(isFirstAndLastCharMatching(creditCardNumber) && isLuhnValid(creditCardNumber)) {
        //     console.log(`YOU SHALL PASSSSS!`)
        //     return isValidCard = true;
        // }

    }
});

creditCardForm.addEventListener('submit', event => {
    // not looking to be redirected
    event.preventDefault();

    const formData = new FormData(creditCardForm);
    const data = Object.fromEntries(formData);

    // console.log(formData.get('creditcardnumber'))

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
