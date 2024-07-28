import fs from "fs";
import readLine from "readline";
import { createFile } from "./create-folder.js";

console.log("coreDirectory =>", coreDirectory)
const sourcePath = '/home/sakthivel/Downloads/test.csv';
const destinationPath = "/home/sakthivel/Downloads/converted.json";

const readStream = fs.createReadStream(sourcePath, "utf8");
const rl = readLine.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});
let headding;
let isEmptyFile = true;
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
      fs.appendFileSync(destinationPath, dataToAppend, 'utf-8', { 'flags': 'a+' });
      isEmptyFile = false;
    } catch (e) {
      console.log("got error while opening the file =>", e)
    }
  }
});

rl.on('close', () => {
  fs.appendFileSync(destinationPath, ']', 'utf-8', { 'flags': 'a+' });
})
