const xlsxFile = require('read-excel-file/node');
let text = [];

const getData = async() => {
  xlsxFile('./Big Data.xlsx').then((rows) => {
    text.push(rows);
  })  
  return text;
}


 console.log(getData());