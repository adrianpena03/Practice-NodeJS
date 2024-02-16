```

REVIEW PART 1

```

// write a script that accets two command line arguments, a file name and a string of text. 
// The script will perform these actions
//    Ensure correct inovcation of program before executing
//    Using readFile(), checks if the specified file exists or not
//       If the file does not exist: 
//          Create the file, reverse the input string text using the function reverseText
//          Write the reversed text into the newly created file
//       If the file exists:
//          Append the reversed text to the end of the file


const fs = require('fs');
const path = require('path');

function reverseText(text){
    let textArray = text.replace('\n', ' \ ').split(' ')
    let reverseArray = textArray.reverse();
    let reverseText = reverseArray.join(' ');
    return reverseText.replace(' \ ', '\n');
}

if (process.argv.length < 4){
    console.log(`Missing arguments. \nCorrect Invocation: node ${path.basename(__filename)} [filename] [Text]`);
}

let filename = process.argv[2];
let text = process.argv[3];
let reverseTxt = reverseText(text);

fs.readFile(filename, {encoding:'utf-8'}, (err, content)=>{
    if (err){
        fs.writeFile(filename, reverseTxt, (err)=>{
            if (err) throw err;
            console.log('File is created');
        });
    }else{
        let newText = `\n${reverseText}`;
        fs.appendFile(filename, newText, (err)=>{
            if (err) throw err;
            console.log('Text appended to file.')
        });
    }
});

```

REVIEW PART 2

```

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3){
    console.log('missing arguments')
}

let workingPath = __dirname;
let found = false;
while (!found && workingPath !== '/'){
    console.log(workingPath)
    let contents = fs.readdirSync(workingPath);
    if(contents.includes(process.argv[2])){
        found = true;
    }else{
        workingPath = path.resolve(workingPath, '../');
    }
}

if (found){
    let entry = path.join(workingPath, process.argv[2]);

}
// ...