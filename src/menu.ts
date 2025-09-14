import inquirer from "inquirer"
import { BaseUtility } from "./base-utility.js"

export class Menu {
  public utilities: Record<string, BaseUtility>
  constructor(utilities: Record<string, BaseUtility>) {
    this.utilities = utilities
  }

  async start() {
    let running = true
    while (running) {
      console.clear()
      console.log("--- Developer Utility Core ---")
      const choices = [...Object.keys(this.utilities), "Exit"];

      const { selectedUtility } = await inquirer.prompt({
        type: "list",
        name: "selectedUtility",
        message: "Select a utility:",
        choices: choices,
      })

      if (selectedUtility === "Exit") {
        running = false
        console.log("Exiting Utility Core. Goodbye!")
      } else {
        const utilityInstance = this.utilities[selectedUtility]
        if (utilityInstance) {
          try {
            await utilityInstance.execute()
            await inquirer.prompt({
              type: "input",
              name: "continue",
              message: "Press Enter to return to the main menu...",
            })
          } catch (error:any) {
            console.error(`\nError executing utility: ${error.message}`)
            await inquirer.prompt({
              type: "input",
              name: "continue",
              message: "Press Enter to return to the main menu...",
            })
          }
        } else {
          console.log("Utility not found or not implemented yet.")
        }
      }
    }
  }
}
