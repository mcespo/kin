import { sanitizeInputValue, concatenateVariablesWithSymbol, splitInputValuesBySymbol } from "./inputManipulation"

test('it should remove all spaces and special characters from string', () => {
    expect(sanitizeInputValue('m@ake$ Me*() Pr377y!')).toEqual('makeMePr377y')
})

test('it should combine two strings together and insert a space inbetween', () => {
    expect(concatenateVariablesWithSymbol('John', 'Oliver', " ")).toEqual('John Oliver')
})

test('it should be able to add special characters inbetween a group of values', () => {
    expect(splitInputValuesBySymbol('MMYY', 2, '/')).toEqual('MM/YY')
    expect(splitInputValuesBySymbol('606391224', 5, '-')).toEqual('60639-1224')
})

