const fs = require('fs');
const path = process.argv[2];

function getFileContents(path, callback) {
    const exists = fs.exists(path);
    if (exists) {
        console.log('exists');

        const { err, stats } = fs.stat(path);
        if (err) return callback(new Error('Error trying to get stats'));

        console.log(stats);
        if (stats.size > 0) {
            const { err, buffer } = fs.readFile(path);
            if (err) return callback(new Error('Error trying to get stats'));

            return callback(null, buffer);
        } else {
            return callback(new Error('File exists but there is no content'));
        }
    }
    return callback(new Error('File does not exist'));
}

const { err, contents } = getFileContents(path);
if (err) console.error(`There was an error getting contents for ${path}`, err);
else console.info('File was found and the contents were loaded');
