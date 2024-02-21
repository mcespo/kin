import { sanitizeInputValue, errorMessageDisplay } from "./inputManipulation.js";

const isInputMinLengthValid = (input, lengthVal) => input.length >= lengthVal;

const isInputMaxLengthValid = (input, lengthVal) => input.length <= lengthVal;

const isInputMinMaxLengthValid = (input, minLength, maxLength) => {
    const inputValue = sanitizeInputValue(input.value);

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

const isInputFirstAndLastCharMatching = input => {
    if(input.value.charAt(0) === input.value.at(-1)) return true;

    errorMessageDisplay(input, `First and last character "${input.value.charAt(0)}" & "${input.value.at(-1)}" must match.`);
    return false;
}

const isInputExpiryValid = (input, year) => {
    const inputValue = sanitizeInputValue(input.value);
    const today = new Date();
    const inputMonth = inputValue.slice(0, 2);
    const numericMonth = Number(inputMonth);
    const inputYear = inputValue.slice(-2);
    const numericYear = Number(inputYear);

    if(numericMonth <= 12 && numericYear > 0) {
        const addOneMonth = (numericMonth !== 12) ? numericMonth + 1 : 12;
        const inputExpiryDate = new Date(`20${inputYear}-${addOneMonth.toString()}-01`);

        if (numericYear <= numericYear+year && inputExpiryDate > today) {
            return true;
        }
        errorMessageDisplay(input, `Please input valid expiry year.`)

        return false;
    }

    errorMessageDisplay(input, `Please input two digit month and year MM/YY.`)

    return false;
}



const isInputLuhnValid = input => {
    const numericString = sanitizeInputValue(input.value);
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
    if(total % 10 === 0) {
        return true;
    }
    errorMessageDisplay(input, `This is not a valid credit card. Please confirm number.`)
    return false;
}

const processCreditCardInput = creditCardInput => {
    if(isInputMinMaxLengthValid(creditCardInput, 15, 16)){
        if(isInputFirstAndLastCharMatching(creditCardInput) && isInputLuhnValid(creditCardInput)) {
            return true;
        }
    }
    return false;
}

const processCardExpirationInput = expirationNumberInput => {
    if(isInputMinMaxLengthValid(expirationNumberInput, 4, 4)) {
        if(isInputExpiryValid(expirationNumberInput, 5)) {
            return true;
        }
    }
    return false;
}

const processCardVerificationInput = verificationInput => {
    if(isInputMinMaxLengthValid(verificationInput, 3, 4)) {
        return true;
    };
    return false
}

const processZipCodeInput = zipCodeInput => {
    if(isInputMinMaxLengthValid(zipCodeInput, 5, 9)) {
        return true;
    }
    return false;
}



export { isInputMinLengthValid, isInputMaxLengthValid, isInputMinMaxLengthValid, isInputFirstAndLastCharMatching, isInputExpiryValid, isInputLuhnValid, processCreditCardInput, processCardExpirationInput, processCardVerificationInput, processZipCodeInput };
