import * as fs from 'fs';
import * as JSONStream from 'jsonstream';
const es = require('event-stream');

// Define the path to your JSON file
const filePath = 'C:/Users/sakthivel/Downloads/CityInfo_202407191050.json';
const tempFilePath = 'C:/Users/sakthivel/Downloads/CityInfo.json';

// Create a read stream
const readStream = fs.createReadStream(filePath, 'utf8');

// Create a write stream
const writeStream = fs.createWriteStream(tempFilePath, 'utf8');

// Create a JSONStream parser
const parser = JSONStream.parse('*');

// Create a JSONStream stringifier
const stringifier = JSONStream.stringify('[', ',', ']');

// Pipe the read stream through the parser
let lastId = 0;
readStream
  .pipe(parser)
  .pipe(es.mapSync((data:any) => {
    // Remove the 'name' field from each object in the array
    data.Id = ++lastId;
    // delete data.CreatedOn;
    // delete data.LastUpdatedOn;
    return data;
  }))
  .pipe(stringifier)
  .pipe(writeStream);

// Handle stream events
writeStream.on('finish', () => {
  console.log('File has been updated successfully.');

  // Replace the original file with the updated file
  fs.rename(tempFilePath, filePath, err => {
    if (err) {
      console.error('Error renaming the file:', err);
      return;
    }
    console.log('Temporary file renamed to original file.');
  });
});

writeStream.on('error', err => {
  console.error('Error writing the file:', err);
});

readStream.on('error', err => {
  console.error('Error reading the file:', err);
});