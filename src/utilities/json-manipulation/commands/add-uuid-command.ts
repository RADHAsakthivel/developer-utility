import { BaseUtility } from "../../../base-utility.js";
import inquirer from "inquirer";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export class AddUuidcommand extends BaseUtility{
    constructor() {
        super("Add UUID to JSON");
    }
    
    async execute() {
        console.log(`\n--- ${this.name} ---`);
        // Implementation for adding UUID to JSON will go here
        // This is a placeholder for the actual logic
        console.log("This command will add a UUID to the JSON object.");
        const { jsonFilePath } = await inquirer.prompt({
          type: "input",
          name: "jsonFilePath",
          message: "Enter the path to the JSON file:",
          validate: (input) =>
            existsSync(input) && path.extname(input) === ".json" ? true : "Please enter a valid JSON file path.",
        })
        
        const { propertyName }:any = await inquirer.prompt({
            type: "input",
            name: "propertyValue",
            message: `Enter the value for propertyName :`,
            default: "uuid",
        })
    
        try {
            const jsonData = JSON.parse(readFileSync(jsonFilePath, "utf8"))
            
            if (Array.isArray(jsonData)) {
                jsonData.forEach((item) => {
                    item[propertyName || "uuid" ] = uuidv4()
                })
            } else if (typeof jsonData === "object" && jsonData !== null) {
                jsonData[propertyName || "uuid" ] = uuidv4()
            } else {
                throw new Error("JSON content is not an object or array.")
            }
    
            writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2))
            console.log(`\nSuccessfully added property '${propertyName}' to ${jsonFilePath}`)
        } catch (error: any) {
            console.error(`Failed to add property: ${error.message}`)
        }
    }
}