const fs = require('fs');
const path = require('path');
const os = require('os');
const {baseDirectory,coreDirectory} = require('./common');

export function createDirectory(directoryToCreate){
    const newfile = fs.mkdir(baseDirectory,directoryToCreate??'');
    if(!fs.existsSync(newfile)){
        try{
            fs.mkdir(newfile,{recursive:true})
            return {
                status:true,
                message:`${directoryToCreate} Directory is Created sucessfully you can find the directory in ${newfile}`
            }
        }catch (e){
            return{
                status:false,
                message:`Directory not created getting follwing error ${e.toString()}`
            }
        }
    }
}

/**need to do research */
export function createFile(fileName,targetDirectory,defaultValue){
    if(!fs.existsSync(targetDirectory)){
        targetDirectory = baseDirectory;
    }
    if(fileName.split('.').length < 2) throw new Error('Please include file extension/type like example.txt,example.xl,etc,..')
    else{
        fs.appendFile(fileName,defaultValue.toString(),(err)=>{
            if(err) throw new Error(err);
            console.log('file', fileName ," created")
        })
    }
}