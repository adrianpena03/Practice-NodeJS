const http = require('http');
const {URL} = require('url');
const fs = require('fs');


let file = "menu.json";
let wfile = "welcome.txt";

//helper functions
//Store the menu 
function storeMenu(file, menu) {
    fs.writeFile(file, JSON.stringify(menu), 'utf8', function(err) {
      if (err) throw err;
      console.log('Saved.');
    });
  }
//Load/Initialize menu
function loadOrInitializeMenuArray(file, cb){
  fs.readFile(file, {encoding:'utf-8'}, (err, data)=>{
    if (err){ //file does not exist
        cb([]);
    }
    else{
        var data = data.toString();
        var menu = JSON.parse(data || '[]');
        console.log('load',menu);
        cb(menu);
    }
  });
}

//Handlers
const handlers = {};


handlers.delete = function(file, searchParms, cb){
    loadOrInitializeMenuArray(file, (menu)=>{
        let index = menu.findIndex(item => item.code === searchParms.code);
        if(index === -1){
            console.log('item Not found');
            cb(404, 'Item not found');
        }else{
            menu.splice(index,1);
            console.log('item removed from menu',menu);
            storeMenu(file, menu);
            cb(200, 'OK');
        }
    });   
}
handlers.update = function (file, searchParms, cb){
    loadOrInitializeMenuArray(file, (menu)=>{
        let index = menu.findIndex(item => item.code === searchParms.code);
        if(index === -1){
            console.log('item Not found');
            cb(404, 'Item not found');

        }else{
            const keys  = Object.keys(searchParms); //get the keys in the qs object
            if (keys.indexOf("ingredient")!== -1){
                menu[index].ingredient = searchParms.ingredient;
            }
            if (keys.indexOf("price")!== -1){
                menu[index].price = searchParms.price;;
            }
            if (keys.indexOf("avail")!== -1){
                menu[index].avail = searchParms.avail;
            }
            storeList(file,list);
            cb(200,'OK');
        }
    });
}


handlers.add = function(file, searchParms, cb){
    loadOrInitializeMenuArray(file, (menu)=>{
        if (!menu.some(it=>it.code === searchParms.code )){
             menu.push(searchParms);
             console.log('New item saved to file',menu);
             storeMenu(file, menu);
             cb(200, 'OK');
        }else{
            console.log('Item already exists');
            cb(200, 'OK');
        }
    });

}

handlers.request = function (req, res){
    const baseURL = 'http://'+ req.headers.host + '/'; 
    //get the untrimed pathname from the url
    //Get the query string as an object
    const {pathname,searchParms} = new URL(req.url, baseURL); 

    //Get the HTTP method
    const method = req.method.toUpperCase();

    //Route based on the request method
    switch (method){
        case 'GET': if(pathname === '/menu' || pathname === '/menu/' ){
                        res.setHeader('content-type','application/json');
                        res.writeHead(200);
                        let stream = fs.createReadStream(file);
                        stream.pipe(res);
                        stream.on('error', function(err){
                            if (err.code === 'ENOENT'){
                                res.end('Not Found');
                            }else{
                                res.end('Internal Server Error');
                            }
                        });
                    }else { //Return the Welcome String
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHead(200);
                        let stream = fs.createReadStream(wfile);
                        stream.pipe(res);
                    stream.on('error', function(err){
                        if (err.code === 'ENOENT'){
                            res.end('Not Found');
                        }else{
                            res.end('Internal Server Error');
                        }
                      });
                    }
                break;

        case 'POST': if(pathname === '/menu' || pathname === '/menu/' ){
                        handlers.add(file,searchParms,(statusCode,resStr)=>{
                            res.setHeader('content-type','text/plain; charset="utf-8"');
                            res.writeHead(statusCode);
                            res.end(resStr);
                        });  
                    }else{
                        res.writeHead(400);
                        resStr = 'BAD REQUEST\n';
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.end(resStr);
                    }
                break;

        case'DELETE': if(pathname === '/menu' || pathname === '/menu/' ){
                        handlers.delete(file, searchParms, (statusCode,resStr)=>{
                            res.setHeader('content-type','text/plain; charset="utf-8"');
                            res.writeHead(statusCode);
                            res.end(resStr);
                        });
                    }else{
                        res.writeHead(400);
                        resStr = 'BAD REQUEST\n';
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.end(resStr);
                    }
                break;
        case 'PUT': if(pathname === '/menu' || pathname === '/menu/' ){
                        handlers.update(file, searchParms,(statusCode,resStr)=>{
                            res.setHeader('content-type','text/plain; charset="utf-8"');
                            res.writeHead(statusCode);
                            res.end(resStr);
                        });
                    }else{
                        res.writeHead(400);
                        resStr = 'BAD REQUEST\n';
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.end(resStr);
                    }
                break;
    }
}

const server = http.createServer(handlers.request);
server.listen(3030, function(){
    console.log('Server running on port 3030 ....');
});

