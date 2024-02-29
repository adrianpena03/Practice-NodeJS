// -------- Part 1 ---------

let person = { // 1
    firstName: "Alice",
    age: 25,
    fav_sport: 'tennis',
    hobby: 'cooking'
};

person.gender = "Female"; // 3
person.age = 31; // 4

console.log(person['age']); // 5

for (let property in person) { // 6 (iterate over properties)
    console.log(property + ": " + person[property]);
  }

for (let property in person) { // 7
    if (person[property] === 'tennis'){
        delete person[property]
    }
}

let keysArray = Object.keys(person); // 8

person.hobby = [person.hobby, 'photography']; // 9

keysArray.forEach((keys) => {
    console.log(keys, ':',person[keys]);
});


let valuesArray = Object.values(person); // 10

for (let i = 0; i < valuesArray.length; i++){ // 11
    console.log(valuesArray[i])
}

// -------- Part 2 ----------

let today = new Date();
let shape = {
    name: 'circle',
    radius: 3.16,
    area: 
    function()
    {
        return Math.PI * Math.pow(this.radius, 2);
    },
};
let capacity =
{
    name: 'cube',
    side: 10,
    volume: 
    function()
    {
        return Math.pow(this.side, 3);
    },
};
let pet = 
{
    type: 'cat',
    name: 'Fluffy',
    year: 2022,
    age: 
    function()
    {
        return today.getFullYear() - 2022
    },
};
console.log(`The ${shape.name} has an area of ${shape.area()}`);
console.log(`The ${capacity.name} has a volume of ${capacity.volume()}`);
console.log(`This year my ${pet.type} ${pet.name} is ${pet.age()} years old`);

// --------- Part 3 ---------

let myPets =
{
    pet1: 
    {
        name: 'Fluffy',
        color: 'orange',
        type: 'cat',
    },
    pet2:
    {
        name: 'Stuffy',
        color: 'white',
        type: 'hamster'
    },
    pet3:
    {
        name: 'Bluffy',
        color: 'brown',
        type: 'dog',
    },
};
let count = 0;
for (x in myPets)
{
    count += 1;
}
myPets.number = count
console.log(`I have ${myPets.number} pets. Their names are ${myPets.pet1.name},
${myPets.pet2.name} and ${myPets.pet3.name}.`);
console.log(`${myPets.pet1.name} is an ${myPets.pet1.color} ${myPets.pet1.type}, 
${myPets.pet2.name} is a ${myPets.pet2.color} ${myPets.pet2.type} and 
${myPets.pet3.name} is a ${myPets.pet3.color} ${myPets.pet3.type}`);

// -------- Part 4 ----------

/*
defining objects whose properties are function expressions and use
the name for these function-expressions as values for the keys in other objects.
*/

const path = require('path');

// Check for correct invocation
if (process.argv.length !== 4) {
    console.log("Usage: " + path.basename(process.argv[1], '.js') + " [number]  [isEven|isPositive|squared]");
    return;
}

// Define the operations object
let operations = {
    isEven: function(mynumber) {
        if (mynumber % 2 === 0) {
            return true;
        } else {
            return false;
        }
    },

    isPositive: function(mynumber) {
        if (mynumber > 0) {
            return true;
        } else {
            return false;
        }
    },

    squared: function (mynumber) {
        return mynumber * mynumber;
    }
};

// Define a function for handling invalid operations
let wrongOp = function(){
    return "Undefined operation";
};

let mynumber = parseInt(process.argv[2]);
let chosenOp = process.argv[3];

// Complete the if statement to check if the operation is valid
if (!operations[chosenOp]) {
    console.log(wrongOp());
} else {
    // Execute the operation on the number
    let result = operations[chosenOp](mynumber);
    console.log(result);
}

// ------- Part 5 --------

let number = 56;

let groceries = [{'eggs': 5.3},{'milk': 2.45}, {'cheese': 4.6}];

let book = {
    name:'Node.Js in Action',
    authors: ['Mike Cantelon', ' Marc Harter', 'Nathan Rajlich',  'T. J Holowaychuk'],
    editions:[2013, 2014, 2017],
    publisher: 'Manning Publications Co.',
    copies: 3,
    recent: function(){
        let today = new Date();
        let maxYr = Math.max(...this.editions);
        if (today-maxYr > 3)
            return true;
        return false;
    }
};
console.log(book);
console.log(book.recent());
console.log(groceries);
console.log(number);

// TODO: Stringfy all variables

let numberJson = JSON.stringify(number);
let groceriesJson = JSON.stringify(groceries);
let bookJson = JSON.stringify(book);


//TODO: Print out the stingfied varaible

console.log(numberJson);
console.log(groceriesJson);
console.log(bookJson);

//TODO: Parse the stringfied variables
let parsedBookObj = JSON.parse(parsedBook);
let parsedgroceries = JSON.parse(groceries)
let parseNumber = JSON.parse(number)

//TODO:Print out the parsed variables and compare to the 
//variables originally declared at the beginning of the code
console.log('Comparison:');
console.log('Original number:', number);
console.log('Parsed number:', parseNumber);
console.log('Original groceries:', groceries);
console.log('Parsed groceries:', parsedgroceries);
console.log('Original book:', book);
console.log('Parsed book:', parsedBookObj);

// ------ Part 6 -------

// ------- Part 7 --------


