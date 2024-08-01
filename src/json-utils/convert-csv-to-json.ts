import fs from "fs";
import readLine from "readline";
import * as readterminal from 'readline';
import {filePath} from '../common/common';
import { createFile } from "./create-file";

let headding:string[];
let isEmptyFile = true;

function convertCsvToJson(sourcePath:string,destinationPath:string){
  const readStream = fs.createReadStream(sourcePath, "utf8");
  const rl = readLine.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });
  rl.on("line", async (line) => {
    let currentLine = line.toString().split(",");
    if (!headding) {
      headding = currentLine;
      if (!fs.existsSync(destinationPath)) {
        await createFile(destinationPath)
      } else {
        fs.writeFileSync(destinationPath, '[')
      }
    }
    else if (line) {
      let fd = fs.openSync(destinationPath, 'r+');
      try {
        let currentObject = Object.fromEntries(
          headding.map((e, i) => [e, currentLine[i]])
        );
        const newObjStr = JSON.stringify(currentObject, null, 2);
        const dataToAppend = isEmptyFile ? `\n${newObjStr}\n` : `,\n${newObjStr}\n`;
        console.log('dataToAppend =>', dataToAppend);
        fs.appendFileSync(destinationPath, dataToAppend, { flag: 'a+' });
        isEmptyFile = false;
      } catch (e) {
        console.log("got error while opening the file =>", e)
      }
    }
  });
  
  rl.on('close', () => {
    fs.appendFileSync(destinationPath, ']', { flag: 'a+' });
  })
}

export function getSourcePath():void{
  const rl: readterminal.Interface = readterminal.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:true
  });
  rl.question('Enter the source file path:',(path)=>{
    filePath.sourceDirectory = path;
    console.log("solution")
    rl.close();
    getDestinationPath();
  })
}

export function getDestinationPath():void{
  const rl: readterminal.Interface = readterminal.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:true
  });
  rl.question('Enter the destination file path:',(path)=>{
    filePath.destinationDirectory = path;
    convertCsvToJson(filePath.sourceDirectory,filePath.destinationDirectory)
  })
}