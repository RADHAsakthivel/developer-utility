// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const {baseDirectory,coreDirectory} = require('./common');

import fs from 'fs';
import path from 'path';
import os from 'os';
import {baseDirectory,coreDirectory} from './common.js';

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
export async function createFile(filePath){
    console.log('createFile',filePath)
    if(filePath.split('.').length < 2) throw new Error('Please include file extension/type like example.txt,example.xl,etc,..')
    else{
        try{
            fs.writeFileSync(filePath, '[', err => {
                if(err)console.log('error ===>');
                else console.log("filecreated and written default value")
            });
        }catch (e){
            console.log("occured error while creating file")
        }
    }
}