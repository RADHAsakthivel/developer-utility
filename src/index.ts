import * as readline from 'readline';
import * as allOption from './common'
import * as operationOptionEnum from './common/operation.enum'
import { getSourcePath } from './json-utils';
import { duConsole } from './console/console';
import { color } from './colors';

let currentOperation: string[] = allOption.coreOperation;
let firstLayerOperation: string;
let secondLayerOperation: string;
let selected: number = 0;

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

export function main(){
  const renderOptions = (options: string[]) => {
    console.clear();
    if (firstLayerOperation) console.log(firstLayerOperation)
    options.forEach((option, index) => {
      if (index === selected) {
        duConsole.log(color.blue,`> ${option}`)
      } else {
        duConsole.log(color.white,`  ${option}`)
      }
    });
  };
  
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
        handleSecondLayerOperation();
      }
    }
  }
  
  const handleSecondLayerOperation = (): void => {
    console.clear();
    console.log(firstLayerOperation);
    if (secondLayerOperation === operationOptionEnum.Json.csvToJson) {
      console.log(secondLayerOperation);
      process.stdin.off('keypress', keyPress);
      getSourcePath();
    }else{
      duConsole.log(color.bgYellow,"Currently selected service is under development")
      process.stdin.off('keypress', keyPress);
    }
  }
  
  const assignCurrentOperation = (selectedOperation: string): void => {
    switch (selectedOperation) {
      case operationOptionEnum.coreOperation.json:
        currentOperation = allOption.jsonOperation;
        break;
    }
  }
  
  const close = (chunk:any,key:any)=>{
    if(key.ctrl === true && key.name === 'c'){
      process.stdin.off('keypress', close);
      process.exit();
    }
  }
  
  renderOptions(currentOperation);
  process.stdin.on('keypress', keyPress);
  process.stdin.on('keypress', close);
}