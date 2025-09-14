# Developer Utility

A cross-platform CLI for working with JSON and CSV files.

> Convert CSV ↔ JSON, add/remove properties, and more — all from the command line.

## Index
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Services](#services)
- [License](#license)

### Introduction
This tool helps developers manipulate JSON and CSV data directly from the terminal.

### Target Audience
Developers or anyone comfortable with the command line.

### Reporting Issues
Found a bug or want to propose a feature? Open an issue or email **sakthiv9819@gmail.com**.

### Prerequisites

- **Software Required:** Install Node.js (v20.12.2). [Click here to install Node.js](https://nodejs.org/en/download/package-manager).

### Installation Guide

1. **Install the Package:** After installing Node.js, install the package using the following command:

   ```bash
   npm install -g developer-utility
   ```

2. **Locate the Package:** After installation, you can find the `dev-utils` package in the `node_modules` directory of your global Node.js packages.

### How to Use the Package

1. **Run the Command:**

   ```bash
   json
   ```

2. **Successful Installation:** If you see the following window, your installation was successful:

   ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-1.png)

### How to Use Each Service

#### Convert CSV to JSON

- **Source File:** `.csv` (absolute path to the CSV file to convert)
- **Destination File:** `.json` (path to your empty JSON file)

  **Important:** Ensure the destination file has the proper `.json` extension and starts as an empty array `[ ]`.

  ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-5.png)

- **After Conversion:** Once you enter the details, you'll see a success message:

  ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-6.png)

  The parsed data will be stored in your newly created JSON file:

  ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-8.png)

#### Add Property to JSON File

- **Source File:** `.json` (Your existing JSON file with data)
- **Property to Add File:** `.json` (Your JSON file with properties to add)

  **Important:** Properties must be specified in a `.json` file.

- **Steps:**

  1. **Source JSON File:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-8.png)
  
  2. **Property to Add File:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-9.png)

  3. **Run the Command:**

     ```bash
     json
     ```

  4. **Success Message:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-10.png)

  5. **Updated JSON File:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-13.png)

#### Add UUID to JSON File

- **Source File:** `.json` (Your JSON file with data)

  **Important:** Properties must be specified in a `.json` file.

- **Steps:**

  1. **Source JSON File:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-8.png)
  
  2. **Run the Command:**

     ```bash
     json
     ```

  3. **Success Message:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-14.png)

  4. **Updated JSON File:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-16.png)

#### Remove Property from JSON File

- **Source File:** `.json` (Your JSON file with properties to remove)

  **Important:** Properties must be specified in a `.json` file.

- **Steps:**

  1. **Source JSON File:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-8.png)
  
  2. **Run the Command:**

     ```bash
     json
     ```

  3. **Success Message:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-17.png)

  4. **Updated JSON File:**
     ![alt text](https://raw.githubusercontent.com/RADHAsakthivel/images/main/dev-utility/image-18.png)

---
