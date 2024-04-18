/*
- Name: Adrian Pena
- Filename: A3-SailorsTable.js
- Date: 04/14/2024
- Description: CRUD Statements for the Sailors table
*/

// Import required mysql dependency
const mysql = require('mysql2');

// Create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'SailingAdventure_DB',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        return console.error('error: Connection to database (SailorsTable file)' + err.message);
    }
    console.log('Connected to the MySQL server.');

    // Retrieve Sailor data from DB
    function getSailor(callback) {
        // Query the Sailors table to retrieve its values
        db.query("SELECT S_ID, S_NAME, B_DATE, RATE FROM Sailors", (err, results) => {
            if (err) {
                // if error, return error message to client
                console.error('Error fetching Sailors:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Implementing new data to Sailors table
    function insertSailor(SailorData, callback) {
        db.query(
            // Insert query for Sailors table below using placeholder values
            "INSERT INTO Sailors (S_NAME, B_DATE, RATE) VALUES (?, ?, ?)",
            [SailorData.S_NAME, SailorData.B_DATE, SailorData.RATE],
            (err, results) => {
                if (err) {
                    // If error, return error message
                    console.error('Error inserting Sailor:', err);
                    return callback(err, null);
                }
                callback(null, results);
            }
        );
    }

    // Change current Sailor data
    function updateSailor(S_ID, updateFields, callback) {
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`) // Generate each field with a placeholder for value
            .join(", "); // Join the fields with commas for SQL syntax

        const values = Object.values(updateFields);
        values.push(S_ID); // Add S_ID to the values array

        // Create SQL UPDATE query with placeholders
        const query = `UPDATE Sailors SET ${setClause} WHERE S_ID = ?`;

        db.query(query, values, (err, results) => {
            // Log error if query fails OR pass result to callback functions if doesn't fail
            if (err) {
                console.error('Error updating Sailor:', err);
                return callback(err, null);
            }
            // If query is successful, pass results to the callback function
            callback(null, results);
        });
    }

    // Deleting Sailor data from database
    function deleteSailor(S_ID, callback) {
        // Create the SQL DELETE to remove Sailor based on S_ID (Sailor ID)
        db.query(
            "DELETE FROM Sailors WHERE S_ID = ?",
            [S_ID],
            (err, results) => { // Callback function to handle query results or errors
                if (err) {
                    console.error('Error deleting Sailor:', err);
                    return callback(err, null);
                }
                // If deletion is completed, pass results to callback function
                callback(null, results);
            }
        );
    }

    // Export the functions using module.exports
    module.exports = {
        getSailor,
        insertSailor,
        updateSailor,
        deleteSailor
    };

});