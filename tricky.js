function myFunction() {
    let a = b = 0
}
myFunction()

console.log(typeof a)
console.log(typeof b)

// Explaination: In myFunction body it is declared a local variable a. However, 
// it is declared a global variable b because no variable b is declared neither 
// in the myFunction scope or global scope.

const array = [ 1, 2, 3 ]
array.length = 0
console.log(array[0])


// Explaination: Reducing the value of the length property has the side-effect 
// of deleting own array elements whose array index is between the old and new 
// length values.

const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);{
  numbers.push(i + 1)
}
console.log(numbers)

// Explaination: The semicolon ; that appears right before the opening curly 
// brace create a null statement.

function arrayFromValue(item) {
    return 
        [item];
}
console.log(arrayFromValue(42))

// Explaination: The new line between the return keyword and [item] expression
// makes Javascript automatically insert a semicolon between return and [item] 
// expression.

console.log(myVar)
var myVar = 'myVar'

// Explaination: Accessing myVar before declaration evaluates to undefined. A 
// hoisted var variable, before its initialization, has an undefined value.
// However if myVar had been defined with let or const a ReferenceError had been
// raised because const variables are in a temporal dead zone until the 
// declaration.

let j
for (j = 0; j < 3; j++) {
    const log = () => {
        console.log(j)
    }
    setTimeout(log, 0)
}    

// Explaination: The log function is a closure that captures the variable j, 
// which is defined in the outside scope of for() cycle. It’s important to 
// understand that the closure captures j variable lexically. So log function
// reads the current value of variable j, which is 3, because it is executed
// when the for loop is already ended.
