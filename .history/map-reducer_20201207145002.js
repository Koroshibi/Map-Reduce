const xlsxFile = require('read-excel-file/node');

xlsxFile('./Big Data.xlsx').then((rows) => {
 console.log(rows)
})