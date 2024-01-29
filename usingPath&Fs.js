// GLOBAL VARIABLES

// console.log("Dirname: " + __dirname);
// console.log("Filename: " + __filename);

// console.log("Process CWD: " + process.cwd());

// console.log(process.argv[0]);


// ----------------

// PATH BASICS?

const fs = require('fs');
const path = require('path');

// console.log(path.basename(__filename)); // prints filename
// console.log(path.extname(__filename)); // prints extension of file

// console.log(path.dirname(__filename)); // pwd (path)

// console.log(path.basename(path.dirname(__filename))); // Prints curr directory (one) 
// console.log(path.dirname(path.dirname(__filename))); // Prints the directory outside curr one

// console.log(path.join('one', 'two', 'three')); // one/two/three
// console.log(path.resolve('one', 'two', 'three')); // pwd + /one/two/three

// --------------------

// Define list and iterate through in js

// var list = ['Mercury', 'Venus', 'Earth', 'Mars']

// for (let i = 0; i < list.length; i++) {
//     console.log(list[i]);
//     }

// list.forEach(list => {
//     console.log(list);
//     });

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

// 1. Check for correct invocation
if (process.argv.length < 3) {
  console.error("Error-- Usage: node activity2.js <folder1> <folder2> ...");
}

// 2. Create folders
const folderNames = process.argv.slice(2);
for (const folderName of folderNames) {
  try {
    fs.mkdirSync(path.join(__dirname, folderName));
    console.log(`Created folder: ${folderName}`);
  } catch (error) {
    console.error(`Error creating folder ${folderName}: ${error.message}`);
  }
}

// 3. Print directory content
fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
  } else {
    console.log("\nDirectory content:");
    console.log(files.join("\n"));
  }
});

// 4. Delete folders
for (const folderName of folderNames) {
  try {
    fs.rmdirSync(path.join(__dirname, folderName));
    console.log(`Deleted folder: ${folderName}`);
  } catch (error) {
    console.error(`Error deleting folder ${folderName}: ${error.message}`);
  }
}

// 5. Print directory content again
fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
  } else {
    console.log("\nDirectory content after deletion:");
    console.log(files.join("\n"));
  }
});

