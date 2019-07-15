const fs = require('fs');
const readStream = fs.createReadStream('./data.txt')

let length = 0
readStream.on('data', chunk => {
    let len = chunk.toString().length;
    console.log('len', len);
    length += len
})

readStream.on('end', () => {
    console.log('length', length);
})