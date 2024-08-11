import { navigateDown, navigateUp } from "./navigation";
import { renderOptions } from "./render"
import { EventEmitter } from "events";

export function handleKeyPress(
    key: any, 
    selectedIndex: number, 
    currentOperation: string[],
    emitter:EventEmitter,
    callBack:()=>void
    ): void {
    if (key.name === 'up') {
        selectedIndex =  navigateUp(selectedIndex, currentOperation, renderOptions);
        emitter.emit('keyNavigate',selectedIndex)
    } else if (key.name === 'down') {
        selectedIndex = navigateDown(selectedIndex, currentOperation, renderOptions);
        emitter.emit('keyNavigate',selectedIndex)
    } else if (key.name === 'return') {
        callBack();
    }
}