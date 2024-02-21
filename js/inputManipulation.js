const sanitizeInputValue = inputValue => {
    if(inputValue === '' || inputValue === undefined) return;
    return inputValue.replace(/([^\w]+|\s+)/g, '');
}

// Used to merge variables with a charcter such as an empty space. IE: "FistName LastName"
const concatenateVariablesWithSymbol = (a, b, symbol) => {
    return a.concat(symbol, b);
}

const splitInputValuesBySymbol = (value, groupValue, symbol) => {
    const cleanValues = sanitizeInputValue(value);
    let styledValues = '';

    for(let i = 0; i < cleanValues.length; i++) {
        if((i % groupValue === 0 && i !== 0)) {
            styledValues += symbol + cleanValues[i];
        } else {
            styledValues += cleanValues[i];
        }
    }
    return styledValues;
}

const inputModeValidation = element => {
    element.addEventListener('beforeinput', event => {
        let beforeValue = element.value;
        event.target.addEventListener('input', () => {
            if (element.validity.patternMismatch) {
                element.value = beforeValue;
            }
        },
        { once: true });
    });
}

const errorMessageClear = element => {
    const siblingElement = (element.nextElementSibling.className === 'error') ? element.nextElementSibling : null;

    if(siblingElement !== null) {
        if(siblingElement.style.display === 'none') return;

        siblingElement.style.display = 'none';
        siblingElement.innerText = '';
    }
    return;
}

const errorMessageDisplay = (element, errorMessage) => {
    const siblingElement = (element.nextElementSibling.className === 'error') ? element.nextElementSibling : null;

    if(siblingElement !== null) {
        if(siblingElement.style.display === 'block') return;

        siblingElement.innerText = errorMessage;
        siblingElement.style.display = 'block';
    }
    return;
}

export { sanitizeInputValue, concatenateVariablesWithSymbol, splitInputValuesBySymbol, inputModeValidation, errorMessageDisplay, errorMessageClear };
