#!/usr/bin/env -S node
import { Menu } from "./menu.js"
import { JsonManipulationUtility } from "./utilities/json-manipulation/json-manipulation-utility.js"
import { QrCodeGenerationUtility } from "./utilities/qrcode-generation/qrcode-generation-utility.js"
import { UuidGenerationUtility } from "./utilities/uuid-generation/uuid-generation-utility.js"
import { DirectoryTreeUtility } from "./utilities/directory-tree/directory-tree-utility.js"
import { PasswordUtility } from "./utilities/password-utility/password-utility.js"

async function main() {
  const utilities = {
    "JSON Manipulation": new JsonManipulationUtility(),
    "QR Code Generation": new QrCodeGenerationUtility(),
    "UUID Generation": new UuidGenerationUtility(),
    "Directory Tree": new DirectoryTreeUtility(),
    "Password Utility (Placeholder)": new PasswordUtility(),
    // Exit: null, // Special option to exit
  }

  const menu = new Menu(utilities)
  await menu.start()
}

main()
