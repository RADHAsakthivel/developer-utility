import { BaseUtility } from "../../base-utility.js"
import inquirer from "inquirer"
import fs from "fs"
import path from "path"

export class DirectoryTreeUtility extends BaseUtility {
  constructor() {
    super("Directory Tree")
  }

  async execute() {
    console.log(`\n--- ${this.name} ---`)
    const { dirPath } = await inquirer.prompt({
      type: "input",
      name: "dirPath",
      message: "Enter the path to the directory (leave empty for current directory):",
      default: process.cwd(),
      validate: (input) =>
        fs.existsSync(input) && fs.lstatSync(input).isDirectory() ? true : "Please enter a valid directory path.",
    })

    console.log(`\nDirectory Tree for: ${dirPath}`)
    this.printDirectoryTree(dirPath)
  }

  printDirectoryTree(dirPath:string, prefix:string = "") {
    const files = fs.readdirSync(dirPath)

    files.forEach((file, index) => {
      if(file != "node_modules") {

        const filePath = path.join(dirPath, file)
        const isLast = index === files.length - 1
        const newPrefix = prefix + (isLast ? "    " : "│   ")
        const connector = isLast ? "└── " : "├── "
        
        console.log(`${prefix}${connector}${file}`)
        
        if (fs.lstatSync(filePath).isDirectory()) {
          this.printDirectoryTree(filePath, newPrefix)
        }
      }
    })
  }
}
