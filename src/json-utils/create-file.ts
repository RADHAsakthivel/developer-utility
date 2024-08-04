import fs from 'fs';

/**need to do research */
export async function createFile(filePath: string) {
    console.log('createFile', filePath)
    if (filePath.split('.').length < 2) throw new Error('Please include file extension/type like example.txt,example.xl,etc,..')
    else {
        try {
            fs.writeFileSync(filePath, '['
            );
        } catch (e) {
            console.log("occured error while creating file")
        }
    }
}