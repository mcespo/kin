import { isInputMinLengthValid, isInputMaxLengthValid, isInputFirstAndLastCharMatching, isInputExpiryValid, isInputLuhnValid } from "./formValidation"



test('it should return false on string length less than input value', () => {
    expect(isInputMinLengthValid('hello', 6)).toBe(false);
})

test('it should return false on string length greater than input value', () => {
    expect(isInputMaxLengthValid('hello', 3)).toBe(false);
})

test('it should validate if first and last string match', () => {
    expect(isInputFirstAndLastCharMatching('2B_9S_A2')).toBe(true);
})

test('it should ensure a proper expiration date is always passed', () => {
    expect(isInputExpiryValid('12/26', 5)).toBe(true);
    expect(isInputExpiryValid('15/26', 5)).toBe(false);
    expect(isInputExpiryValid('0228', 5)).toBe(true);
})

test('it should ensure numeric sequence will confirm Luhn Validation', () => {
    expect(isInputLuhnValid('4821630149417944')).toBe(true);
    expect(isInputLuhnValid('6969071170997909')).toBe(true);
    expect(isInputLuhnValid('4821630149417948')).toBe(false);
    expect(isInputLuhnValid('4821 6301 4941 7944')).toBe(true);
})