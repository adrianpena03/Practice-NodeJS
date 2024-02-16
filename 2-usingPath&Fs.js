const fs = require('fs');
const path = require('path');

// GLOBAL VARIABLES

// console.log("Dirname: " + __dirname + "\n"); // pwd
// console.log("Filename: " + __filename + "\n"); // pwd + /<filename>

// console.log("Process CWD: " + process.cwd() + "\n"); // pwd

// console.log("process.argv[0]: " + process.argv[0] + "\n"); // node


// console.log("process.argv[1]: " + process.argv[1] + "\n"); // usingPath&Fs.js
 
// console.log("process.argv[2]: " + process.argv[2] + "\n"); // undefined



// ----------------

// PATH BASICS?

// console.log("path.basename: " + path.basename(__filename) + "\n"); // prints filename
// console.log("path.extname: " + path.extname(__filename) + "\n"); // prints extension of file

// console.log("path.dirname(__filename): " + path.dirname(__filename) + "\n"); // pwd (path)

// console.log("path.basename(path.dirname...: " + path.basename(path.dirname(__filename)) + "\n"); // Prints only curr directory 
// console.log(path.dirname(path.dirname(__filename) + "\n")); // Prints the directory outside curr one

// console.log("Path.join: " + path.join('one', 'two', 'three') + "\n"); // one/two/three
// console.log("path.resolve: " + path.resolve('one', 'two', 'three') + "\n"); // pwd + /one/two/three

// // --------------------

// Define list and iterate through in js

var list = ['Mercury', 'Venus', 'Earth', 'Mars']

for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
    };

list.forEach(item => {
    console.log(item);
    });

for (const planet in list) {
    console.log(planet);
};

// ---------------------

// const name_folder = path.dirname(__filename).split(path.sep);

// name_folder.forEach(name_folder => {
//     console.log(name_folder);
// });

// --------------------


`you will execute your program as follows:
node activity2.js foo bar baz
Note that the list of folder names will be stored in the process.argv starting at index 2.
1. Add module dependencies and check for the correct invocation of your program.
2. Using a for loop create folders with the names stored in process.argv in the current
directory
3. Print the directory content to the screen.
4. Using a for loop delete the folders that you have created.
5. Print the directory content again`

// // 1. Check for correct invocation
// if (process.argv.length < 3) {
//   console.error("Error-- Usage: node activity2.js <folder1> <folder2> ...");
// }

// // const folderNames = process.argv.slice(2);
// // // 2. Create Folders
// // folderNames.forEach(folderName => {
// //   try {
// //     fs.mkdirSync(path.join(__dirname, folderName));
// //     console.log(`Created folder: ${folderName}`);
// //   } catch (error) {
// //     console.log(`Error creating folder ${folderName}`);
// //   }
// // });

// // 2. Create folders
// const folderNames = process.argv.slice(2);
// for (const folderName of folderNames) {
//   try {
//     fs.mkdirSync(path.join(__dirname, folderName));
//     console.log(`Created folder: ${folderName}`);
//   } catch (error) {
//     console.error(`Error creating folder ${folderName}: ${error.message}`);
//   }
// }

// // 3. Print directory content
// fs.readdir(__dirname, (err, files) => {
//   if (err) {
//     console.error(`Error reading directory: ${err.message}`);
//   } 
//   else {
//     console.log("\nDirectory content:");
//     console.log(files.join("\n"));
//   }
// });


// // 4. Delete folders
// for (const folderName of folderNames) {
//   try {
//     fs.rmdirSync(path.join(__dirname, folderName));
//     console.log(`Deleted folder: ${folderName}`);
//   } catch (error) {
//     console.error(`Error deleting folder ${folderName}: ${error.message}`);
//   }
// }

// // 5. Print directory content again
// fs.readdir(__dirname, (err, files) => {
//   if (err) {
//     console.error(`Error reading directory: ${err.message}`);
//   } else {
//     console.log("\nDirectory content after deletion:");
//     console.log(files.join("\n"));
//   }
// });


// --------------------

// Activity 4

// Task 1: Extract the name of the folders in __dirname to an array
const foldersArray = __dirname.split(path.sep);

// Task 2: Using a for loop, print each folder name to the console on a separate line
console.log('Folders in __dirname:');
for (const folder of foldersArray) {
    console.log(folder);
}

// Task 3: Using path.join(), recreate the path and assign it to a variable called newpath
const newpath = path.join(...foldersArray);

// Task 4: Print newpath to the terminal
console.log('\nRecreated path using path.join():');
console.log(newpath);
