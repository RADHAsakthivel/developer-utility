import { color } from "../colors";

class DuConsole{
    deubug(data:any){
        console.debug(...data);
    }
    log(color:string,data:any){
        console.log(`${color}${data}`);
    }
}

export const duConsole = new DuConsole();