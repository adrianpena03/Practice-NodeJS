/*
Name: Adrian Pena
Date: 04/16/2024
Title: 
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
        db.query("SELECT s_id, S_name, B_date, Rate FROM Sailors", (err, results) => {
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
            "INSERT INTO Sailors (S_name, B_date, Rate) VALUES (?, ?)",
            [SailorData.S_Name, SailorData.B_date, SailorData.Rate],
            (err, results) => {
                if (err) {
                    console.error('Error inserting Sailors:', err);
                    return callback(err, null);
                }
                console.log('results are: '+ results);
                callback(null, true);
            }
        );
    }

    // Change current Sailor data
    function updateSailor(s_id, updateFields, callback) {
        const setClause = Object.keys(updateFields)
            .map((field) => `${field} = ?`)
            .join(", ");

        const values = Object.values(updateFields);
        values.push(s_id);

        const query = `UPDATE Sailors SET ${setClause} WHERE s_id = ?`;

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error updating Sailor:', err);
                return callback(err, null);
            }
            console.log('Sailor updated successfully:', results);
            callback(null, true);
        });
    }

    // Deleting Sailor data from database
    function deleteSailor(s_id, callback) {
        db.query(
            "DELETE FROM Sailors WHERE s_id = ?",
            [s_id],
            (err, results) => {
                if (err) {
                    console.error('Error deleting Sailor:', err);
                    return callback(err, null);
                }
                callback(null, true);
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
