// A3 Created by Adrian Pena

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

    // Retrieve boat data from DB
    function getBoat(callback) {
        db.query("SELECT * FROM boats", (err, results) => {
            if (err) {
                console.error('Error fetching boats:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Implementing new data to boats table
    function insertBoat(boatData, callback) {
        db.query(
            "INSERT INTO boats (B_NAME, B_TYPE) VALUES (?, ?)",
            [boatData.B_NAME, boatData.TYPE],
            (err, results) => {
                if (err) {
                    console.error('Error inserting boats: ', err);
                    return callback(err, null);
                }
                callback(null, results);
            }
        );
    }

    // Change current boat data
    function updateBoat(B_ID, updateFields, callback) {
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`)
            .join(", ");

        const values = Object.values(updateFields);
        values.push(B_ID);

        const query = `UPDATE boats SET ${setClause} WHERE B_ID = ?`;

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error updating boat: ', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Deleting boat data from database
    function deleteBoat(B_ID, callback) {
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

// Close the database connection when all operations are done
db.end((err) => {
    if (err) {
        return console.log('Error closing connection:', err.message);
    }
    console.log('Connection closed.');
});
