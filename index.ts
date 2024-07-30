import * as readline from 'readline';
import * as allOption from './src/common'
import * as operationOptionEnum from './src/common/operation.enum'
import { getSourcePath, getDestinationPath } from './src/json-utils';

// Create an interface for reading data from the terminal
const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

let currentOperation: string[] = allOption.coreOperation;
let firstLayerOperation: string;
let secondLayerOperation: string;
let selected: number = 0;

const renderOptions = (options: string[]) => {
  console.clear();
  if (firstLayerOperation) console.log(firstLayerOperation)
  options.forEach((option, index) => {
    if (index === selected) {
      console.log(`> ${option}`);
    } else {
      console.log(`  ${option}`);
    }
  });
};

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);


const keyPress = (chunk: any, key: any) => {
  if (key.name == 'up') {
    selected = (selected === 0) ? currentOperation.length - 1 : selected - 1;
    renderOptions(currentOperation);
  } else if (key.name == 'down') {
    selected = (selected === currentOperation.length - 1) ? 0 : selected + 1;
    renderOptions(currentOperation);
  } else if (key.name == 'return') {
    if (firstLayerOperation == undefined) {
      firstLayerOperation = currentOperation[selected];
      assignCurrentOperation(firstLayerOperation);
      renderOptions(currentOperation);
    } else if (secondLayerOperation == undefined) {
      secondLayerOperation = currentOperation[selected];
      process.stdin.off('keypress', keyPress);
      handleSecondLayerOperation();
    }
  }
}

function handleSecondLayerOperation(): void {
  console.clear();
  console.log(firstLayerOperation);
  console.log(secondLayerOperation);
  if (secondLayerOperation === operationOptionEnum.Json.csvToJson) {
    getSourcePath();
    getDestinationPath();
  }
}

function assignCurrentOperation(selectedOperation: string): void {
  switch (selectedOperation) {
    case operationOptionEnum.coreOperation.json:
      currentOperation = allOption.jsonOperation;
      break;
  }
}

renderOptions(currentOperation);
process.stdin.on('keypress', keyPress)