import { color } from "../colors";

class DuConsole{
    deubug(data:any){
        console.debug(...data);
    }
    log(color:string,data:any){
        console.log(`${color}${data}`);
    }
    error(...data:any){
        console.error( `${color.red}`,...data);
    }    
}

export const duConsole = new DuConsole();