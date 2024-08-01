import {Json as JsonEnum, coreOperation as core} from './operation.enum'

export const jsonOperation:string[] = [
    JsonEnum.csvToJson,
    JsonEnum.addProperty,
    JsonEnum.deleteProperty,
    JsonEnum.editProperty
]

export const coreOperation:string[] = [
    core.json,
    core.password,
    core.qr,
    core.time,
    core.uuid
] 