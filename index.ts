import * as readline from 'readline';
import * as options from './src/common'

// Create an interface for reading data from the terminal
const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal:true
});
let selectedIndex:number = 0;

function renderMenu(){
  console.clear();
  console.info("select operation you want to use:");

  options.coreOperation.forEach((operation,index) => {
    if(index === selectedIndex){
      console.log(`> ${operation}`);
    }else{
      console.log(operation);
    }
  });
}

readline.emitKeypressEvents(process.stdin);
if(process.stdin.isTTY) process.stdin.setRawMode(true);


process.stdin.on('keypress',(chunk,key)=>{
  console.log("chunk =>",chunk,"key =>",key);
})

// // Prompt the user for input
// rl.question('Enter you source path: ', (name) => {
//   console.log(`Hello, ${name}!`);
// });

// rl.question('Enter you destination path: ', (name) => {
//   console.log(`Hello, ${name}!`);
// });

// rl.close();