var url = 'http://mylogger/io/log'

function log(word) {
    // Send an HTTP request
    console.log('This is a ' + word)
}

module.exports = log; // adds method called 'log' to exports object, setting it to log function
// module.exports.endPoint = url; // 'endPoint' can be named anything

// -------------------------------------------------------

