import { sanitizeInputValue, errorMessageDisplay } from "./inputManipulation.js";

/**
* Ensure the minimum and maximum length of given string meet the requirements.
* @param {string} input - string value we wish to verify.
* @param {number} lengthVal - numeric value of minimum string length.
* @return {boolean} return true/false if requirment is met.
*/
const isInputMinLengthValid = (input, lengthVal) => {
    if(input.length >= lengthVal) {
        return true;
    }

    errorMessageDisplay(input, `Must be at least ${lengthVal} characters long.`);
    return false;
};

/**
* Ensure the minimum and maximum length of given string meet the requirements.
* @param {string} input - string value we wish to verify.
* @param {number} lengthVal - numeric value of maximum string length.
* @return {boolean} return true/false if requirment is met.
*/
const isInputMaxLengthValid = (input, lengthVal) => {
    if(input.length <= lengthVal) {
        return true;
    }

    errorMessageDisplay(input, `Must not be greater than ${lengthVal} characters long.`);
    return false;
};


/**
* Ensure the minimum and maximum length of given string meet the requirements.
* @param {object || string} input - either the HTML input element OR the input value itself we wish to verify.
* @param {number} minLength - numeric value of minimum string length.
* @param {number} maxLength - numeric value of maximum string length.
* @return {boolean} return true/false if requirment is met.
*/
const isInputMinMaxLengthValid = (input, minLength, maxLength) => {
    const inputValue = (input.value !== undefined) ? sanitizeInputValue(input.value) : sanitizeInputValue(input);

    if (isInputMinLengthValid(inputValue, minLength) && isInputMaxLengthValid(inputValue, maxLength)) {
        return true;
    }

    if(minLength === maxLength) {
        errorMessageDisplay(input, `Entry must be ${maxLength} characters long.`);
        return false;
    }

    errorMessageDisplay(input, `Entry must be ${minLength}-${maxLength} characters long.`);
    return false;
}

/**
* Ensure the first and last character from a string match.
* @param {object || string} input - either the HTML input element OR the input value itself we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const isInputFirstAndLastCharMatching = input => {
    const inputValue = (input.value !== undefined) ? sanitizeInputValue(input.value) : sanitizeInputValue(input);

    if(inputValue.charAt(0) === inputValue.at(-1)) return true;

    errorMessageDisplay(input, `First and last character "${inputValue.charAt(0)}" & "${inputValue.at(-1)}" must match.`);
    return false;
}

/**
* A very rudimentary expiration month and year card expiration validator.
* This just ensures month is not above 12, and that year is not before current day.
* @param {object || string} input - either the HTML input element OR the input value itself we wish to verify.
* @param {number} year - a numeric value to ensure that we don't go above X years in future expiration. 4 = how many years in the future are valid.
* @return {boolean} return true/false if requirment is met.
*/
const isInputExpiryValid = (input, year) => {
    const inputValue = (input.value !== undefined) ? sanitizeInputValue(input.value) : sanitizeInputValue(input);

    const today = new Date();
    const inputMonth = inputValue.slice(0, 2);
    const numericMonth = Number(inputMonth);
    const inputYear = inputValue.slice(-2);
    const numericYear = Number(inputYear);

    if(numericMonth <= 12 && numericYear > 0) {
        const addOneMonth = (numericMonth !== 12) ? numericMonth + 1 : 12;
        // TODO: this whole year concatenation tomfoolery is flimsy at best. Consider a refactor later down the line.
        const inputExpiryDate = new Date(`20${inputYear}-${addOneMonth.toString()}-01`);

        // TODO: this may not work completely as expected.
        if (numericYear <= numericYear+year && inputExpiryDate > today) {
            return true;
        }
        errorMessageDisplay(input, `Please input valid expiry year.`)

        return false;
    }

    errorMessageDisplay(input, `Please input two digit month and year MM/YY.`)

    return false;
}

/**
* A Luhn calculation verification tool used to ensure a sequence is divisible by 10.
* This is a baseline tool to verify the validity of a credit card.
* @param {object || string} input - either the HTML input element OR the input value itself we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const isInputLuhnValid = input => {
    const inputValue = (input.value !== undefined) ? sanitizeInputValue(input.value) : sanitizeInputValue(input);
    const reversedNumericString = inputValue.split('').reverse().join('');
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
    if(total % 10 === 0) {
        return true;
    }
    errorMessageDisplay(input, `This is not a valid credit card. Please confirm number.`)
    return false;
}

/**
* Process card number by ensuring min-max requirements are honored,
* ensuring the first and last digits match each other,
* and by running a Luhn calculation to ensure credit card sequence combination is divisible by 10.
* @param {object} element - HTML element we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processCreditCardInput = creditCardInput => {
    if(isInputMinMaxLengthValid(creditCardInput, 15, 16)){
        if(isInputFirstAndLastCharMatching(creditCardInput) && isInputLuhnValid(creditCardInput)) {
            return true;
        }
    }
    return false;
}

/**
* Process card expiration by ensuring min-max requirements are honored,
* and the date is not expired or improperly entered.
* @param {object} element - HTML input we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processCardExpirationInput = expirationNumberInput => {
    if(isInputMinMaxLengthValid(expirationNumberInput, 4, 4)) {
        if(isInputExpiryValid(expirationNumberInput, 5)) {
            return true;
        }
    }
    return false;
}

/**
* Process CVV by ensuring min-max requirements are honored.
* @param {object} element - we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processCardVerificationInput = verificationInput => {
    if(isInputMinMaxLengthValid(verificationInput, 3, 4)) {
        return true;
    }
    return false;
}

/**
* Process Zipcode by ensuring min-max requirements are honored.
* @param {object} element - we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processZipCodeInput = zipCodeInput => {
    if(isInputMinMaxLengthValid(zipCodeInput, 5, 9)) {
        return true;
    }
    return false;
}



export { isInputMinLengthValid, isInputMaxLengthValid, isInputMinMaxLengthValid, isInputFirstAndLastCharMatching, isInputExpiryValid, isInputLuhnValid, processCreditCardInput, processCardExpirationInput, processCardVerificationInput, processZipCodeInput };
