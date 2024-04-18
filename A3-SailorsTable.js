/*
Name: Adrian Pena
Date: 04/16/2024
Title: Assignment 3
Desciption: 
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
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');

    // Retrieve Sailor data from DB
    function getSailor(callback) {
        db.query("SELECT S_ID, S_NAME, B_DATE, RATE FROM Sailors", (err, results) => {
            if (err) {
                console.error('Error fetching Sailors:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Implementing new data to Sailors table
    function insertSailor(SailorData, callback) {
        db.query(
            "INSERT INTO Sailors (S_NAME, B_DATE, RATE) VALUES (?, ?)",
            [SailorData.S_NAME, SailorData.B_DATE, SailorData.RATE],
            (err, results) => {
                if (err) {
                    console.error('Error inserting Sailors:', err);
                    return callback(err, null);
                }
                callback(null, results);
            }
        );
    }

    // Change current Sailor data
    function updateSailor(S_ID, updateFields, callback) {
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`)
            .join(", ");

        const values = Object.values(updateFields);
        values.push(S_ID);

        const query = `UPDATE Sailors SET ${setClause} WHERE S_ID = ?`;

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error updating Sailor:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Deleting Sailor data from database
    function deleteSailor(S_ID, callback) {
        db.query(
            "DELETE FROM Sailors WHERE S_ID = ?",
            [S_ID],
            (err, results) => {
                if (err) {
                    console.error('Error deleting Sailor:', err);
                    return callback(err, null);
                }
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

// Close the database connection when all operations are done
db.end((err) => {
    if (err) {
        return console.log('Error closing connection:', err.message);
    }
    console.log('Connection closed.');
});
