import { color } from "../colors";
import { duConsole } from "../console";

export const renderOptions = (
  options: string[],
  selected:number|string,
  dataToConsole?:string
):void => {
    console.clear();
    if (dataToConsole) console.log(dataToConsole)
    options.forEach((option, index) => {
      if (index === selected) {
        duConsole.log(color.blue,`> ${option}`)
      } else {
        duConsole.log(color.white,`  ${option}`)
      }
    });
  };