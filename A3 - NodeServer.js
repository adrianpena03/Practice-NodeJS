// Import Dependencies
const mysql = require('mysql2');
const fs = require('fs');

// Importing A3 CRUD Operations
const sailors = require('./A3-SailorsTable.js');
const reserves = require('./A3-ReservesTable.js');
const boats = require('./A3-BoatsTable.js');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'SailingAdventure_DB',
});


// Creating the request handler
function requestHandler(res, err, data) {
    let statusCode = 200;
    let responseData = data;

    if (err) {
        statusCode = 500;
        responseData = { error: 'There was an internal server error' };
    }

    res.writeHead(statusCode, { 'Type of response content': 'application/json' });
    res.end(JSON.stringify(responseData));
}

// Creating the server handler
const serverHandler = (req, res) => {
    // Construct the base URL and parse the request URL
    const baseURL = 'http://' + req.headers.host + '/';
    const parsedUrl = new URL(req.url, baseURL);

    // Extract the path and trim any leading or trailing slashes
    const path = parsedUrl.pathname;
    const shorterPath = path.replace(/^\/+|\/+$/g, '');

    // Extract query string parameters
    const urlQuery = parsedUrl.searchParams;
    const queryString = Object.fromEntries(urlQuery.entries());

    // Convert method to uppercase for consistency
    const method = req.method.toUpperCase();

// CRUD Statements

}

// Connect to the database
db.connect((err) => {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');

    // Create Sailors table if not exists
    db.query(`CREATE TABLE IF NOT EXISTS Sailors (
        S_ID INT AUTO_INCREMENT PRIMARY KEY,
        S_name VARCHAR(255),
        B_Date DATE,
        Rate INT
    )`, (err) => {
        if (err) {
            console.error('Error creating Sailors table: ' + err.message);
        } else {
            console.log('Sailors table created or already exists.');
        }
    });

    // Create Boats table if not exists
    db.query(`CREATE TABLE IF NOT EXISTS Boats (
        B_id INT AUTO_INCREMENT PRIMARY KEY,
        B_name VARCHAR(255),
        B_type VARCHAR(255)
    )`, (err) => {
        if (err) {
            console.error('Error creating Boats table: ' + err.message);
        } else {
            console.log('Boats table created or already exists.');
        }
    });

    // Create Reserves table if not exists
    db.query(`CREATE TABLE IF NOT EXISTS Reserves (
        S_id INT,
        B_id INT,
        day DATE,
        FOREIGN KEY (S_id) REFERENCES Sailors(S_ID),
        FOREIGN KEY (B_id) REFERENCES Boats(B_id),
        PRIMARY KEY (S_id, B_id, day)
    )`, (err) => {
        if (err) {
            console.error('Error creating Reserves table: ' + err.message);
        } else {
            console.log('Reserves table created or already exists.');
        }
    });

    // Add a new sailor
    const addSailorQuery = 'INSERT INTO Sailors (S_name, B_Date, Rate) VALUES (?, ?, ?)';
    const sailorValues = ['John Doe', '1980-05-01', 100];
    db.query(addSailorQuery, sailorValues, (err, result) => {
        if (err) {
            console.error('Error adding sailor: ' + err.message);
        } else {
            console.log('Sailor added with ID:', result.insertId);
        }
    });

    // Update sailor's rate
    const updateSailorQuery = 'UPDATE Sailors SET Rate = ? WHERE S_ID = ?';
    const updatedRate = 120;
    const sailorIdToUpdate = 1;
    db.query(updateSailorQuery, [updatedRate, sailorIdToUpdate], (err, result) => {
        if (err) {
            console.error('Error updating sailor: ' + err.message);
        } else {
            console.log('Sailor updated successfully.');
        }
    });

    // Delete a boat
    const deleteBoatQuery = 'DELETE FROM Boats WHERE B_id = ?';
    const boatIdToDelete = 1;
    db.query(deleteBoatQuery, [boatIdToDelete], (err, result) => {
        if (err) {
            console.error('Error deleting boat: ' + err.message);
        } else {
            console.log('Boat deleted successfully.');
        }
    });

    // Fetch all sailors
    db.query('SELECT * FROM Sailors', (err, sailors) => {
        if (err) {
            console.error('Error fetching sailors: ' + err.message);
        } else {
            console.log('Sailors table:');
            console.table(sailors);
        }
    });

    // Fetch all boats
    db.query('SELECT * FROM Boats', (err, boats) => {
        if (err) {
            console.error('Error fetching boats: ' + err.message);
        } else {
            console.log('Boats table:');
            console.table(boats);
        }
    });

    // Fetch reservations with sailor and boat names
    db.query(`SELECT Reserves.S_id, Sailors.S_name, Reserves.B_id, Boats.B_name, Reserves.day 
        FROM Reserves 
        INNER JOIN Sailors ON Reserves.S_id = Sailors.S_ID 
        INNER JOIN Boats ON Reserves.B_id = Boats.B_id`, (err, reservations) => {
        if (err) {
            console.error('Error fetching reservations: ' + err.message);
        } else {
            console.log('Reservations table with sailor and boat names:');
            console.table(reservations);
        }
    });
});
