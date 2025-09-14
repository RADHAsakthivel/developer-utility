import { BaseJsonCommand } from "./base-json-command.js"
import inquirer from "inquirer"
import fs from "fs"
import path from "path"

export class DeletePropertyCommand extends BaseJsonCommand {
  constructor() {
    super("Delete Property from JSON")
  }

  async execute() {
    console.log(`\n--- ${this.name} ---`)
    const { jsonFilePath } = await inquirer.prompt({
      type: "input",
      name: "jsonFilePath",
      message: "Enter the path to the JSON file:",
      validate: (input) =>
        fs.existsSync(input) && path.extname(input) === ".json" ? true : "Please enter a valid JSON file path.",
    })

    const { propertyName } = await inquirer.prompt({
      type: "input",
      name: "propertyName",
      message: "Enter the name of the property to delete:",
    })
    console.log(`\n📄 Reading JSON file before: ${jsonFilePath} ${propertyName}`)
    try {
      const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"))

      let modified = false
      if (Array.isArray(jsonData)) {
        jsonData.forEach((item) => {
          if (typeof item === "object" && item !== null && item.hasOwnProperty(propertyName)) {
            delete item[propertyName]
            modified = true
          }
        })
      } else if (typeof jsonData === "object" && jsonData !== null) {
        if (jsonData.hasOwnProperty(propertyName)) {
          delete jsonData[propertyName]
          modified = true
        }
      } else {
        throw new Error("JSON content is not an object or array.")
      }

      if (modified) {
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2))
        console.log(`\nSuccessfully deleted property '${propertyName}' from ${jsonFilePath}`)
      } else {
        console.log(`Property '${propertyName}' not found in ${jsonFilePath}. No changes made.`)
      }
    } catch (error:any) {
      console.error(`Failed to delete property: ${error.message}`)
    }
  }
}
