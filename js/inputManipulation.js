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

        removeElementAttribute(element, 'aria-errormessage');
        removeElementAttribute(element, 'aria-invalid');
        siblingElement.style.display = 'none';
        siblingElement.innerText = '';
    }
    return;
}

const errorMessageDisplay = (element, errorMessage) => {
    if(element.nextElementSibling !== undefined) {
        const siblingElement = (element.nextElementSibling.className === 'error') ? element.nextElementSibling : null;

        if(siblingElement !== null) {
            if(siblingElement.style.display === 'block') return;


            insertElementAttribute(element, 'aria-errormessage', `error_${element.getAttribute('id')}`);
            insertElementAttribute(element, 'aria-invalid', 'true');
            siblingElement.innerText = errorMessage;
            siblingElement.style.display = 'block';
        }
    }
    return;
}

/**
* Add data attribute to HTML element.
* @param {object} element we wish to modify.
* @param {string} attribute we wish to add.
*/
const insertElementAttribute = (element, attribute, attributeValue) => {
    return element.setAttribute(attribute, attributeValue);
}

/**
* Remove data attribute from HTML element.
* @param {object} element we wish to modify.
* @param {string} attribute we are removing
* @return {undefined} removed attribute
*/
const removeElementAttribute = (element, attribute) => {
    return element.removeAttribute(attribute);
}

export { sanitizeInputValue, concatenateVariablesWithSymbol, splitInputValuesBySymbol, inputModeValidation, errorMessageDisplay, errorMessageClear };
