const http = require('http');
const fs = require('fs');

//old API
const url = require('url');

const server= http.createServer((req, res)=>{
    //console.log(`req.url:${req.url}`);
    res.end('Done');
});

server.listen(3001,()=>{
    console.log('Server running on 3001');
});

const parsedurl = url.parse(req.url, true);
console.log(parsedurl);

// //Parsing the req.url using the old API
// const {pathname, query} = url.parse(req.url,true);
// console.log(pathname);
// console.log(query);
