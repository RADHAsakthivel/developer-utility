import {
    readWriteStream,
} from '../../common';

export function deleteProperty(soucePath: string, propertyToDelete: string, requireNewFile: boolean) {
    readWriteStream(soucePath, "", requireNewFile, (data: any) => {
        if (data.hasOwnProperty(propertyToDelete)) delete data[propertyToDelete];
        return data;
    })
}