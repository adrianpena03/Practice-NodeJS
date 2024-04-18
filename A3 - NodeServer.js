// Import Dependencies
const mysql = require('mysql2');
const fs = require('fs');
const qs = require('qs');

// Importing A3 CRUD Operations for the 3 tables
const sailors = require('./A3-SailorsTable.js');
const reserves = require('./A3-ReservesTable.js');
const boats = require('./A3-BoatsTable.js');

// Create connection to mysql database from nodejs code
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'SailingAdventure_DB',
});

// Adding handler response
function handleresponse(res, err, results) {
    if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error...' }));
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    }
}

// Creating the server handler for requests
const serverHandler = (req, res) => {
    const baseURL = 'http://' + req.headers.host + '/';
    const parsedUrl = new URL(req.url, baseURL);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const urlQuery = parsedUrl.searchParams;
    const queryString = Object.fromEntries(urlQuery.entries());
    const method = req.method.toUpperCase();

    switch (method) {
        // In case client sends GET method
        case 'GET':
            switch (trimmedPath) {
                case 'sailors':
                    sailors.get((err, results) => {
                        handleresponse(res, err, results);
                    });
                    break;
                case 'boats':
                    boats.get((err, results) => {
                        handleresponse(res, err, results);
                    });
                    break;
                case 'reserves':
                    reserves.get((err, results) => {
                        handleresponse(res, err, results);
                    });
                    break;
                default:
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid endpoint for GET method' }));
                    break;
            }
            break;
        // In case the client sends a POST method
        case 'POST':
            let requestBody;
            switch (trimmedPath) {
                case 'sailors':
                    requestBody = qs.parse(req.body);
                    sailors.create(requestBody, (err, results) => {
                        handleresponse(res, err, results);
                    });
                    break;
                case 'boats':
                    requestBody = qs.parse(req.body);
                    boats.create(requestBody, (err, results) => {
                        handleresponse(res, err, results);
                    });
                    break;
                case 'reserves':
                    requestBody = qs.parse(req.body);
                    reserves.create(requestBody, (err, results) => {
                        handleresponse(res, err, results);
                    });
                    break;
                default:
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid endpoint for POST method' }));
                    break;
            }
            break;
        // In case the client sends a PUT method
        case 'PUT':
            let { S_ID, S_NAME, B_DATE, RATE, B_ID, B_NAME, TYPE } = qs.parse(req.body);
            if (trimmedPath === 'sailors') {
                if (!S_ID) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing S_ID parameter' }));
                    break;
                }
                const UpdateSailor = { S_NAME, B_DATE, RATE };
                sailors.update(S_ID, UpdateSailor, (err, results) => {
                    handleresponse(res, err, results);
                });
            } else if (trimmedPath === 'boats') {
                if (!B_ID) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing B_ID parameter' }));
                    break;
                }
                const UpdateBoat = { B_NAME, TYPE };
                boats.update(B_ID, UpdateBoat, (err, results) => {
                    handleresponse(res, err, results);
                });
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid endpoint for PUT method' }));
            }
            break;
        // In case the client sends a DELETE method
        case 'DELETE':
            let idToDelete;
            if (trimmedPath === 'sailors') {
                idToDelete = qs.parse(req.body).S_ID;
                if (!idToDelete) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing S_ID parameter' }));
                    break;
                }
                sailors.delete(idToDelete, (err, results) => {
                    handleresponse(res, err, results);
                });
            } else if (trimmedPath === 'boats') {
                idToDelete = qs.parse(req.body).B_ID;
                if (!idToDelete) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing B_ID parameter' }));
                    break;
                }
                boats.delete(idToDelete, (err, results) => {
                    handleresponse(res, err, results);
                });
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid endpoint for DELETE method' }));
            }
            break;
        // In case the client sends a method that is not any of the described above
        default:
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            break;
    }
};

// create connection to MySQL server
db.connect((err) => {
    if (err) {
        console.error('error: ' + err.message);
        return;
    }
    console.log('Connected to the MySQL server.');

    // Create Sailors table if not exists
    db.query(`CREATE TABLE IF NOT EXISTS Sailors (
        S_ID INT AUTO_INCREMENT PRIMARY KEY,
        S_NAME VARCHAR(25),
        B_DATE DATE,
        RATE INT
    )`, (err) => {
        if (err) {
            console.error('Error creating Sailors table: ' + err.message);
        } else {
            console.log('Sailors table created or already exists.');
        }
    });

    // Create Boats table if not exists
    db.query(`CREATE TABLE IF NOT EXISTS Boats (
        B_ID INT AUTO_INCREMENT PRIMARY KEY,
        B_NAME VARCHAR(25),
        B_TYPE VARCHAR(25)
    )`, (err) => {
        if (err) {
            console.error('Error creating Boats table: ' + err.message);
        } else {
            console.log('Boats table created or already exists.');
        }
    });

    // Create Reserves table if not exists
    db.query(`CREATE TABLE IF NOT EXISTS Reserves (
        S_ID INT,
        B_ID INT,
        DAY DATE,
        FOREIGN KEY (S_ID) REFERENCES Sailors(S_ID),
        FOREIGN KEY (B_ID) REFERENCES Boats(B_ID),
        PRIMARY KEY (S_ID, B_ID, DAY)
    )`, (err) => {
        if (err) {
            console.error('Error creating Reserves table: ' + err.message);
        } else {
            console.log('Reserves table created or already exists.');
        }
    });
});

module.exports = serverHandler;
