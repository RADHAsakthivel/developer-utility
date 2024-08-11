import readLine from "readline";
import { duConsole } from "../../console/console";
import fs from 'fs';
import { fileTypes } from "../option/option";
import { validateFileExtention } from "../validators/validate";
import { getInput } from "./get-input";

export async function getCustomOperationPath<T>(pathText: string): Promise<T> {
  return await getInput<T>(pathText, (
    path: string,
    rl: readLine.Interface,
    signal: AbortSignal,
    resolve: (value: any) => void,
    reject: (reason?: any) => void,
    parent: () => void
  ) => {
    const isFileExist = fs.existsSync(path);
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