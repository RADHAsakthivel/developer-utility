import inquirer from "inquirer"
import { BaseUtility } from "../../base-utility.js"
import { CsvToJsonCommand } from "./commands/csv-to-json-command.js"
import { AddPropertyCommand } from "./commands/add-property-command.js"
import { DeletePropertyCommand } from "./commands/delete-property-command.js"
import { AddUuidcommand } from "./commands/add-uuid-command.js"

export class JsonManipulationUtility extends BaseUtility {
  public commands: Record<string, { execute: () => Promise<void> } | null>
  constructor() {
    super("JSON Manipulation")
    this.commands = {
      "Convert CSV to JSON": new CsvToJsonCommand(),
      "Add Property to JSON": new AddPropertyCommand(),
      "Delete Property from JSON": new DeletePropertyCommand(),
      "Add uuid to JSON": new AddUuidcommand(),
      "Back to Main Menu": null,
    }
  }

  async execute() {
    let running = true
    while (running) {
      console.clear()
      console.log(`--- ${this.name} ---`)
      const choices = Object.keys(this.commands)

      const { selectedCommand } = await inquirer.prompt({
        type: "list",
        name: "selectedCommand",
        message: "Select a JSON operation:",
        choices: choices,
      })

      if (selectedCommand === "Back to Main Menu") {
        running = false
      } else {
        const commandInstance = this.commands[selectedCommand]
        if (commandInstance) {
          try {
            await commandInstance.execute()
            await inquirer.prompt({
              type: "input",
              name: "continue",
              message: "Press Enter to continue...",
            })
          } catch (error:any) {
            console.error(`\nError executing command: ${error.message}`)
            await inquirer.prompt({
              type: "input",
              name: "continue",
              message: "Press Enter to continue...",
            })
          }
        } else {
          console.log("Command not found or not implemented yet.")
        }
      }
    }
  }
}
