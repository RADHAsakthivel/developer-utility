export enum Json {
    csvToJson = "convert csv to json",
    addPropertys = "Add property's to object in json file",
    addUuid = "Insert UUID to every object",
    deleteProperty = "Remove property from object in json file",
}

export enum coreOperation{
    json = "Json",
    password = "Password",
    uuid = "uuid",
    qr = "QR code",
    time = "TimeStamp",
}

export enum FileTypes{
    csv = "csv",
    json = "json"
}   

export enum addPropertyInput {
    getSrcPath = 'Source file path : ',
    getAddPropPath = 'Properties to add json file path : ',
    uuidRequired = 'Do you want to insert uuid [Y/N] : ',
    separateFile = 'Do you want output data in separate file? [Y/N] : ',
    insertRequired = 'Do you wan to insert increment number? [Y/N] :'
};

export enum numericIncrementInput{
    initalIncrement = 'Enter the inital increment number : ',
    startPosition = 'Enter the first position to insert (default is 0) : ',
    fieldName = 'Enter field : ',
    endPosition = 'Enter the last to position to stop the insert (default is end) : '
}