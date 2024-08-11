import readLine from "readline";
import { getInput } from "./get-input"
import { addPropertyInput } from "../enums/operation.enum";
import { isFilePathExist, validateFileExtention } from "../validators/validate";
import { duConsole } from "../../console";

export async function getSourcePath(fileType:string): Promise<string> {
  return await getInput<string>(addPropertyInput.getSrcPath, (
    path: string,
    rl: readLine.Interface,
    signal: AbortSignal,
    resolve: (value: any) => void,
    reject: (reason?: any) => void,
    parent: () => void
  ) => {
    const isFileExist = isFilePathExist(path);
    if (isFileExist && validateFileExtention(path, fileType)) {
      rl.close();
      resolve(path);
    } else {
      if (!isFileExist) duConsole.error("Entered file path dosn't exist");
      else duConsole.error(`Please enter valid ${fileType} file path`);
      parent();
    }
  });
}