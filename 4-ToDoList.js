const http = require('http');

var list = []; // the to do list

const reqHandler = (req, res) => {
    switch(req.method){
        case 'POST':
            let item = ''
            req.setEncoding('utf-8');
            req.on('data', (chunk) => {
                item += chunk
            });

            req.on('end', () => {
                list.push(item);
                console.log(list);
                res.end('OK\n');
            });

        case 'DELETE':
            res.end('In DELETE');
            break;

        case 'PUT':
            res.end('In PUT');
            break;
    }
}

const server = http.createServer(reqHandler);

server.listen(3000, ()=>{
    console.log('Server is listening on port 3000')
})

