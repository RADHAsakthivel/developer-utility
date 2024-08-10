import {
  addPropertyInput,
  fileTypes, 
  readWriteStream,
  getSourcePath,
  getCustomOperationPath,
  customInputOperation
} from '../../common';
import { v4 as uuid } from 'uuid';

function addPropertyToJsonObject(
  soucePath: string,
  dataToAdd: string,
  insertUuid: boolean,
  requireSeparateFile: boolean,
) {
  if (insertUuid) {
    readWriteStream(soucePath, dataToAdd, requireSeparateFile, (data: object, insertProperty: any) => {
      Object.defineProperty(data, "uuid", {
        value: uuid(),
        writable: false,
        enumerable: true,
        configurable: false
      })
      return data
    })
  } else {
    readWriteStream(soucePath, dataToAdd, requireSeparateFile, (data: object, insertProperty: any) => {
      for (const [key, value] of Object.entries(insertProperty)) {
        Object.defineProperty(data, key, {
          value: value,
          writable: false,
          enumerable: true,
          configurable: false
        })
      }
      return data;
    })
  }
}

export async function getFilelocations(isUuidRequired: boolean = false) {

  let soucePath:string = await getSourcePath(fileTypes.json);

  let propToInsertPath:string = "";
  if(!isUuidRequired)
    propToInsertPath = await getCustomOperationPath<string>(addPropertyInput.getAddPropPath);

  let isSeparateFileRequired: boolean = 
    await customInputOperation<boolean>(
      addPropertyInput.separateFile,
      (input,rl,signal,res,rej)=>{
          if (input === "N" || input === 'n') {
            rl.close();
            rej(false);
          } else {
            rl.close();
            res(true)
          }
      })

  addPropertyToJsonObject(
    soucePath, 
    propToInsertPath, 
    isUuidRequired, 
    isSeparateFileRequired
  );
}