// Array store elements by reference for objects and by value (copied) for
// primitives.

let supercars = [ { brand: 'Ferrari', model: 'F40' } ]
let ferrari = supercars[0]
console.log(ferrari) // logs { brand: 'Ferrari', model: 'F40' }

ferrari.model = 'F50'
console.log(ferrari) // logs { brand: 'Ferrari', model: 'F50' }
console.log(supercars[0]) // logs { brand: 'Ferrari', model: 'F50' }

let lamborghini = { brand: 'Lamborghini', model: 'Miura' }
supercars.push(lamborghini)
console.log(supercars[1]) // logs { brand: 'Lamborghini', model: 'Miura' }

lamborghini.model = 'Aventador'
console.log(supercars[1]) // logs { brand: 'Lamborghini', model: 'Aventador' }

let numbers = [ 1, 2, 3 ]
let n = numbers[0]
console.log(n) // logs 1

n = 42
console.log(n) // logs 42
console.log(numbers[0]) // logs 1

let index = numbers.indexOf(1)
numbers[index] = 42
console.log(numbers[0]) // logs 42