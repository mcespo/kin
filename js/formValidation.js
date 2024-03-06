import { sanitizeInputValue, errorMessageDisplay } from "./inputManipulation.js";

/**
* Verify that an input value is not empty or undefined.
* @param {string} value - string value we will verify.
* @return {boolean} return true/false if valid input value.
*/
const isValidInputValue = value => value === '' || value === undefined ? false : true;


/**
* Ensure the minimum length of given string meets the requirements.
* @param {string} value - string value we wish to verify.
* @param {number} lengthVal - numeric value of minimum string length.
* @return {boolean} return true/false if requirment is met.
*/
const isValidMinLength = (value, lengthVal) => value.length >= lengthVal ? true : false;


/**
* Ensure the minimum and maximum length of given string meet the requirements.
* @param {string} input - string value we wish to verify.
* @param {number} lengthVal - numeric value of maximum string length.
* @return {boolean} return true/false if requirment is met.
*/
const isValidMaxLength = (value, lengthVal) => value.length <= lengthVal ? true : false;


/**
* Ensure the minimum and maximum length of given string meet the requirements.
* @param {string} value - input value we wish to verify.
* @param {number} minLength - numeric value of minimum string length.
* @param {number} maxLength - numeric value of maximum string length.
* @return {boolean} return true/false if requirment is met.
*/
const isValidMinMaxLenth = (value, minLength, maxLength) => isValidMinLength(value, minLength) && isValidMaxLength(value, maxLength) ? true : false;


/**
* Ensure the first and last character from a string match.
* @param {string} value - either input value we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const isFirstAndLastCharMatching = value => value.charAt(0) === value.at(-1) ? true : false;


/**
* A Luhn calculation verification tool used to ensure a sequence is divisible by 10.
* This is a baseline tool to verify the validity of a credit card.
* @param {object || string} input - either the HTML input element OR the input value itself we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const isLuhnValid = value => {
    const reversedNumericString = value.split('').reverse().join('');
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
    if(total % 10 !== 0) {
        return false;
    }
    return true;
}


/**
* Ensure input value is a valid date entry.
* @param {string} value - input value we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const isValidDateEntry = value => !isNaN(new Date(value));


/**
* Ensure input value of date entered is not greater than a set year value
* Example: credit card expiration dates tend to not go over 5-6 years from its issue date.
* @param {string} value - input value we wish to verify.
* @param {number} setMaxYears - the number of years from the issue date to verify againt.
* @return {boolean} return true/false if requirment is met.
*/
const isExpiryYearLessThanMaxYear = (value, setMaxYears) => {
    const inputYear = value.getFullYear();
    const futureYear = new Date().getFullYear() + setMaxYears;

    if(inputYear > futureYear) {
        return false;
    }
    return true;
}


/**
* A very rudimentary expiration month and year card expiration validator.
* This just ensures month is not above 12, and that year is not before current day.
* @param {string} value - either the HTML input element OR the input value itself we wish to verify.
* @param {number} year - a numeric value to ensure that we don't go above X years in future expiration. 4 = how many years in the future are valid.
* @return {boolean} return true/false if requirment is met.
*/
const isValidExpiryDate = value => {
    const today = new Date();
    const lastDayOfMonth = new Date(value.getFullYear(), value.getMonth() + 1, 0);

    if(lastDayOfMonth < today) {
        return false;
    }
    return true;
}




/**
* Process card number input. We validate the input, clean up, check length
* check the first and last digits match each other,
* and by running a Luhn calculation to ensure credit card sequence combination is divisible by 10.
* @param {object} element - HTML element we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processCreditCardInput = creditCardInput => {
    let value;

    // ensure the input value is not empty
    if(!isValidInputValue(creditCardInput.value)) {
        errorMessageDisplay(creditCardInput, `Please input proper credit card format.`)
        return false;
    }

    // clean input value and set as a date string
    value = sanitizeInputValue(creditCardInput.value);


    if(!isValidMinMaxLenth(value, 15, 16)){
        errorMessageDisplay(creditCardInput, `Entry must be 15-16 characters long.`)
        return false;
    }

    if(!isFirstAndLastCharMatching(value)) {
        errorMessageDisplay(creditCardInput, `First and last character "${value.charAt(0)}" & "${value.at(-1)}" must match.`)
        return false;
    }

    if(!isLuhnValid(value)) {
        errorMessageDisplay(creditCardInput, `Invalid credit card. Please confirm number.`)
        return false;
    }

    return true;
}


/**
* Process card expiration by ensuring min-max requirements are honored,
* and the date is not expired or improperly entered.
* @param {object} element - HTML input we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processCardExpirationInput = expirationNumberInput => {
    let value;
    let dateValueString;
    let expiryDateValue;


    // ensure the input value is not empty
    if(!isValidInputValue(expirationNumberInput.value)) {
        errorMessageDisplay(expirationNumberInput, `Please input proper credit card format.`)
        return false;
    }

    // clean input value and set as a date string
    value = sanitizeInputValue(expirationNumberInput.value);

    // ensure the value is meeting min max length requirements
    if(!isValidMinMaxLenth(value, 4, 4)) {
        errorMessageDisplay(expirationNumberInput, `Entry must be 4 characters long.`)
        return false;
    }

    // plug in the input as a date string
    dateValueString = `20${value.slice(-2)}/${value.slice(0, 2)}/01`;

    // ensure date string is valid date
    if(!isValidDateEntry(dateValueString)) {
        errorMessageDisplay(expirationNumberInput, `${value.slice(0, 2)}/${value.slice(-2)} is an invalid date.`);
        return false;
    }

    // set input date string as proper date
    expiryDateValue = new Date(dateValueString);

    // ensure date value is valid expiry
    if(!isValidExpiryDate(expiryDateValue)) {
        errorMessageDisplay(expirationNumberInput, `${value.slice(0, 2)}/${value.slice(-2)} is an expired date.`);
        return false;
    }

    // ensure date value is less than 6 years in future
    if(!isExpiryYearLessThanMaxYear(expiryDateValue, 6)) {
        errorMessageDisplay(expirationNumberInput, `Expiry date set too far in future.`);
        return false;
    }

    return true;
}


/**
* Process CVV by ensuring min-max requirements are honored.
* @param {object} element - we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processCardVerificationInput = verificationInput => {
    let value;

    // ensure the input value is not empty
    if(!isValidInputValue(verificationInput.value)) {
        errorMessageDisplay(verificationInput, `Please input proper credit card format.`)
        return false;
    }

    // clean input value and set as a date string
    value = sanitizeInputValue(verificationInput.value);


    if(!isValidMinMaxLenth(value, 3, 4)){
        errorMessageDisplay(verificationInput, `Entry must be 3-4 characters long.`)
        return false;
    }

    return true;
}


/**
* Process Zipcode by ensuring min-max requirements are honored.
* @param {object} element - we wish to verify.
* @return {boolean} return true/false if requirment is met.
*/
const processZipCodeInput = zipCodeInput => {
    let value;

    // ensure the input value is not empty
    if(!isValidInputValue(zipCodeInput.value)) {
        errorMessageDisplay(zipCodeInput, `Please input proper credit card format.`)
        return false;
    }

    // clean input value and set as a date string
    value = sanitizeInputValue(zipCodeInput.value);


    if(!isValidMinMaxLenth(value, 5, 9)){
        errorMessageDisplay(zipCodeInput, `Entry must be 5-9 characters long.`)
        return false;
    }

    return true;
}


export { isValidInputValue, isValidMinLength, isValidMaxLength, isValidMinMaxLenth, isFirstAndLastCharMatching, isLuhnValid, isValidDateEntry, isExpiryYearLessThanMaxYear, isValidExpiryDate, processCreditCardInput, processCardExpirationInput, processCardVerificationInput, processZipCodeInput };
