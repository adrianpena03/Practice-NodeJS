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
            console.error('Error closing database connection:', err.message); // if error, send error to console
        } else {
            console.log('Database connection closed.'); // Successful database connection
        }
    });
}

// Creating Request Handler
function handlerResponse(res, err, data) {
    let statusCode = 200; // Default status code for successful reesponse
    let responseData = data; // Default response data

    if (err) { // check if error, if there is, status code set to 500
        statusCode = 500;
        responseData = { error: 'Internal Server Error' };
    }

    // Set HTTP headers for the response
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    
    // Send response as JSON string
    res.end(JSON.stringify(responseData));
}

// Creating the server handler for requests
const serverHandler = (req, res) => {
    // Importing functions to handle database operations for boats, sailors, and reserves
    const { getBoat, insertBoat, updateBoat, deleteBoat } = require('./A3-BoatsTable.js');
    const { getSailor, insertSailor, updateSailor, deleteSailor } = require('./A3-SailorsTable.js');
    const { getReserve, insertReserve, updateReserve, deleteReserve } = require('./A3-ReservesTable.js');

    const baseURL = 'http://' + req.headers.host + '/'; // Create baseURL and parsing the request URL
    const parsedUrl = new URL(req.url, baseURL);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // Removing leading and trailing misc. characters
    const urlQuery = parsedUrl.searchParams;
    const qs = Object.fromEntries(urlQuery.entries()); // Convert query string parameters to object
    const method = req.method.toUpperCase(); // Getting HTTP request method (GET, POST, PUT, DELETE)

    
    // Creating Methods to handle different HTTP request methods
    switch (method) {
        // Handling GET Requests
        case 'GET':
            // Depending on URL path, this calls the appropriate database function and handles response
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
                handlerResponse(res, null, { error: 'Not Found' }, 404); // Return 'Not Found' error for invalid path
            }
            break;

        // Handling POST Requests
        case 'POST':
            // Depending on URL path, extract request body and call appropriate database function
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
                handlerResponse(res, { error: 'Invalid Path' }, null); // Return 'Invalid Path' error for unknown paths
            }
            break;

        // Handling PUT Requests
        case 'PUT':
            // Depending on URL path, extract request body and call appropriate function
            if (trimmedPath === 'sailors') {

                // Extract parameters from request query string
                const { S_ID, S_NAME, B_DATE, RATE } = qs;

                // Check if Sailor ID (S_ID) is missing
                if (!S_ID) {
                    const replyError = { error: 'Missing S_ID parameter' }; // Create error response object for missing Sailor ID parameter
                    return handlerResponse(res, replyError, null); // Sends error response back to client
                }

                // Create an object with updated Sailor data
                const updateSailors = { S_NAME, B_DATE, RATE };

                // Updating sailor data in the database based on Sailor ID
                updateSailor(S_ID, updateSailors, (err, results) => {
                    handlerResponse(res, err, results); //  Send response back to client
                });

            // If specified path is boats
            } else if (trimmedPath === 'boats') {

                // Extract parameteres and update Boat data
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

                // Extract parameters from request query string
                const { R_ID, B_ID, S_ID, DAY } = qs;

                // check if R_ID is missing
                if (!R_ID) {
                    const replyError = { error: 'Missing R_ID parameter' }; // Create error response object for missing R_ID parameter
                    return handlerResponse(res, replyError, null); // Sends error response back to client
                }

                // Creating an object with updated Reserve data
                const updateReserves = { B_ID, S_ID, DAY };

                // Updating Reserve data in databse based on R_ID
                updateReserve(R_ID, updateReserves, (err, results) => {
                    handlerResponse(res, err, results); // Send response back to client
                });

            } else {
                handlerResponse(res, { error: 'Invalid Path' }, null); // Return 'Invalid Path' error for unknown paths
            }
            break;


        // Handling DELETE Requests
        case 'DELETE':
            // Depending on the URL path and query parameters, call the appropriate database delete function
            if (trimmedPath === 'sailors') {

                // Extract Sailor ID (S_ID) from request query string
                const { S_ID } = qs;

                // Checking if Sailor ID is missing
                if (!S_ID) {
                    const replyError = { error: 'Missing S_ID parameter' }; // Create an error response if missing S_ID parameter
                    return handlerResponse(res, replyError, null); // Sends error response to client
                }
                deleteSailor(S_ID, (err, results) => {
                    handlerResponse(res, err, results);
                });

            // If specified path is boats
            } else if (trimmedPath === 'boats') {

                // Extract Boat ID (B_ID) from request query string
                const { B_ID } = qs;

                // Checking if Boat ID is missing
                if (!B_ID) {
                    const replyError = { error: 'Missing B_Id parameter' }; // Create error response object for missing B_ID parameter
                    return handlerResponse(res, replyError, null); // Sends error response back to client
                }
                deleteBoat(B_ID, (err, results) => {
                    handlerResponse(res, err, results);
                });

            // If specified path is reserves
            } else if (trimmedPath === 'reserves') {

                // Extract Reserve ID (R_ID) from request query string
                const { R_ID } = qs;

                 // Checking if Reserve ID is missing
                if (!R_ID) {
                    const replyError = { error: 'Missing R_ID parameter' }; // Create error response object for missing R_ID parameter
                    return handlerResponse(res, replyError, null); // Sends error response back to client
                }

                // Delete reservation based on provided R_ID. Then  send response back to client
                deleteReserve(R_ID, (err, results) => {
                    handlerResponse(res, err, results);
                });

            } else {
            // If client inputs invalid method, return unavailable
                handlerResponse(res, { error: 'Method Unavailable' }, null); // Return 'Method Unavailable' error for unknown methods
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

// create connection to MySQL server, log error if error
db.connect((err) => {
    if (err) {
        console.error('error: cant create connection to mysql server (NodeServer File' + err.message);
        return;
    }

    // Create Sailors table if not exists with appropriate attributes
    db.query(`CREATE TABLE IF NOT EXISTS Sailors (
        S_ID INT AUTO_INCREMENT PRIMARY KEY,
        S_NAME VARCHAR(25),
        B_DATE DATE,
        RATE INT
    )`, (err) => {
        if (err) {
            console.error('Error creating Sailors table: ' + err.message); // Log error if error
        } else {
            console.log('Sailors table created!'); // Successful table creation
        }
    });

    // Create Boats table if not exists with appropriate attributes
    db.query(`CREATE TABLE IF NOT EXISTS Boats (
        B_ID INT AUTO_INCREMENT PRIMARY KEY,
        B_NAME VARCHAR(25),
        B_TYPE VARCHAR(25)
    )`, (err) => {
        if (err) {
            console.error('Error creating Boats table: ' + err.message); // Log error if error
        } else {
            console.log('Boats table created!'); // Successful table creation
        }
    });

        // Create Reserves table if not exists with appropriate attributes
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
            console.error('Error creating Reserves table: ' + err.message); // Log error if error
        } else {
            console.log('Reserves table created!'); // Successful table creation
        }
    });

});

// Close connection to database once queries completed
server.on('close', () => {
    closeDBConnection();
});