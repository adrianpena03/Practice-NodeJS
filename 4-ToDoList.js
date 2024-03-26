//Add dependencies
const http = require('http');
const url = require('url');
var list = [];
const reqHandler = (req,res)=>{
switch(req.method){
    case 'POST': 
        let item = '';
        //set the encoding to store the items in the list as strings
        req.setEncoding('utf8');
        //read the data arriving at the server
        req.on('data',(chunk)=>{
            item += chunk;
        });
        //add the item to the list and send response
        req.on('end',()=>{
            list.push(item);
            res.end('Item added to list\n');
        });
    break;
    case 'GET':
        //check if the list is empty
        if (list.length === 0){
            res.end( "Your list is empty. Well Done!!");
        }else{
            let response = '';
            //create the response using forEach
            // list.forEach((element, index)=>{
            //index+1 to make the numbering of the list in the response start at 1 rather than 0
            //     response += `${index+1}) ${element}\n`;
            // });
            //create the response using map and join
            response = list.map((element, index)=>{
                //index+1 to make the numbering of the list in the response start at 1 rather than 0
                    return `${index+1}) ${element}`;
            }).join('\n');
            res.end(response);
        }
        break;

    case 'DELETE': 
        // get the pathname from the url
        let urlPath = url.parse(req.url, true).pathname;
        //get the number sent in the pathname
        let index = urlPath.slice(1);
        //check if it is a number
        if (isNaN(index)){
            res.end( "Invalid index\n");
        }else{
            //Convert it to a number
            let i = parseInt(index,10);
            //decrease the index since the list on the client side starts from 1
            i--;
            if (list.length <= i){
                res.end('Index dose not exist in list\n');
            }else{
                list.splice(i,1);
                res.end( 'Item removed from list');
            }
        }
        break;
    case 'PUT':
        let putPath = url.parse(req.url, true).pathname;
        let putIndex = putPath.slice(1);
        if (isNaN(putIndex)){
            res.end( "Invalid index\n");
        }else{
            let i = parseInt(putIndex);
            i--;
            if (list.length <= i){
                res.end('Index dose not exist in list\n');
            }else{
                let newitem = '';
                req.setEncoding('utf8');
                req.on('data',(chunk)=>{
                    newitem += chunk
                });
                req.on('end',()=>{
                    list.splice(i,1,newitem);
                    res.end('Item updated\n'); 
                });
            }
        }
    break;

}
}

const server = http.createServer(reqHandler);
server.listen(8080, ()=>{
    console.log('server is running on port 8080...');
});