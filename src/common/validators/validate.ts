import fs from "fs";

export function validateFileExtention(path:string,expectedFile:string): boolean{
    let currentFile = path.split(".")[1];
    if(currentFile === expectedFile)return true;
    return false
}

export function isFileDirectoryExist(fullPath:string):boolean{
    let filePath = fullPath.split('/');
    filePath = filePath.splice(0,filePath.length-1);
    if(fs.existsSync(filePath.join())){
        return true;
    }
    return false;
}

export function isFilePathExist(fullPath:string):boolean{
    return fs.existsSync(fullPath);
}