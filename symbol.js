/*
 *  Symbol
 */

// Symbols are a primitive with a Symbol function which can be used to create
// them. Unlike other primitives, Symbols do not have a literal syntax.

Symbol()
console.log(Symbol()) // logs Symbol()
console.log(typeof Symbol() === 'symbol') // logs true

// Symbols can be given a description, which is really just used for debugging.

console.log(Symbol('foo')) // logs Symbol(foo)


// Symbols can be used as Object keys

let myObject = {}
let aSymbol = Symbol('aSymbol')
let otherSymbol = Symbol('otherSymbol')
myObject['key'] = 42
myObject[aSymbol] = 3.14
myObject[otherSymbol] = 2.71
console.log(myObject) // logs { key: 42, [Symbol(aSymbol)]: 3.14, [Symbol(otherSymbol)]: 2.71 }
console.log(Object.keys(myObject)) // logs [ 'key' ]
console.log(Object.getOwnPropertyNames(myObject)) // logs [ 'key' ]
console.log(Object.getOwnPropertySymbols(myObject)) // logs [ Symbol(aSymbol), Symbol(otherSymbol) ]

// This means Symbols give a whole new sense of purpose to Objects - they 
// provide a kind of hidden under layer to Objects - not iterable over, not 
// fetched using the already existing Reflection tools and guaranteed not to 
// conflict with other properties in the object.

// By default, each new Symbol has a completely unique value. This means two
// symbols will never equal the same value, even if they have the same
// description. But there’s a small caveat to that - as there is also another 
// way to make Symbols that can be easily fetched and re-used: Symbol.for(). 
// This method creates a Symbol in a “global Symbol registry”. 

let s1 = Symbol('symbol')
let s2 = Symbol('symbol')
let testObject = {
    [s1]: 42,
    [s2]: 3.14
}
console.log(s1 === s2) // logs false
console.log(testObject) // logs { [Symbol(symbol)]: 42, [Symbol(symbol)]: 3.14 }
let s3 = Symbol.for('forSymbol')
let s4 = Symbol.for('forSymbol')
console.log(s3 === s4) // logs true

// P.S. This registry is also cross-realm, meaning a Symbol from an iframe or
// service worker will be the same as one generated from your existing frame.

// Use case: Symbols are good for unique value where string or number are 
// normally used.

let log = {}
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
}
console.log(log.levels.DEBUG) // logs Symbol(debug)

// Use case: Symbol can used to store custom metadata properties that are 
// secondary to the actual object.
let size = Symbol('size')
class Collection {
    constructor() {
        this.data = []
        this[size] = 0
    }

    add(item) {
        this.data[this[size]] = item
        this[size]++
    }

    static sizeOf(instance) {
        return instance[size]
    }
}
let c = new Collection()
console.log(Collection.sizeOf(c)) // logs 0
c.add(42)
console.log(Collection.sizeOf(c)) // logs 1
console.log(Object.keys(c)) // [ 'data' ]

// A key part of what makes Symbols useful, is a set of Symbol constants, known
// as "well known symbols". These are effectively a bunch of static properties 
// on the Symbol class which are implemented within other native objects, such 
// as Arrays, Strings, and within the internals of the JavaScript engine.

// Symbol.hasInstance is a Symbol which drives the behaviour of instanceof. When
// an ES6 compliant engine sees the instanceof operator in an expression it
// calls upon Symbol.hasInstance.

class MyClass {
    static [Symbol.hasInstance](lhs) {
        return Array.isArray(lhs)
    }
}
console.log([] instanceof MyClass) // logs true

// The "for of" loop, which calls Symbol.iterator on right hand operand to get
// values to iterate over.

let myArray = [ 'Hello, ', 'World!' ]
let _myArray = myArray[Symbol.iterator]()
console.log(_myArray.next()) // logs { value: 'Hello, ', done: false }
console.log(_myArray.next()) // logs { value: 'World!', done: false }
console.log(_myArray.next()) // logs { value: undefined, done: true }

class Range {
    constructor(from,to) {
        this.from = from;
        this.to = to
    }

    *[Symbol.iterator]() {
        for (let i = this.from; i < this.to; i++) {
            yield i
        }
    }
}

let range = new Range(0,3)
for (let v of range) {
    console.log(v) // logs 0, 1, 2
}

// Symbol.match with String.match function can be used for providing own 
// matching implementation, rather than using Regular Expression.

class MyMatcher {
    constructor(value) {
        this.value = value
    }
    [Symbol.match](value) {
        let index = value.indexOf(this.value)
        if (index === -1) {
            return null
        }
        return [this.value]
    }
}
let match = 'Hello, World!'.match(new MyMatcher('lo'))
console.log(match) // logs [ 'lo' ]

// Just kike Symbol.match, Symbol.replace can be used to allow custom classes
// for String.replace, rathen than using Regular Expression.

class MyReplacer {
    constructor(oldValue, newValue) {
        this.oldValue = oldValue,
        this.newValue = newValue
    }
    [Symbol.replace](string) {
        let index = string.indexOf(this.oldValue)
        if (index === -1) {
            return string
        }
        return string.slice(0, index) + this.newValue + string.slice(index + this.oldValue.length, string.length)
    }
}
var replaced = 'Hello, World!'.replace(new MyReplacer('World', 'Symbol.replace'))
console.log(replaced) // logs Hello, Symbol.replace!

// Symbol.species is a pretty clever Symbol, it points to the constructor value 
// of a class, which allows classes to create new versions of themselves within 
// methods. Now, if you were to make a class Foo extends Array - every time you 
// called Foo.map while before it would return an Array (no fun) and you’d have 
// to write your own Map implementation just to create Foos instead of Arrays, 
// now Foo.map return a Foo. You may be asking “why not just use 
// this.constructor instead of this.constructor[Symbol.species]?”. Well, 
// Symbol.species provides a customisable entry-point for what type to create - 
// you might not always want to subclass and have methods create your subclass - 
// take for example the following:

class MyPromise extends Promise {
    static get [Symbol.species]() {
        return Promise
    }
}

// Symbol.toPrimitive is used when the JavaScript engine needs to convert an
// Object into a primitive value - for example if you do +object then JS will
// call object[Symbol.toPrimitive]('number') if you do ''+object then JS will
// call object[Symbol.toPrimitive]('string'), and if you do something like
// if(object) then it will call object[Symbol.toPrimitive]('default').

class Answer {
    [Symbol.toPrimitive](hint) {
        if (hint === 'string') {
            return 'It is 42!'
        } else {
            return 42
        }
    }
}
let answer = new Answer()
console.log(+answer) // logs 42
console.log(String(answer)) // logs It is 42!

// Symbol.toStringTag is used by Object.toString when an object is passed to. It
// will check if it has a property of [Symbol.toStringTag] which should be a
// String.

class StringTagClass {
    get [Symbol.toStringTag]() {
        return 'StringTagClass'
    }
}
class NotStringTagClass {}

let stringTagClass = new StringTagClass()
console.log(stringTagClass.toString()) // logs [object stringTagClass]
let notStringTagClass = new NotStringTagClass()
console.log(notStringTagClass.toString()) // logs [object Object]

// There are other constant Symbols, in particular:
// - Symbol.isConcatSpreadable
// - Symbol.unscopable
// - Symbol.search
// - Symbol.split

/*
 *  Credits
 */
// https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/