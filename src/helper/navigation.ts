export function navigateUp(
    selectedIndex:number,
    renderOptions:string[],
    callBack:(currentOperation:any,selectedIndex:number)=>any
    ): number {
    selectedIndex = (selectedIndex === 0) ? renderOptions.length - 1 : selectedIndex - 1;
    callBack(renderOptions,selectedIndex);
    return selectedIndex;
  }
  
 export  function navigateDown(
    selectedIndex:number,
    renderOptions:string[],
    callBack:(currentOperation:any,selectedIndex:number)=>any
  ): number {
    selectedIndex = (selectedIndex === renderOptions.length - 1) ? 0 : selectedIndex + 1;
    callBack(renderOptions,selectedIndex);
    return selectedIndex
  }