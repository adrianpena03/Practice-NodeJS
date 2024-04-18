/*
- Name: Adrian Pena
- Filename: A3-BoatsTable.js
- Date: 04/14/2024
- Description: CRUD Statements for the Boats table
*/

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'SailingAdventure_DB',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        return console.error('error: Connection to database (BoatsTable file)' + err.message);
    }
    //console.log('Connected to the MySQL server.');

    // Retrieve boat data from DB
    function getBoat(callback) {
        // Executing SQL SELECT query to fetch all data from the Boats table
        db.query("SELECT * FROM boats", (err, results) => {
            if (err) {
                console.error('Error fetching boats:', err);
                return callback(err, null); // Pass error to callback function
            }
            // if fetching is successful, pass results to the callback function
            callback(null, results);
        });
    }

    // Implementing new data to boats table
    function insertBoat(boatData, callback) {
        // Executing SQL INSERT query to add a new row to the Boats table
        // Creates array containing boat name and type from boatData object
        db.query(
            "INSERT INTO boats (B_NAME, B_TYPE) VALUES (?, ?)",
            [boatData.B_NAME, boatData.B_TYPE],
            (err, results) => {
                if (err) {
                    console.error('Error inserting boats: ', err);
                    return callback(err, null); // Pass error to callback
                }
                // If insertion is successful, pass results to the callback function
                callback(null, results);
            }
        );
    }

    // Change current boat data
    function updateBoat(B_ID, updateFields, callback) {
        // Generate each field with a placeholder for value then join fields with commas for SQL syntax
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`)
            .join(", ");

        const values = Object.values(updateFields); // Extract values to update
        values.push(B_ID); // Adding Boat ID to the values array

        const query = `UPDATE boats SET ${setClause} WHERE B_ID = ?`;

        // SQL UPDATE query using the db connection
        db.query(query, values, (err, results) => {
            if (err) {
                // logging error if update fails
                console.error('Error updating boat: ', err);
                return callback(err, null);
            }
            // if update is successful, pass results to the callback function
            callback(null, results);
        });
    }

    // Deleting boat data from database
    function deleteBoat(B_ID, callback) {
        // Executing SQL DELETE query to remove boat based on boat ID
        db.query(
            "DELETE FROM boats WHERE B_ID = ?",
            [B_ID],
            (err, results) => {
                if (err) {
                    console.error('Error deleting boat:', err);
                    return callback(err, null);
                }
                callback(null, results);
            }
        );
    }

    // Export the functions using module.exports
    module.exports = {
        getBoat,
        insertBoat,
        updateBoat,
        deleteBoat
    };
});

