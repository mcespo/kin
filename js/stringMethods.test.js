import { isMinLengthValid, isMaxLengthValid, isMinMaxLengthValid } from "./inputManipulation"

test('it should allow text input to be MORE than or equal to number', () => {
    expect(isMinLengthValid('hello there', 10)).toBe(true)
})

test('it should allow text input to be LESS than or equal to number', () => {
    expect(isMaxLengthValid('hello there', 11)).toBe(true)
})

test('it should not allow text input to be less than required even if max limit is valid', () => {
    expect(isMinMaxLengthValid('123', 4, 4)).toBe(false)
})