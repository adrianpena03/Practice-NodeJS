// Q2. File system
// Q3. REST Server  (fill in blank coding and coding)
// Q4. SQL and Stored Procedures (fill in blank coding and stored procedure question?)

/* 

Lb3-Ex2

Write a Node.js script that accepts two command line arguments:
 a file name and a string of text. The script will
 perform the following actions:

 1. Ensure correct invocation of the program before executing any further actions.
 2. Using readFile(), checks if the specified file exists or not.
 3. If the file does not exist, the script will create it and write to it
    from the command line argument and prints to the screen "File Created"
 4. If the file exists, the script will append the string from the command line
    argument to the file and prints the new content of the file to the screen.

*/

/* 

Lb3-Ex3

Write a Node.js script that reads from the command line a folder name.
The script will perform the following actions.

1. Ensure correct invocation.
2. Using readdir(), checks if the specified folder exists or not.
3. If the folder does not exist, the script will create the folder
   in the current working directory and print to the screen "folder created"
4. If exists, the script will print the full path to the folder on the screen.

*/


/*

The GET method implemented by the server in L6 returns all the items
in the to-do list. An improvement can be made by adding a new path under
the todo path to identify the priority level of the tasks to be retrieved.
For example, when receiving the GET request on the path '/todo/high', only
high priority tasks will be sent back to the client & vice versa.

Write the code that implements this new feature for the server.

Hints:
1. Add /todo/high and /todo/high/ as a new route under the GET method
2. Use the loadInitializeList() function to load the todo list from the file
3. If the list has items then:
   a. Define a new list for the high priority tasks
   b. Using 'forEach', scan the todo list and check priority key for each entry
   c. If entry has high priority, add to new list
   d. if the new list has an item then stringify new list and send to
      client as response 

*/

/*

In L6, the server is implemented to read the text of the to-do list
from the query string. Make the required changes to the code such
that the text is sent in the body of the request. Follow the TODO
statements to complete the implementation.

*/ 

// POST Handler (part of instructions)

const POSTHandler = (file, newItem, cb) => {
    loadInitializeList(file, (list) => {
        console.log(list);
        list.push(newItem);
        SpeechRecognitionResultList(file, list);
        cb(200, 'OK\n');
    });
}

if (pathname === '/todo' || pathname === '/todo/'){
    let text = '';
    req.setEncoding('utf8');
    // TODO: Set up a listener for the data event and in the event handler
    // add the data chunks to text
    // TODO: Set up a listener for the end event and in the event handler
    // 1. Add the text to the query as a new key
    // 2. Move the call of the POSTHandler inside the event handler
    POSTHandler (todoFile,query,(statusCode,response)=>{
    res.setHeader('content-type','text/plain; charset="utf-8"');
    res.writeHeader(statusCode)
    res.end(response);
    });
}