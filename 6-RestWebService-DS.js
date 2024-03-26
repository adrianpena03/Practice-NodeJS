const fs = require('fs');   
const http = require('http');
const {URL} = require('url'); 

//Helper Functions
function loadInitializeList(file, cb){
    fs.readFile(file,{"encoding":"utf-8"},(err, jsonList)=>{
        console.log(jsonList);
        if (err){ //file does not exist
            cb([]);
        }else{
            let list = JSON.parse(jsonList);
            cb(list);
        }
    });
}
function storeList (file, list){
    fs.writeFile(file, JSON.stringify(list), (err)=>{
        if (err){
            console.log('Error Writing the file');
        }else{
            console.log('File Saved succesfully'); 
        }
    });
}

// Create folders for the to-do list and shopping list
//Folders can be created Synchronously or Asynchronously
const todoDir = './todo';
const shopDir = './shop';
fs.readdir(todoDir,(err,content1)=>{
    if (err){
        fs.mkdir(todoDir, (err)=>{
            if (err) throw err;
        });
    }
});
fs.readdir(shopDir ,(err,content2)=>{
    if (err){
        fs.mkdir(shopDir, (err)=>{
            if (err) throw err;
        });
    }
});
//JSON Files variables
const todoFile = './todo/todo.json';
const shopFile = './shop/shop.json';

//************ HANDLERS
//POST Handler
const POSTHandler = (file, newItem, cb)=>{
    loadInitializeList(file,(list)=>{
        console.log(list);
        list.push(newItem);
        storeList(file, list);
        cb(200, 'OK\n');
    });
}
//DELETE Handler
const DELETEHandler = (file, index, cb)=>{
    loadInitializeList(file, (list)=>{
        if (index >= list.length){
            cb(404,'NOT FOUND');
        }else{
            list.splice(index,1);
            storeList(file,list);
            cb(200,'OK');
        }
    });
}
//PUT Handler
const PUTHandler = (file, qs, cb)=>{
    let index = qs.index;
    loadInitializeList(file, (list)=>{
        if (index >= list.length){
            cb(404,'NOT FOUND');
        }else{
            const keys  = Object.keys(qs); //get the keys in the qs object
            if (keys.indexOf("text")!== -1){
                list[qs.index].text = qs.text;
            }
            if (keys.indexOf("quantity")!== -1){
                list[qs.index].quantity = qs.quantity;
            }
            if (keys.indexOf("priority")!== -1){
                list[qs.index].priority = qs.priority;
            }
            if (keys.indexOf("category")!== -1) {
                list[qs.index].category = qs.category;
            }
            storeList(file,list);
            cb(200,'OK');
        }

    });
}

//Request Handler
const requestHandler = (req,res)=>{
    //Parsing the req.url using the new API
    const baseURL = 'http://'+ req.headers.host + '/';
    const {pathname, searchParams} = new URL(req.url, baseURL); 
    
    //Converting the searchParams object to a native JS object
    let entries = searchParams.entries();
    const query = Object.fromEntries(entries); 

    //Extract the request method
    const method =  req.method.toUpperCase();

    //Routing logic
    switch(method){
        case 'POST':if (pathname === '/shop' || pathname === '/shop/'){
                    POSTHandler (shopFile,query,(statusCode,response)=>{
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHeader(statusCode)
                        res.end(response); 
                    } );  
                    }else if (pathname === '/todo' || pathname === '/todo/'){
                        POSTHandler (todoFile,query,(statusCode,response)=>{
                            res.setHeader('content-type','text/plain; charset="utf-8"');
                            res.writeHeader(statusCode)
                            res.end(response); 
                        } );                     
                    }else{ //invalid pathname
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHeader(400)
                        res.end('BAD REQUEST');
                    }
            break;
        case 'GET':if (pathname === '/shop' || pathname === '/shop/'){
                    res.setHeader('content-type','application/json');
                    res.writeHead(200);
                    let stream = fs.createReadStream(shopFile);
                    stream.pipe(res);
                    stream.on('error', function(err){
                        if (err.code === 'ENOENT'){
                            res.end('Not Found');
                        }else{
                            res.end('Internal Server Error');
                        }
                      });
                      
                    // stream.on('data', (chunk)=>{
                    //     res.write(chunk);
                    // });
                    // stream.on('end', function(){
                    //     res.end();
                    // });
            // loadInitializeList(shopFile,(list)=>{
            //     if (list.length === 0){
            //         res.setHeader('content-type','text/plain; charset="utf-8"');
            //         res.writeHead(200);
            //         res.end('List is Empty');
            //     }else{
            //         let listStr = JSON.stringify(list);
            //         res.setHeader('Content-Type','application/json');
            //         res.writeHead(200);
            //         res.end(listStr);
            //     }
            // });                   
        }else if (pathname === '/todo' || pathname === '/todo/'){
                    res.setHeader('content-type','application/json');
                    res.writeHead(200);
                    let stream = fs.createReadStream(todoFile);
                    stream.pipe(res);
                    stream.on('error', function(err){
                        if (err.code === 'ENOENT'){
                            res.end('Not Found');
                        }else{
                            res.end('Internal Server Error');
                        }
                      });
            
            // loadInitializeList(todoFile,(list)=>{
            //     if (list.length === 0){
            //         res.setHeader('content-type','text/plain; charset="utf-8"');
            //         res.writeHead(200);
            //         res.end('List is Empty');
            //     }else{
            //         let listStr = JSON.stringify(list);
            //         res.setHeader('Content-Type','application/json');
            //         res.writeHead(200);
            //         res.end(listStr);
            //     }
            // });                   
        }else{ //invalid pathname
            res.setHeader('content-type','text/plain; charset="utf-8"');
            res.writeHeader(400)
            res.end('BAD REQUEST');
            }
            break;
        case 'DELETE':if (pathname === '/shop' || pathname === '/shop/'){
                        DELETEHandler(shopFile, query.index, (statusCode, response)=>{
                            res.setHeader('content-type','text/plain; charset="utf-8"');
                            res.writeHeader(statusCode)
                            res.end(response);
                        });
                    }else if (pathname === '/todo' || pathname === '/todo/'){
                        DELETEHandler(todoFile, query.index, (statusCode, response)=>{
                            res.setHeader('content-type','text/plain; charset="utf-8"');
                            res.writeHeader(statusCode)
                            res.end(response);
                        });                    
                    }else{ //invalid pathname
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHeader(400)
                        res.end('BAD REQUEST');                    }
            break;
        case 'PUT':if (pathname === '/shop' || pathname === '/shop/'){
                        res.end('Reached shop path - PUT method');
                    }else if (pathname === '/todo' || pathname === '/todo/'){
                        res.end('Reached todo path - PUT method');
                    }else{ //invalid pathname
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHeader(400)
                        res.end('BAD REQUEST');                    }
            break;
    }
}


const server = http.createServer(requestHandler);
server.listen(3032,()=>{
    console.log('Server is listenning on port 3032');
})