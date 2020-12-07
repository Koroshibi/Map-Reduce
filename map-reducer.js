const xlsxFile = require('read-excel-file/node');

const re = /[-–,.;:?!\n\r()\[\]]/gm 

const clearTxt = (text, re) => {
  return text.replace(re, '');
  
}

xlsxFile('./Big Data.xlsx').then((rows) => {
    for(let i = 0; i < rows.length;i++) {
        const clearedTxt = clearTxt(rows[i][0], re)
        shuffling(clearedTxt)
    }
})

// MAP
// return :
// [ [WORD,CATEGORY], [WORD,CATEGORY], ...]

const mapping = (batch) => {
    const mapped = []
    const formattedRow = batch.split(' ')

    for (let index = 0; index < formattedRow.length; index++) {
        const word = formattedRow[index]
        if (word.length > 0) {
            const category = getWordCategory(word)
    
            mapped.push([word, category])
        }
    }

    return mapped
}

// GET THE CATEGORY BY THE LENGTH OF THE WORD
// 11+ = 1
// [5;10] = 2
// 4- = 3

const getWordCategory = (word) => {
    if (word.length > 10) {
        return 1
    }

    if (word.length <= 10 && word.length >= 5) {
        return 2
    }
    
    return 3
}

// SHUFFLE
// return
// [ [1, [1, 1, 1, ...]], [2, [2, 2, 2,, ...]], [3, [3, 3, 3, ...]]]

const shuffling = (batch) => {
    const mappedData = mapping(batch)
    const shuffled = [
        [1, 0],
        [2, 0],
        [3, 0],
    ]

    for (let index = 0; index < mappedData.length; index++) {
        const wordCategory = mappedData[index];
        
    }

    console.log(shuffled)

    return shuffled
}