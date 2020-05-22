/*
 *  this (aka execution context) keyword
 */

function myStrictFunction() {
    'use strict'
    console.log(this) 
}
myStrictFunction() // logs undefined

function myFunction() {
    console.log(this) 
}
myFunction() // logs global object

const myObject = {
    method() {
        console.log(this)
    }
};
myObject.method(); // logs myObject { method: [Function: method] }

function myFunction() {
    console.log(this)
}  
const myContext = { value: 'My Context' }
 
myFunction.call(myContext);  // logs { value: 'My Context' }
myFunction.apply(myContext); // logs { value: 'My COntext' }

// Dog is a regular function, and when invoked with new keyword, it creates 
// new instances of Dog type.
function Dog() {
    console.log(this)
}
Dog() // logs global object
new Dog() // logs an instance of Dog

// The arrow function doesn’t define its own execution context. No matter how or
// where being executed, this value inside of an array function always equals 
// this value from the outer function. A consequence of this resolved lexically 
// is that an arrow function cannot be used as a constructor.
const myObjectBis = {
    method() {
        console.log(this) // logs my myObjectBis { method: [Function: method] }
        const myArrowFunction = () => {
            console.log(this) // logs myObjectBis { method: [Function: method] }
        }
        myArrowFunction()
    }
}
myObjectBis.method()

class Hero {
    constructor(heroName) {
        this.heroName = heroName
    }
    logName() {
        console.log(this.heroName)
    }
    arrowLogName = () => {
        console.log(this.heroName)
    }
}
  
const batman = new Hero('Batman')
setTimeout(batman.logName, 0) // logs undefined
setTimeout(batman.logName.bind(batman), 0) // logs Batman
setTimeout(batman.arrowLogName, 0) // logs Batman