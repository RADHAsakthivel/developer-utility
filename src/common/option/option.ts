import {
    Json as JsonEnum, 
    coreOperation as core,
    FileTypes,
    addPropertyInput,
    numericIncrementInput
} from '../enums'

export const jsonOperationArray:string[] = [
    JsonEnum.csvToJson,
    JsonEnum.addPropertys,
    JsonEnum.addSingleProperty,
    JsonEnum.addUuid,
    JsonEnum.deleteProperty,
    JsonEnum.editProperty
]

export const coreOperationArray:string[] = [
    core.json,
    core.password,
    core.qr,
    core.time,
    core.uuid
] 

export const fileTypes:{[key:string]:string} = {
    csv:FileTypes.csv,
    json:FileTypes.json
}

export const addPropertyInputArray = [
    addPropertyInput.getSrcPath,
    addPropertyInput.getAddPropPath,
    addPropertyInput.uuidRequired,
    addPropertyInput.separateFile,
    addPropertyInput.insertRequired
]

export const numericIncrementInputArray=[
    numericIncrementInput.initalIncrement,
    numericIncrementInput.startPosition,
    numericIncrementInput.fieldName,
    numericIncrementInput.endPosition
]