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
let currentOperation: string[] = jsonOperationArray;
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
  renderOptions(currentOperation, 0);
}

function keyPress(chunk: any, key: any) {
  handleKeyPress(key, selectedIndex, currentOperation, keyPressEventReciver, ()=>{
    executeJsonOperation(currentOperation[selectedIndex])
  })
}

function setupKeyPressListeners(): void {
  processOn(StdinEvents.keypress, keyPress);
  processOn(StdinEvents.keypress, keyPressExit);
}

function executeJsonOperation(operation: string): void {
  processOff(StdinEvents.keypress, keyPress);
  console.clear();
  switch (operation) {
    case Json.csvToJson:
      duConsole.log(color.blue,operation);
      convertCsvToJson();
      break;
    case Json.addPropertys:
      duConsole.log(color.blue,operation);
      addPropertyToJsonObject(operation);
      break;
    case Json.addUuid:
      duConsole.log(color.blue,operation);
      addPropertyToJsonObject(operation);
      break;
    case Json.deleteProperty:
      duConsole.log(color.blue,operation);
      deleteProperty();
      break;
    default:
      console.log(operation);
      showUnderDevelopmentWarning();
      processExit();
  }
}

function showUnderDevelopmentWarning(): void {
  const warningSymbol = '\u26A0';
  duConsole.log(color.yellow, `${warningSymbol} Currently selected service is under development`);
}