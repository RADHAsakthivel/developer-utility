import * as readline from 'readline';
import { coreOperationArray, jsonOperationArray, Json, coreOperation } from './common';
import { addPropertyToJsonObject, convertCsvToJson, deleteProperty } from './json-utils';
import { duConsole } from './console/console';
import { color } from './colors';
import { processOn, processOff, keyPressExit, processExit, StdinEvents } from './common';
import { renderOptions } from './helper';
import { handleKeyPress } from './helper';
import EventEmitter from 'events';

// State Management
let currentOperation: string[] = coreOperationArray;
let firstLayerOperation: string | undefined;
let secondLayerOperation: string | undefined;
let selectedIndex: number = 0;
const keyPressEventReciver = new EventEmitter();

// Initialize Readline for capturing keypress events
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

// Main entry point
export function main(): void {
  keyPressEventReciver.on('keyNavigate', (currentIndex: any) => {
    selectedIndex = currentIndex
  })
  setupKeyPressListeners();
  renderOptions(currentOperation, 0, firstLayerOperation);
}

function keyPress(chunk: any, key: any) {
  handleKeyPress(key, selectedIndex, currentOperation, keyPressEventReciver, handleSelection)
}

function setupKeyPressListeners(): void {
  processOn(StdinEvents.keypress, keyPress);
  processOn(StdinEvents.keypress, keyPressExit);
}

function handleSelection(): void {
  if (!firstLayerOperation) {
    firstLayerOperation = currentOperation[selectedIndex];
    handleFirstLayerSelection();
  } else if (!secondLayerOperation) {
    secondLayerOperation = currentOperation[selectedIndex];
    handleSecondLayerOperation();
  }
}

function handleFirstLayerSelection(): void {
  if (firstLayerOperation && firstLayerOperation !== coreOperation.json) {
    showUnderDevelopmentWarning();
    processExit();
  }
  assignCurrentOperation(firstLayerOperation);
  renderOptions(currentOperation, 0);
}

function handleSecondLayerOperation(): void {
  console.clear();
  console.log(firstLayerOperation);
  if (firstLayerOperation === coreOperation.json && secondLayerOperation) {
    executeJsonOperation(secondLayerOperation);
  } else {
    showUnderDevelopmentWarning();
    processExit();
  }
}

function executeJsonOperation(operation: string): void {
  processOff(StdinEvents.keypress, keyPress);
  switch (operation) {
    case Json.csvToJson:
      console.log(operation);
      convertCsvToJson();
      break;
    case Json.addPropertys:
      console.log(operation);
      addPropertyToJsonObject(operation);
      break;
    case Json.addUuid:
      console.log(operation);
      addPropertyToJsonObject(operation);
      break;
    case Json.deleteProperty:
      console.log(operation);
      deleteProperty();
      break;
    default:
      showUnderDevelopmentWarning();
      processExit();
  }
}

function assignCurrentOperation(selectedOperation: string | undefined): void {
  if (selectedOperation === coreOperation.json) {
    currentOperation = jsonOperationArray;
  }
}

function showUnderDevelopmentWarning(): void {
  const warningSymbol = '\u26A0';
  duConsole.log(color.yellow, `${warningSymbol} Currently selected service is under development`);
}