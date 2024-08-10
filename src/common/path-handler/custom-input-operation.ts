import readLine from "readline";
import { getInput } from "./get-input";

export async function customInputOperation<T>(
    textToRender: string,
    callback: (
        path: string,
        rl: readLine.Interface,
        signal: AbortSignal,
        resolve: (value: any) => void,
        reject: (reason?: any) => void,
        parent: () => void
    ) => void
): Promise<T> {
    return await getInput<T>(textToRender, (path,rl,signal,resolve,reject,parent)=>{
        callback(path,rl,signal,resolve,reject,parent);
    });
}