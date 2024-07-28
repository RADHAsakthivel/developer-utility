import * as readline from 'readline';

export function getDirectorys(source:string,destination:string):void{
  // Create an interface for reading data from the terminal
  const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // Prompt the user for input
  rl.question('Enter you source path: ', (name) => {
    console.log(`Hello, ${name}!`);
  });
  
  rl.question('Enter you destination path: ', (name) => {
    console.log(`Hello, ${name}!`);
  });
  
  rl.close();
}