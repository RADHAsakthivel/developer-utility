const fs = require("fs");
const path = require("path");
const readLine = require("readline");
const CD = require("./create-folder");
const {baseDirectory} = require('./common');

const filePath = "";
const tempFilePath = "converted.json";
const readStream = fs.createReadStream(filePath, "utf-8");
const writeStream = fs.createWriteStream(tempFilePath, "utf-8");
const rl = readLine.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});
let headding;
rl.on("line", (line) => {
  let currentLine = line.toString().split(",");
  if (!headding) {
    headding = currentLine;
    if(!fs.existsSync(baseDirectory)){
        CD.createDirectory(baseDirectory);
    }else if(!fs.existsSync(path.join(baseDirectory,'csv-json'))){
        CD.createDirectory('csv-json');
    }else{
        CD.createFile(tempFilePath,path.join(baseDirectory,'csv-json'),[])
    }
  }
  else {
    const fileToOpen = path.join(baseDirectory,tempFilePath);
    fd = fs.openSync(fileToOpen,'r+');
    let currentObject = Object.fromEntries(
      headding.map((e, i) => [e, currentLine[i]])
    );

    try{
        fs.ftruncate(fd,fs.statSync(tempFilePath).size-1);
        const newObjStr = JSON.stringify(currentObject,null,2);
        const dataToAppend = `,\n${newObjStr}\n]`;

        fs.writeSync(fd,dataToAppend,null,'utf-8');
    }finally{
        fs.closeSync(fd);
    }
  }
});
