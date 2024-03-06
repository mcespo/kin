import { isValidInputValue, isValidMinLength, isValidMaxLength, isValidMinMaxLenth, isFirstAndLastCharMatching, isLuhnValid, isValidDateEntry, isExpiryYearLessThanMaxYear, isValidExpiryDate } from "./formValidation"

test('it should validate if input value is empty, undefined, or valid', () => {
    expect(isValidInputValue('')).toBe(false);
    expect(isValidInputValue()).toBe(false);
    expect(isValidInputValue('hi')).toBe(true);
})

test('it should validate length that is less than input value', () => {
    expect(isValidMinLength('hi', 6)).toBe(false);
    expect(isValidMinLength('salutations!', 6)).toBe(true);
})

test('it should validate string length that is greater than input value', () => {
    expect(isValidMaxLength('bye', 6)).toBe(true);
    expect(isValidMaxLength('farewell!', 6)).toBe(false);
})

test('it should validate string length that meets min max length requirements', () => {
    expect(isValidMinMaxLenth('maybe', 2, 5)).toBe(true);
    expect(isValidMinMaxLenth('baby', 7, 8)).toBe(false);
})

test('it should validate if first and last string characters match', () => {
    expect(isFirstAndLastCharMatching('2B_9S_A2')).toBe(true);
    expect(isFirstAndLastCharMatching('Pascal')).toBe(false);
    expect(isFirstAndLastCharMatching('eve')).toBe(true);
    expect(isFirstAndLastCharMatching('Eve')).toBe(false);
})

test('it should ensure numeric sequence will confirm Luhn Validation', () => {
    expect(isLuhnValid('4821630149417944')).toBe(true);
    expect(isLuhnValid('6969071170997909')).toBe(true);
    expect(isLuhnValid('4821630149417948')).toBe(false);
})

test('it should ensure input value is a valid date entry', () => {
    expect(isValidDateEntry(1709706883774)).toBe(true);
    expect(isValidDateEntry('Wed Mar 06 2024 00:34:43 GMT-0600 (Central Standard Time)')).toBe(true);
    expect(isValidDateEntry('Wed Mar 02 2024')).toBe(true);
    expect(isValidDateEntry('Wed Yus 02 2024')).toBe(false);
})

test('it should ensure input value is a valid date entry', () => {
    expect(isExpiryYearLessThanMaxYear(new Date('Wed Mar 02 2200'), 6)).toBe(false);
    expect(isExpiryYearLessThanMaxYear(new Date(), 6)).toBe(true);
})

test('it should ensure input value is a valid date entry', () => {
    expect(isValidExpiryDate(new Date('Wed Mar 02 2200'))).toBe(true);
    expect(isValidExpiryDate(new Date('Wed Mar 02 1999'))).toBe(false);
})
