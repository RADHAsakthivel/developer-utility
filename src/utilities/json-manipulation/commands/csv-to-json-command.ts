import { BaseJsonCommand } from "./base-json-command.js"
import inquirer from "inquirer"
import fs from "fs"
import path from "path"
import csv from "csv-parser"

export class CsvToJsonCommand extends BaseJsonCommand {
  constructor() {
    super("Convert CSV to JSON")
  }

  async execute() {
    console.log(`\n--- ${this.name} ---`)
    const { csvFilePath } = await inquirer.prompt({
      type: "input",
      name: "csvFilePath",
      message: "Enter the path to the CSV file:",
      validate: (input) =>
        fs.existsSync(input) && path.extname(input) === ".csv"
          ? true
          : "Please enter a valid CSV file path.",
    })
    console.log(`\n📄 Reading CSV file before: ${csvFilePath}`);

    const { outputFileName } = await inquirer.prompt({
      type: "input",
      name: "outputFileName",
      message: "Enter the desired output JSON file name (e.g., output.json):",
      default: "output.json",
    })

    const results: any[] = [];

    try {
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on("data", (data) => results.push(data))
          .on("end", () => {
            const jsonString = JSON.stringify(results, null, 2)
            
            // 🔷 compute outputPath cleanly
            let outputPath: string;
            if (path.isAbsolute(outputFileName)) {
              outputPath = path.resolve(outputFileName);
            } else {
              outputPath = path.resolve(path.dirname(csvFilePath), outputFileName);
            }

            // ✅ Ensure directory exists
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(outputPath, jsonString)
            console.log(`\nSuccessfully converted CSV to JSON! Output saved to: ${outputPath}`)
            resolve()
          })
          .on("error", (error) => {
            reject(error)
          })
      })
    } catch (error: any) {
      console.error(`Failed to convert CSV: ${error.message}`)
    }
  }
}