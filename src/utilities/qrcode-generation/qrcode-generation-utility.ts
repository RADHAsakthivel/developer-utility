import { BaseUtility } from "../../base-utility.js"
import inquirer from "inquirer"
import qrcode from "qrcode"
import path from "path"

export class QrCodeGenerationUtility extends BaseUtility {
  constructor() {
    super("QR Code Generation")
  }

  async execute() {
    console.log(`\n--- ${this.name} ---`)
    const { data } = await inquirer.prompt({
      type: "input",
      name: "data",
      message: "Enter the data to encode in the QR code (e.g., a URL, text):",
    })

    const { outputFileName } = await inquirer.prompt({
      type: "input",
      name: "outputFileName",
      message: "Enter the desired output file name (e.g., my_qrcode.png):",
      default: "qrcode.png",
    })

    const outputPath = path.join(process.cwd(), outputFileName)

    try {
      await qrcode.toFile(outputPath, data, {
        errorCorrectionLevel: "H",
      })
      console.log(`\nQR Code successfully generated and saved to: ${outputPath}`)
    } catch (err:any) {
      console.error(`Failed to generate QR Code: ${err.message}`)
    }
  }
}
