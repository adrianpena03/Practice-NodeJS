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



