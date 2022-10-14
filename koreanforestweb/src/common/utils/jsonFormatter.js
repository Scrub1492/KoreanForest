const fs = require("fs");
const topik = require('../../assets/topik.json')

var normalizedPath = require('path').join('assets', 'quiz_json')

var files = {};
// fs.readdirSync(normalizedPath).forEach(function (file) {
//     files[file] = require("../assets/quiz_json/" + file);
// });

class JSONFormatter {
    renameKey(array, oldKey, newKey) {

        const arr = [...array];
        arr.forEach(obj => {
            obj[newKey] = obj[oldKey];
            delete obj[oldKey];
        })

        const updatedJSON = arr;
        return JSON.stringify(updatedJSON);
    }
    
    deleteKey(array, key) {
        const arr = [...array];
        arr.forEach(obj => {
            delete obj[key];
        })

    const updatedJSON = arr;
    return JSON.stringify(updatedJSON);
    }
    wrapInList(arr, key) {
        arr.forEach((obj) => {
            obj[key] = new Array(obj[key]);
        })
    }

    rewriteFile(file, content) {
        fs.writeFile(file, content, err => {
            if (err) {
                console.error(err);
            }
        })
    }

    wrapMetadata(arr) {
        const newJSON = {
            list: arr
        }
        
        return newJSON;
    }
}

export default {
    JSONFormatter
}

