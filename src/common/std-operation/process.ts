import {StdinEvents} from "../enums"

export function processOn(event:StdinEvents,callBack:(...args:any)=>void){
    process.stdin.on(event,callBack)
}

export function processOff(event:StdinEvents,callBack:(...args:any)=>void){
    process.stdin.off(event,callBack)
}

export function processExit(){
  process.exit();
}

export function keyPressExit (chunk:any,key:any){
    if(key.ctrl === true && key.name === 'c'){
      process.stdin.off('keypress', keyPressExit);
      processOff(StdinEvents.keypress,keyPressExit)
      processExit();
    }
  }