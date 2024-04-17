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
            "INSERT INTO boats (B_NAME, TYPE) VALUES (?, ?)",
            [query['B_name'], query['Type']],
            (err, results) => {
                if (err) {
                    console.error('Error inserting boats' + err);
                    callback(err, null);
                }
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
                return callback(err, null); // Use return to exit the function after calling callback
            }
            console.log('Boat updated successfully:', results);
            callback(null, true);
        });
    }

    function deleteBoat(bId, callback) {
        db.query(
            "DELETE FROM boats WHERE B_Id = ?",
            [bId],
            (err, results) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                }
                callback(null, true);
            }
        );
    }

mysqlConnect.end(function(err) {
    if (err) {
        return console.log('Error:' + err.message);
    }
    console.log('Closing connection, bye!')
})