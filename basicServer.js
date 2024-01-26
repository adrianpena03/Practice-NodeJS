// // Dependencies
// const http = require('http');

// // Create server object to respond to a requets with a string.
// // Nodejs functions can be assigned to a variable. Can nest a function too

// const server = http.createServer((req, res) => {
//     res.end('Hello, World\n');
// });

// // Make server listen on port 3000 for any request
// server.listen(3000, () => {
//     console.log('Server is listening on port 3000.');
// });

/**
 * 
 * 
 * BASIC SERVER ABOVE, ADDING MORE TO IT BELOW
 * 
 * 
 */

// Dependencies
// const http = require('http');

// // Create server object to respond to a requets with a string.
// // Nodejs functions can be assigned to a variable. Can nest a function too

// const server = http.createServer((req, res) => {
//     console.log(req.headers);
//     console.log(req.method);
//     console
//     res.end('Hello, World\n');
// });

// // Make server listen on port 3000 for any request
// server.listen(3000, () => {
//     console.log('Server is listening on port 3000.');
// });

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Req Headers ${req.headers}`);
    console.log(`Req Method ${req.method}`);
    console.log(`Req URL: ${req.url}`);
    res.end('Hi, there. Welcome.');

});

server.listen(3000, () => {
    console.log('Server is listening on port 3000')
});

