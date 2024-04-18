/*
- Name: Adrian Pena
- Filename: A3-NodeServer.js
- Date: 04/14/2024
- Description: Building a REST API for A CRUD Application using RDBMS
*/

// Import Dependencies
const mysql = require('mysql2');
const fs = require('fs');
const qs = require('qs');
const http = require('http');

// Importing A3 CRUD Operations for the 3 tables
const sailors = require('./A3-SailorsTable.js');
const reserves = require('./A3-ReservesTable.js');
const boats = require('./A3-BoatsTable.js');

// Create connection to mysql database from nodejs code
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sailingadventure_db',
});

// Function to close connection to database after queries
function closeDBConnection() {
    db.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
}

// Creating Request Handler
function handlerResponse(res, err, data) {
    let statusCode = 200;
    let responseData = data;

    if (err) {
        statusCode = 500;
        responseData = { error: 'Internal Server Error' };
    }

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));
}

// Creating the server handler for requests
const serverHandler = (req, res) => {
    const { getBoat, insertBoat, updateBoat, deleteBoat } = require('./A3-BoatsTable.js');
    const { getSailor, insertSailor, updateSailor, deleteSailor } = require('./A3-SailorsTable.js');
    const { getReserve, insertReserve, updateReserve, deleteReserve } = require('./A3-ReservesTable.js');

    const baseURL = 'http://' + req.headers.host + '/';
    const parsedUrl = new URL(req.url, baseURL);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const urlQuery = parsedUrl.searchParams;
    const qs = Object.fromEntries(urlQuery.entries());
    const method = req.method.toUpperCase();

    
    //Creating Methods
    switch (method) {
        //Creating GET Method
        case 'GET':
            if (trimmedPath === 'sailors') {
                getSailor((err, results) => {
                    handlerResponse(res, err, results);
                });
            } else if (trimmedPath === 'boats') {
                getBoat((err, results) => {
                    handlerResponse(res, err, results);
                });
            } else if (trimmedPath === 'reserves') {
                getReserve((err, results) => {
                    handlerResponse(res, err, results);
                });
            } else {
                handlerResponse(res, null, { error: 'Not Found' }, 404);
            }
            break;

        //Creating POST Method
        case 'POST':
            if (trimmedPath === 'sailors') {
                const requestBody = qs; 
                insertSailor(requestBody, (err, results) => {
                    handlerResponse(res, err, results);
                });
            } else if (trimmedPath === 'boats') {
                const requestBody = qs; 
                insertBoat(requestBody, (err, results) => {
                    handlerResponse(res, err, results);
                });
            } else if (trimmedPath === 'reserves') {
                const requestBody = qs; 
                insertReserve(requestBody, (err, results) => {
                    handlerResponse(res, err, results);
                });
            } else {
                handlerResponse(res, { error: 'Invalid Path' }, null);
            }
            break;

        //Creating PUT Method
        case 'PUT':
            // If specified path is sailors
            if (trimmedPath === 'sailors') {
                const { S_ID, S_NAME, B_DATE, RATE } = qs;
                if (!S_ID) {
                    const replyError = { error: 'Missing S_ID parameter' };
                    return handlerResponse(res, replyError, null);
                }
                const updateSailors = { S_NAME, B_DATE, RATE };
                updateSailor(S_ID, updateSailors, (err, results) => {
                    handlerResponse(res, err, results);
                });
            // If specified path is boats
            } else if (trimmedPath === 'boats') {
                const { B_ID, B_NAME, B_TYPE } = qs;
                if (!B_ID) {
                    const replyError = { error: 'Missing B_ID parameter' };
                    return handlerResponse(res, replyError, null);
                }
                const updateBoats = { B_NAME, B_TYPE };
                updateBoat(B_ID, updateBoats, (err, results) => {
                    handlerResponse(res, err, results);
                });
            // If specified path is reserves
            } else if (trimmedPath === 'reserves') {
                const { R_ID, B_ID, S_ID, DAY } = qs;
                if (!R_ID) {
                    const replyError = { error: 'Missing R_ID parameter' };
                    return handlerResponse(res, replyError, null);
                }
                const updateReserves = { B_ID, S_ID, DAY };
                updateReserve(R_ID, updateReserves, (err, results) => {
                    handlerResponse(res, err, results);
                });
            } else {
            // if client inputs any other value, return invalid
                handlerResponse(res, { error: 'Invalid Path' }, null);
            }
            break;


        //Creating DELETE Method
        case 'DELETE':
            // If specified path is sailors
            if (trimmedPath === 'sailors') {
                const { S_ID } = qs;
                if (!S_ID) {
                    const replyError = { error: 'Missing S_ID parameter' };
                    return handlerResponse(res, replyError, null);
                }
                deleteSailor(S_ID, (err, results) => {
                    handlerResponse(res, err, results);
                });
            // If specified path is boats
            } else if (trimmedPath === 'boats') {
                const { B_ID } = qs;
                if (!B_ID) {
                    const replyError = { error: 'Missing B_Id parameter' };
                    return handlerResponse(res, replyError, null);
                }
                deleteBoat(B_ID, (err, results) => {
                    handlerResponse(res, err, results);
                });
            // If specified path is reserves
            } else if (trimmedPath === 'reserves') {
                const { R_ID } = qs;
                if (!R_ID) {
                    const replyError = { error: 'Missing R_Id parameter' };
                    return handlerResponse(res, replyError, null);
                }
                deleteReserve(R_ID, (err, results) => {
                    handlerResponse(res, err, results);
                });
            } else {
            // If client inputs invalid method, return unavailable
                handlerResponse(res, { error: 'Method Unavailable' }, null);
            }
            break;
}
};

// Creating Server for communication
const server = http.createServer(serverHandler);

// Configuring server to listen on port 3000
server.listen(3000,()=>{
    console.log("The server is listening on port 3000");
});

// create connection to MySQL server
db.connect((err) => {
    if (err) {
        console.error('error: cant create connection to mysql server (NodeServer File' + err.message);
        return;
    }

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
            console.log('Sailors table created!');
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
            console.log('Boats table created!');
        }
    });

        // Create Reserves table if not exists
    db.query(`CREATE TABLE IF NOT EXISTS Reserves (
        R_ID INT AUTO_INCREMENT PRIMARY KEY,
        S_ID INT,
        B_ID INT,
        DAY DATE,
        FOREIGN KEY (S_ID) REFERENCES Sailors(S_ID),
        FOREIGN KEY (B_ID) REFERENCES Boats(B_ID),
        UNIQUE KEY (S_ID, B_ID, DAY)
    )`, (err) => {
        if (err) {
            console.error('Error creating Reserves table: ' + err.message);
        } else {
            console.log('Reserves table created!');
        }
    });

});

// Close connection to database once queries completed
server.on('close', () => {
    closeDBConnection();
});