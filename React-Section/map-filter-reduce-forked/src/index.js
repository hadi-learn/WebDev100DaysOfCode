import emojipedia from './emojipedia'

var numbers = [3, 56, 2, 48, 5]

//Map -Create a new array by doing something with each item in an array.
function double(num) {
  return num * 2
}
const newNumbers = numbers.map(double)

console.log(newNumbers)

const arrowFunctionNumbers = numbers.map( num => num * 2)
console.log(arrowFunctionNumbers)

//Filter - Create a new array by keeping the items that return true.
const filteredNumbers = numbers.filter((num) => {
  return num > 10
})

console.log(filteredNumbers)

console.log(numbers.filter( num => num > 10))

//Reduce - Accumulate a value by doing something to each item in an array.
const reducedNumber = numbers.reduce(function(accumulator, currentValue) {
  return (accumulator += currentValue)
})

console.log(reducedNumber)

console.log(numbers.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue)
}))

//Find - find the first item that matches from an array.
const foundNumber = numbers.find(function(num) {
  return num > 10
})

console.log(foundNumber)

console.log(numbers.find( num => num > 10))

//FindIndex - find the index of the first item that matches.
const foundIndexNumber = numbers.findIndex((num) => {
  return num > 10
})

console.log(foundIndexNumber)

console.log(numbers.findIndex( num => num > 10))

//////////////////////////////////////////////////////////////

console.log(
  emojipedia.map((emojiEntry) => {
    return emojiEntry.meaning.substring(0, 100)
  })
)