import { Json } from "../../common";
import { getFilelocations } from "./add-property";


export async function main(operation: string) {
  switch (operation) {
    case Json.addPropertys:
      getFilelocations();
      break;
    case Json.addUuid:
      getFilelocations(true);
      break;
  }
}