// function sayName(name) {
//     console.log('Hello ' + name)
// }

// sayName('Adrian')

// console.log(); // global object, can be accessed anywhere in any file
// setTimeout() // call function after a specific delay (can be used on client, on browser, or inside of node)
// clearTimeout()


// setInterval() // Repeatedly call function after given delay
// clearInterval() // stop function from being called repeatedly

// -------------------------------------------
// Creating a module

// const log = require('./logger_aa');

// log('Test');

// -------------------------------------------

// const path = require('path') // loads built in 'path' module, store in constant

// var pathObj = path.parse(__filename);

// console.log(pathObj)

// --------------------------------------------

// const os = require('os'); // importing

// const freeMemory = os.freemem();

// console.log(`Free Memory: ${freeMemory} bytes`);

// --------------------------------------------

// const fs = require('fs');

// // const files = fs.readdirSync('./'); // Return all files and folders in current folder. str array
// // console.log(files);

// fs.readdir('./', function(err, files) { // read contents of curr directory. this function takes in two parameters (path of curr_dir and callback function (func to be run once operation is complete))
//     if (err) console.log('Error', err); // checks if error occurred, if there is, prints an error message along with error details
//     else console.log('Result', files) // if no error, print the list of files and directories in curr directory. 'files' parameter (callback func) contains array of filenames
// });

// ---------------------------------------------

// const EventEmitter = require('events'); // Class because of capitilized convention at beginning of every word
// const emitter = new EventEmitter(); // Instance of EventEmitter class

// emitter.on('messageLogged', function(arg){ // Register a listener, put args (usually also e or eventArg) so it can take arguments
//     console.log('Listener called', arg);
// })

// emitter.emit('messageLogged', {id: 1, url: 'http://'}); // raise an event

// ----------------------------------------------

// Extended EventEmitter

// const EventEmitter = require('events'); // Class because of capitilized convention at beginning of every word

// const Logger = require('./logger_aa');
// const logger = new Logger(); // created Logger object

// // Register a listener
// logger.on('messageLogged', function(arg) { // can also write ', (arg) => {....' instead of saying 'function' 
//     console.log('Listener called', arg);
// })

// logger.log('message'); // to log a message

// ---------------------------------------------------

console.log('hi');