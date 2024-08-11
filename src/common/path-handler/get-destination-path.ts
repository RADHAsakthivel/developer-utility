import readLine from "readline";
import { duConsole } from "../../console/console";
import { fileTypes } from "../option/option";
import { isFilePathExist, validateFileExtention } from "../validators/validate";
import { getInput } from "./get-input";

export async function getDestinationPath():Promise<string>{
    return await getInput<string>("Enter the destination path : ", (
      path: string,
      rl: readLine.Interface,
      signal: AbortSignal,
      resolve: (value: any) => void,
      reject: (reason?: any) => void,
      parent: () => void
    ) => {
      const isFileExist = isFilePathExist(path);
      if (isFileExist && validateFileExtention(path, fileTypes.json)) {
        rl.close();
        resolve(path);
      } else {
        if (!isFileExist) duConsole.error("Entered file path dosn't exist");
        else duConsole.error("Please enter valid .json file path");
        parent();
      }
    });
  }