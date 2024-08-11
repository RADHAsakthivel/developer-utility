import {
    addPropertyInput,
    fileTypes,
    getSourcePath,
    customInputOperation
} from '../../common';
import { deleteProperty } from "./delete-property"

export async function main() {
    let sourcePath = await getSourcePath(fileTypes.json);
    let propertyToDelete =
        await customInputOperation<string>(
            "Enter property name to delete : ",
            (input, rl, signal, res, rej, parent) => {
                if (input.length) {
                    rl.close();
                    return res(input);
                } else {
                    console.log("Invalid formate please type valid property name");
                    parent()
                }
            })
    let isSeparateFileRequired: boolean =
        await customInputOperation<boolean>(
            addPropertyInput.separateFile,
            (input, rl, signal, res, rej) => {
                if (input === "N" || input === 'n') {
                    rl.close();
                    res(false);
                } else {
                    rl.close();
                    res(true)
                }
            })

    deleteProperty(sourcePath, propertyToDelete, isSeparateFileRequired);
}