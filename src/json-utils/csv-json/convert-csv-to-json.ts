import fs from "fs";
import * as readLine from 'readline';
import { createFile } from "../../common/create-file/create-file";

let headding:string[];
let isEmptyFile = true;

export function convertCsvToJson(sourcePath:string,destinationPath:string){
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
        console.log("currentObject =>",currentObject)
        const newObjStr = JSON.stringify(currentObject, null, 2);
        const dataToAppend = isEmptyFile ? `\n${newObjStr}\n` : `,\n${newObjStr}\n`;
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