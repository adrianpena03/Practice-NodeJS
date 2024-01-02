// const { emit } = require("process");
// const { EventEmitter } = require("stream");

// var url = 'http://mylogger/io/log'

// function log(word) {
//     // Send an HTTP request
//     console.log('This is a ' + word)
// }

// module.exports = log; // adds method called 'log' to exports object, setting it to log function
// // module.exports.endPoint = url; // 'endPoint' can be named anything

// -------------------------------------------------------

const EventEmitter = require('events');

var url = 'http://mylogger.io/log'

class Logger extends EventEmitter { // Use 'extends' to have capabilities of EventEmitter
    log(message) { // don't need to label 'function' beforehand
        // Send an HTTP request
        console.log(message)

        // Raise an event
        this.emit('messageLogged', {id: 1, url: 'http://'}); // idk why video used 'this.'
    }
}

module.exports = Logger;