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
    function getBoats(callback) {
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
                    console.error('Error inserting boats:', err);
                    return callback(err, null);
                }
                console.log('results are: '+ results);
                callback(null, true);
            }
        );
    }

    // Change current boat data
    function updateBoat(bid, updateFields, callback) {
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`)
            .join(", ");

        const values = Object.values(updateFields);
        values.push(bid);

        const query = `UPDATE boats SET ${setClause} WHERE B_Id = ?`;

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error updating boat:', err);
                return callback(err, null);
            }
            console.log('Boat updated successfully:', results);
            callback(null, true);
        });
    }

    // Deleting boat data from database
    function deleteBoat(bId, callback) {
        db.query(
            "DELETE FROM boats WHERE B_Id = ?",
            [bId],
            (err, results) => {
                if (err) {
                    console.error('Error deleting boat:', err);
                    return callback(err, null);
                }
                callback(null, true);
            }
        );
    }

    // Export the functions using module.exports
    module.exports = {
        getBoats,
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
