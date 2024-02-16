// // array.push('Thursday', 'Friday');
// // array.splice(0, 2);
// // console.log(array)


// // let output = '';
// // for (let i=0; i<array.length; i++){
// //     output += i + 1 + ') ' + array[i] + '\n';
// // }
// // console.log(output);

// // Part 2

// // //Add dependency
// // const http = require('http');
// // //Request handler – defined as a named arrow function expression
// // const reqHandler = (req,res)=>{
// //  res.end('Hello World');
// // }

// // Part 2.5 below

// //Create the server
// const http = require('http');

// const reqHandler = (req, res) => {
//     switch (req.method) {
//         case 'POST':
//             res.end('In Post');
//             break;
//         case 'GET':
//             res.end('In Get');
//             break;
//         case 'PUT':
//             res.end('In Put');
//             break;
//         default:
//             res.end('Invalid HTTP method');
//             break;
//     }
// };

// const server = http.createServer(reqHandler);

// // Server listens on port 8080
// server.listen(8080, () => {
//     console.log("The server is listening on port 8080");
// });

