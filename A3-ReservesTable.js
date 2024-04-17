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

    // Retrieve reserve data from DB
    function getReserve(callback) {
        db.query("SELECT * FROM reserves", (err, results) => {
            if (err) {
                console.error('Error fetching reserves:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Implementing new data to reserves table
    function insertReserve(reserveData, callback) {
        db.query(
            "INSERT INTO reserves (b_id, Day) VALUES (?, ?)",
            [reserveData.B_NAME, reserveData.TYPE],
            (err, results) => {
                if (err) {
                    console.error('Error inserting reserves:', err);
                    return callback(err, null);
                }
                console.log('results are: '+ results);
                callback(null, true);
            }
        );
    }

    // Change current reserve data
    function updateReserve(s_id, updateFields, callback) {
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`)
            .join(", ");

        const values = Object.values(updateFields);
        values.push(s_id);

        const query = `UPDATE reserves SET ${setClause} WHERE s_id = ?`;

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error updating reserve:', err);
                return callback(err, null);
            }
            console.log('reserve updated successfully:', results);
            callback(null, true);
        });
    }

    // Deleting reserve data from database
    function deleteReserve(s_id, callback) {
        db.query(
            "DELETE FROM reserves WHERE s_id = ?",
            [s_id],
            (err, results) => {
                if (err) {
                    console.error('Error deleting reserve:', err);
                    return callback(err, null);
                }
                callback(null, true);
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

// Close the database connection when all operations are done
db.end((err) => {
    if (err) {
        return console.log('Error closing connection:', err.message);
    }
    console.log('Connection closed.');
});
