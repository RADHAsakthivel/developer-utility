import { convertCsvToJson } from "./convert-csv-to-json";
import { filePath, fileTypes, getDestinationPath, getSourcePath } from "../../common";

export async function main() {
  filePath.sourcePath = await getSourcePath(fileTypes.csv);
  filePath.destinationPath = await getDestinationPath();
  convertCsvToJson(filePath.sourcePath,filePath.destinationPath);
}