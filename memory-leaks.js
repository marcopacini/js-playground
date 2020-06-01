/*
 *  A few common sources of memory leaks
 */

// Global variables are always available from the root and will never get 
// garbage collected. So accidentally global variable creation can lead to
// memory leaks. 

function myFunction() {
    gloabalVariable = 'This is a global variable'
    this.anotherGlobalVariable = 42
}
myFunction()

// strict mode ("use strict") will prevent accidental leaks as the code from 
// the example above will throw errors.

// Function-scoped variables will be cleaned up after the function has exited 
// the call stack and if there aren't any references left outside of the 
// function pointing at them. The closure will keep the variables referenced 
// and alive although the function has finished executing.

function myOuterFunction() {
    let veryBigArray = [ /*  a lot of data */ ]
    function myInnerFunction() {
        veryBigArray.push(42)
    }
    return myInnerFunction
}

let myClosure = myOuterFunction()

// veryBigArray is never returned and cannot be reached, but its size can grow 
// infinitely depending on how many times we call the function myInnerFunction.
// closures are an unavoidable so it is important to understand when the closure 
// has been created and what objects are retained by it and the expected 
// lifespan and usage (especially if used as a callback).

// Active event listener will prevent all variables captured in its scope from 
// being garbage collected. Once added, the event listener will remain in effect 
// until it is explicitly removed with removeEventListener or the associated DOM 
// element is removed.

const veryBigObject = {}
document.addEventListener('keyup', function() {
    // do something with veryBigObject
});

// An anonymous inline function is used as an event listener, which means it 
// can’t be deleted with removeEventListener function. We should always 
// unregister the event listener once no longer needed, by creating a reference 
// pointing to it and passing it to removeEventListener function.

function myEventListener() {
    // do something with veryBigObject
}
decument.addEventListener('keyup', myEventListener)
document.removeEventListener('keyup', myEventListener)

// In case the event listener must only execute once, addEventListener() can 
// take a third parameter, which is an object providing additional options.

document.addEventListener('keyup', function() {
    // do something with veryBigObject
}, { once: true });

