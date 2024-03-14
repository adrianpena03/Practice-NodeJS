// value of an object can be accessed in two ways
//     Dot Notation: person.name
//     Bracket Notation: person['name]

// parameters is the placeholder that goes in function, argument is value of the parameter

// Three ways to define a function in JS

// 1). Arrow function

let greetPeople = () => console.log('Hello');
greetPeople();

// 2). Function Declaration (can be called before declared)

greetPeoplee();

function greetPeople() {
    console.log("Good Morning!");
}

// 3). Function Expression (cannot be called before declared) (bc var?)

let greetPeople = function () {
    console.log("Good Morning!");
};

greetPeople();

// ----------------------------------- //

// When the value on an object is a function, the property is called a method. 


// ❖ Object methods can be defined on an object in different ways:

// 1. Function expression

let person = {
    firstName: 'John',
    lastName: 'Doe'
};

person.greet = function () { //adds the greet method to the person object
    console.log('Hello!');
}
person.greet();

// 2. Direct assignment

let person = {
    firstName: 'John',
    lastName: 'Doe'
};
function greet() {
    console.log('Hello, World!');
}
person.greet = greet;
person.greet();

// 3. Concise method syntax

let person = {
    firstName: 'John',
    lastName: 'Doe',
    greet() {
        console.log('Hello, World!');
    }
};

person.greet();

// --------- Accessing JSON Data ----------

// JSON object
const data = {
    "name": "John",
    "age": 22,
    "hobby": {"reading" : true, "gaming" : false, "sport" : "football"},
    "class" : ["JavaScript", "HTML", "CSS"]
}
// accessing JSON object
console.log(data.name); // John
console.log(data.hobby); // { gaming: false, reading: true, sport: "football"}
console.log(data.hobby.sport); // football
console.log(data.class[1]); // HTML
console.log(data["name"]); // John

// JSON
    // Key-Value pairs in double quotes    
    // Cannot contain functions
    // Objects can be used with other languages

// JS Objects
    // Can be without double quotes
    // Can contain functions
    // Objects only be used in JS

// --------- Parsing a URL ----------

const url = require('url');
const adr = 'http://localhost:8080/default.htm?year=2017&month=february';
const q = url.parse(adr, true); // true: use the query string module to parse the query

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february’

const qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'

// --------- WHATWG API ----------

const {URL} = require('url');
const adrr = 'http://localhost:8080/default.htm?year=2017&month=february';
const url = new URL(adrr); //Creates a new URL object by parsing adr
console.log(url.host);//returns 'localhost:8080'
console.log(url.pathname);//returns '/default.htm'
console.log(url.search);//returns '?year=2017&month=february’