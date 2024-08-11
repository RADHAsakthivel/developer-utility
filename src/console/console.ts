import { color as colors} from "../colors";

class DuConsole{
    deubug(data:any){
        console.debug(...data);
    }
    log(color:string,data:any){
        console.log(`${color}${data}${colors.reset}`);
    }
    error(...data:any){
        console.error( `${colors.red} ${JSON.stringify(data)} ${colors.reset}`);
    }
    warning(...data:any){
        console.warn(`${colors.bgWhite} ${JSON.stringify(data)} ${colors.reset}`)
    }
    sucess(data:string){
        console.log(`${colors.green} ${data} ${colors.reset}`)
    }
}

export const duConsole = new DuConsole();