import readLine from "readline";
import { color } from "../../colors";


export function getInput<T>(
    question: string,
    callBack: (
        path: string,
        rl: readLine.Interface,
        signal: AbortSignal,
        resolve: (value: any) => void,
        reject: (reason?: any) => void,
        parent: () => void
    ) => void,
    options?: any
): Promise<T> {
    const rl: readLine.Interface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });
    const ac = new AbortController();
    const signal = ac.signal;

    return new Promise<T>((resolve, reject) => {
        const executeGet = () => {
            rl.question(`${color.magenta} ${question} ${color.reset}`, { signal }, (path) => {
                callBack(path, rl, signal, resolve, reject, executeGet);
            })
        }
        executeGet();
    })
}