/*
- Name: Adrian Pena
- Filename: A3-ReservesTable.js
- Date: 04/14/2024
- Description: CRUD Statements for the Reserves table
*/

// Import mysql dependency
const mysql = require('mysql2');

// Create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sailingadventure_db',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        return console.error('error: Connection to database error (ReservesTable file)' + err.message);
    }

    // Retrieve reserve data from DB
    function getReserve(callback) {
        // Query the Reserves table to retrieve data
        db.query("SELECT * FROM Reserves", (err, results) => {
            if (err) {
                // if error, return error message to client
                console.error('Error fetching reserves:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Implementing new data to reserves table
    function insertReserve(reserveData, callback) {
        db.query(
            "INSERT INTO Reserves (S_ID, B_ID, DAY) VALUES (?, ?, ?)",
            [reserveData.S_ID, reserveData.B_ID, reserveData.DAY],
            (err, results) => {
            // If error inserting values, return error
                if (err) {
                    console.error('Error inserting reserves:', err);
                    return callback(err, null);
                }
                callback(null, results);
            }
        );
    }

    // Change current reserve data
    function updateReserve(S_ID, updateFields, callback) {
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`)
            .join(", ");

        const values = Object.values(updateFields);
        values.push(S_ID);

        // the update (PUT) query
        const query = `UPDATE Reserves SET ${setClause} WHERE S_ID = ?`;

        db.query(query, values, (err, results) => {
            if (err) {
            // if error, return error message
                console.error('Error updating reserve:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Deleting reserve data from database
    function deleteReserve(S_ID, callback) {
        db.query(
            // Delete the S_ID of reserves query to delete whole row
            "DELETE FROM Reserves WHERE S_ID = ?",
            [S_ID],
            (err, results) => {
                if (err) {
                    console.error('Error deleting reserve:', err);
                    return callback(err, null);
                }
                callback(null, results);
            }
        );
    }

    // Export the functions using module.exports
    module.exports = {
        getReserve,
        insertReserve,
        updateReserve,
        deleteReserve
    };
});