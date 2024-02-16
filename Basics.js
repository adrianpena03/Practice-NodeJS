// const fs = require('fs');

// //Get the file list of the current directory
// let list = fs.readdirSync(__dirname);
// console.log("The list of files in the directory:\n"+list);

// // make a new directory called new
// // let newdir = __dirname + '/new';
// // fs.mkdirSync(newdir);

// //Get the file list of the current directory
// list = fs.readdirSync(__dirname,"utf-8");
// console.log("The list of files in the directory:\n"+list);

// ------------------------------------

// HASHMAPS

// const obj1 = {};

// obj1.FirstName = 'Adrian';

// // console.log(obj1) // Returns hashmap "{ FirstName: 'Adrian' }"

// const obj2 = {
//     ID: 123,
//     Name: 'Adrian',
//     boolean: True
// };

// obj1.print = () => { // Or function () {
//     console.log(obj1)
// } 

// -----------------------------------

// ARRAYS

// const ary1 = ['Bananas', 'apples', 'oranges'];

// console.log(ary1[1]); // Returns apples, index outside of list returns 'undefined'

// const ary2 = [{fruit: 'apples', vegtable: 'lettuce'}, {boy: 'Sam', girl: 'yo mama'}]; // list of 2 hashmaps

// const mixed = [23, 'string', {num: 45}] // Can have a list of different data types

// -----------------------------------

// process.argv.forEach((val, index) => { // 'forEach' is a method that acts as a for loop
//     console.log(`${index}: ${val}`)
// });

const path = require('path');

let workingPath = __dirname;
console.log('First Working Path: '+ workingPath);

const resolvedPath = path.resolve(workingPath, '..');
console.log('Second Working Path: ' + resolvedPath);

