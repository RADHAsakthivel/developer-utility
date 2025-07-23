import { BaseJsonCommand } from "./base-json-command.js"
import inquirer from "inquirer"
import fs from "fs"
import path from "path"

export class AddPropertyCommand extends BaseJsonCommand {
  constructor() {
    super("Add Property to JSON")
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
      message: "Enter the name of the property to add:",
    })

    const { propertyValue } = await inquirer.prompt({
      type: "input",
      name: "propertyValue",
      message: `Enter the value for '${propertyName}':`,
    })

    try {
      const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"))

      if (Array.isArray(jsonData)) {
        jsonData.forEach((item) => {
          item[propertyName] = propertyValue
        })
      } else if (typeof jsonData === "object" && jsonData !== null) {
        jsonData[propertyName] = propertyValue
      } else {
        throw new Error("JSON content is not an object or array.")
      }

      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2))
      console.log(`\nSuccessfully added property '${propertyName}' to ${jsonFilePath}`)
    } catch (error: any) {
      console.error(`Failed to add property: ${error.message}`)
    }
  }
}
