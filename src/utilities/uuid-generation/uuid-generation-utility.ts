import { BaseUtility } from "../../base-utility.js"
import inquirer from "inquirer"
import { v4 as uuidv4 } from "uuid"

export class UuidGenerationUtility extends BaseUtility {
  constructor() {
    super("UUID Generation")
  }

  async execute() {
    console.log(`\n--- ${this.name} ---`)
    const { count } = await inquirer.prompt({
      type: "input",
      name: "count",
      message: "How many UUIDs do you want to generate?",
      default: "1",
      validate: (input) =>
        !isNaN(Number.parseInt(input)) && Number.parseInt(input) > 0 ? true : "Please enter a positive number.",
    })

    console.log("\nGenerated UUIDs:")
    for (let i = 0; i < Number.parseInt(count); i++) {
      console.log(uuidv4())
    }
  }
}
