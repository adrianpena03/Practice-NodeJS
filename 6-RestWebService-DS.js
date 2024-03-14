const fs = require('fs');
const http = require('http');
const {URL} = require('url');

// Function to load and initialize the list
function loadInitializeList(fileName, callback) {
    fs.readFile(fileName, { encoding: 'utf-8' }, (err, jsonList) => {
        if (err) {
            // If the file does not exist, pass an empty list to the callback
            callback([]);
        } else {
            // Parse the JSON list and pass it to the callback
            callback(JSON.parse(jsonList));
        }
    });
}

// Function to store the list back to the file
function storeList(fileName, list) {
    fs.writeFile(fileName, JSON.stringify(list), (err) => {
        if (err) {
            console.log('Error writing the file.');
        } else {
            console.log('File saved successfully');
        }
    });
}

// Main script
const dataFile = 'data.json';

// Check if command line arguments are provided
if (process.argv.length > 2) {
    // If command line arguments are provided, use them as the list
    const list = process.argv.slice(2).map(Number); // Convert command line arguments to numbers
    console.log('Original list:', list);
    const updatedList = list.map(num => num * 2); // Double each number in the list
    console.log('Updated list:', updatedList);
    storeList(dataFile, updatedList); // Save the updated list back to the file
} else {
    // If no command line arguments are provided, load the list from the file
    loadInitializeList(dataFile, (list) => {
        console.log('Original list:', list);
        const updatedList = list.map(num => num * 2); // Double each number in the list
        console.log('Updated list:', updatedList);
        storeList(dataFile, updatedList); // Save the updated list back to the file
    });
}

