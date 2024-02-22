/**
* Remove special characters and spaces from string.
* @param {string} inputValue string input value we will modify.
* @return {string} return input value without spaces or special chars.
*/
const sanitizeInputValue = inputValue => {
    if(inputValue === '' || inputValue === undefined) return;
    return inputValue.replace(/([^\w]+|\s+)/g, '');
}

/**
* Combine two strings together by a character or space such as a first and last name such as: "John Oliver".
* @param {string} a the first variable string we will pass.
* @param {string} b the second variable string we will pass.
* @param {string} symbol the symbol character we will use to concatenate A and B
* @return {string} return the unified variable value.
*/
const concatenateVariablesWithSymbol = (a, b, symbol) => {
    return a.concat(symbol, b);
}

/**
* Modify a string by a seqence and character such as: "XXXX XXXX" or "MM/YY".
* @param {string} value string value we will modify.
* @param {number} groupValue the numeric grouping of values between chars such as: 4 = "XXXX".
* @param {string} symbol character or symbol used to separate group such as: " ", "/", "-".
* @return {string} return the modified string value.
*/
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

/**
* Force input fields to honor their HTML input mode pattern.
* @param {object} element HTML element we will modify.
* @return {undefined} return input value with correct pattern adherence before input.
*/
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

/**
* Remove error message display if the error element is active.
* @param {object} element HTML element we will modify.
* @return {undefined} return the element without error message and hide from view.
*/
const errorMessageClear = element => {
    const siblingElement = (element.nextElementSibling.className === 'error') ? element.nextElementSibling : null;

    if(siblingElement !== null) {
        if(siblingElement.style.display === 'none') return;

        removeElementAttribute(element, 'aria-invalid');
        siblingElement.style.display = 'none';
        siblingElement.innerText = '';
    }
    return;
}

/**
* Display error message on hidden sibling fields.
* @param {object} element HTML element we will observe to target its error sibling.
* @param {string} errorMessage error message we will inject on element.
* @return {undefined} return error message we will inject on the error element that is now visible.
*/
const errorMessageDisplay = (element, errorMessage) => {
    if(element.nextElementSibling !== undefined) {
        const siblingElement = (element.nextElementSibling.className === 'error') ? element.nextElementSibling : null;

        if(siblingElement !== null) {
            if(siblingElement.style.display === 'block') return;

            insertElementAttribute(element, 'aria-invalid', 'true');
            siblingElement.innerText = errorMessage;
            siblingElement.style.display = 'block';
        }
    }
    return;
}

/**
* Add data attribute to HTML element.
* @param {object} element HTML element we wish to modify.
* @param {string} attribute attribute we wish to add.
* @param {string} attributeValue value we wish to add to attribute.
* @return {undefined} return HTML element with an element attribute.
*/
const insertElementAttribute = (element, attribute, attributeValue) => {
    return element.setAttribute(attribute, attributeValue);
}

/**
* Remove data attribute from HTML element.
* @param {object} element HTML element we wish to modify.
* @param {string} attribute attribute we are removing.
* @return {undefined} return removed attribute from element.
*/
const removeElementAttribute = (element, attribute) => {
    return element.removeAttribute(attribute);
}

export { sanitizeInputValue, concatenateVariablesWithSymbol, splitInputValuesBySymbol, inputModeValidation, errorMessageDisplay, errorMessageClear };
