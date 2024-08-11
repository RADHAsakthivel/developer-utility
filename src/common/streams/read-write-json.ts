import { v4 as uuidv4 } from 'uuid';
import { Stream } from 'stream';
import * as fs from 'fs';
import { createTempFile } from '../../helper';
import { duConsole } from '../../console';
const es = require('event-stream');
const {parse ,stringify} = require('JSONStream')


export function readWriteStream(
    soucePath: string,
    dataToAdd: string,
    requireSeparateFile: boolean,
    callBack: (data: Object,options?:any) => Object
) {
    let tempFilePath: string = createTempFile(soucePath, uuidv4(), "json");
    const readStream: Stream = fs.createReadStream(soucePath, 'utf8');
    const writeStream: Stream = fs.createWriteStream(tempFilePath, 'utf8');
    const parser = parse('*');
    const stringifier = stringify('[', ',', ']');

    let propertiesToInsert: JSON | undefined = undefined;
    if (dataToAdd && dataToAdd.length) propertiesToInsert = JSON.parse(fs.readFileSync(dataToAdd, "utf-8"));
    readStream
        .pipe(parser)
        .pipe(es.mapSync(
            (data:Object)=>{
                return callBack(data,propertiesToInsert);
            }
        ))
        .pipe(stringifier)
        .pipe(writeStream);
    writeStream.on('finish', () => {
        if (!requireSeparateFile) {
            fs.rename(tempFilePath, soucePath, err => {
                if (err) {
                    duConsole.error('Error renaming the file:', err);
                    return;
                }
                duConsole.sucess(`Your changes are Updated in ${soucePath}`);
            });
        } else {
            duConsole.sucess(`your changes are updated in ${tempFilePath}`)
        }
    });

    writeStream.on('error', err => {
        duConsole.error('Error writing the file:', err);
    });

    readStream.on('error', err => {
        duConsole.error('Error reading the file:', err);
    });
}