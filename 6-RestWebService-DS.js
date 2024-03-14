const fs = require('fs');
const http = require('http');
const {URL} = require('url');

const todoDir = './todo';
const shopDir = './shop'
fs.readdir(todoDir,(err,content)=>{
    if (err){
        fs.mkdir(todoDir,(err)=>{
            if (err) throw err;
        });
    }
});
fs.readdir(shopDir,(err,content)=>{
    if (err){
        fs.mkdir(shopDir,(err)=>{
            if (err) throw err;
        });
    }
});
const todoFile = './todo/todo.json';
const shopFile = './shop/shop.json';

//Helper Functions
function loadInitializeList(file, cb){
    fs.readFile(file, 'utf-8',(err, data)=>{
        if (err){
            cb([]);
        }else{
           cb(JSON.parse(data));
        }
    });
}
function storeList(file, list){
    fs.writeFile(file, JSON.stringify(list), (err)=>{
        if (err) throw err;
        console.log(`${file} has been saved successfully!!`);
    });
}


//Handlers

const POSTHandler = (file, newItem, cb)=>{
    loadInitializeList(file,(list)=>{
        list.push(newItem);
        storeList(file,list);
        cb(200, 'OK\n');
    })
}

const requestHandler = (req,res)=>{
    const baseURL = 'http://' + req.headers.host + '/';
    const {pathname, searchParams} = new URL(req.url,baseURL);
    let entries = searchParams.entries();
    let query = Object.fromEntries(entries);
    let method = req.method.toUpperCase();

    switch(method){
        case 'POST':
                if(pathname === '/todo/' || pathname === '/todo'){
                //handle the todolist - text is sent in the body of the request. 
                    req.setEncoding('utf-8');
                    let text = ''
                    req.on('data',(chunk)=>{
                        text +=chunk;
                    });
                    req.on('end',()=>{
                        query.text = text;
                        POSTHandler(todoFile, query,(statusCode, response)=>{
                            res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                            res.writeHeader(statusCode);
                            res.end(response);
                        });
                    });
                    
                }else if(pathname === '/shop/' || pathname === '/shop'){
                    //handle the shoplist
                    POSTHandler(shopFile, query,(statusCode, response)=>{
                        res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                        res.writeHeader(statusCode);
                        res.end(response);
                    });
                }else{
                    //invalid route
                    res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                    res.writeHeader(400);
                    res.end('BAD REQUEST');
                }
            break;
        case 'GET': //Displaying high priority tasks
            if(pathname === '/todo/high' || pathname === '/todo/high/'){
                loadInitializeList(todoFile,(list)=>{
                    if (list.length === 0){
                        res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                        res.statusCode = 200;
                        res.end('The list is empty');
                    }else{
                        let response = [];
                        list.forEach((element) => {
                            if(element.priority === 'high'){
                              response.push(element);
                              
                            }
                        });
                        res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                        res.statusCode = 200;
                        res.end(JSON.stringify(response));
                    }
                });
            } else if(pathname === '/todo/' || pathname === '/todo'){
                //handle the todolist
                res.setHeader('Content-Type','application/json');
                //res.writeHeader(200);
                let stream = fs.createReadStream(todoFile);
                
                stream.on('error',(err)=>{
                    res.statusCode = 500;
                    if(err.code === 'ENOENT'){
                        res.end('file not found');
                    }else{
                        res.end('Internal Server error');
                    }
                });
                res.statusCode = 200;
                stream.pipe(res);
            }else if(pathname === '/shop/' || pathname === '/shop'){
                //handle the shoplist
                /**
                 * Using Streams and Pipes
                 */
                res.setHeader('Content-Type','application/json');
                let stream = fs.createReadStream(shopFile);
                stream.on('error',(err)=>{
                    res.statusCode = 500;
                    if(err.code === 'ENOENT'){
                        res.end('file not found');
                    }else{
                        res.end('Internal Server error');
                    }
                });
                res.statusCode = 200;
                stream.pipe(res);

                /**
                 * Using Streams only
                 */
                res.setHeader('Content-Type','application/json');
                let rStream = fs.createReadStream(shopFile);
                rStream.on('data',(chunk)=>{
                   res.write(chunk);
                });
                rStream.on('end',()=>{
                    res.end();
                 });
                 rStream.on('error',(err)=>{
                    res.statusCode = 500;
                    if(err.code === 'ENOENT'){
                        res.end('file not found');
                    }else{
                        res.end('Internal Server error');
                    }
                 });
                /**
                 * A list
                 */
                loadInitializeList(shopFile,(list)=>{
                    if (list.length === 0){
                        res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                        res.statusCode = 200;
                        res.end('The list is empty');
                    }else{
                        let response = 'The Shopping List Items\n'
                        list.forEach((element, index) => {
                            response += `${index+1})${element.text}\n`;
                        });
                        res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                        res.statusCode = 200;
                        res.end(response)
                    }
                });

            }else{
                //invalid route
                res.setHeader('Content-Type','text/plain;charset = "utf-8"');
                res.writeHeader(400);
                res.end('BAD REQUEST');
            }
            break; 
        case 'DELETE':
            if(pathname === '/todo/' || pathname === '/todo'){
                //handle the todolist
                res.end('IN DELETE - todo');
            }else if(pathname === '/shop/' || pathname === '/shop'){
                //handle the shoplist
                res.end('IN DELETE - shop');
            }else{
                //invalid route
                res.end('IN DELETE - invalid');
            }
            break;
        case 'PUT':
            if(pathname === '/todo/' || pathname === '/todo'){
                //handle the todolist
                res.end('IN PUT - todo');
            }else if(pathname === '/shop/' || pathname === '/shop'){
                //handle the shoplist
                res.end('IN PUT - shop');
            }else{
                //invalid route
                res.end('IN PUT - invalid');
            }
            break;   
    }
};

const server = http.createServer(requestHandler);

server.listen(3032,()=>{
    console.log('The server is running on 3032...');
});