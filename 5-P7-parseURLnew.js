const http = require('http');
const fs = require('fs');

//new API
const {URL} = require('url');

const server= http.createServer((req, res)=>{
    //console.log(`req.url:${req.url}`);
    res.end('Done');
});

server.listen(3002,()=>{
    console.log('Server running on 3002');
});

const baseURL='http://'+ req.headers.host + '/';
const parsedurl = new URL(req.url, baseURL);
console.log(parsedurl);

// //Parsing the req.url using the new API
// const {pathname, searchParams} = new URL(req.url, baseURL);
// console.log(pathname);
// console.log(searchParams);