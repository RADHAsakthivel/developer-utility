export function createTempFile(sourcePath: string, uuid: string, fileExtention: string):string {
    let sourceDirectory: string | string[] = sourcePath.split("/");
    sourceDirectory = sourceDirectory.splice(0, sourceDirectory.length - 1).join("/");
    return sourceDirectory + "/" + uuid + "." + fileExtention;
}