const xlsxFile = require('read-excel-file/node');
const xl = require('excel4node');

const re = /[-–,.;:?!\n\r()\[\]]/gm 

const clearTxt = (text, re) => {
  return text.replace(re, '');
  
}

xlsxFile('./Big Data.xlsx').then((rows) => {
    const reducedRows = []

    for(let i = 0; i < rows.length;i++) {
        const clearedTxt = clearTxt(rows[i][0], re)
        const reduced = reducing(clearedTxt)
        reducedRows.push(reduced)
    }

    exportExcel(getFinalResult(reducedRows))
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

// SHUFFLE
// return
// [ [1, [1, 1, 1, ...]], [2, [2, 2, 2,, ...]], [3, [3, 3, 3, ...]]]

const shuffling = (batch) => {
    const mappedData = mapping(batch)
    const shuffled = [
        [1, []],
        [2, []],
        [3, []],
    ]

    for (let index = 0; index < mappedData.length; index++) {
        const category = mappedData[index][1];

        shuffled[category - 1][1].push(category)
    }
    return shuffled
}

// REDUCING
// return
// [ [1, 5], [2, 15], [3, 25],, [1, 5], [2, 15], [3, 25], [1, 5], [2, 15], [3, 25], ...]

const reducing = (batch) => {
    const shuffledData = shuffling(batch)
    const reducedData = []
    for (let index = 0; index < shuffledData.length; index++) {
        shuffledData[index][1] = shuffledData[index][1].length
        reducedData.push(shuffledData[index])
    }
    
    return reducedData
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

// GET FINAL RESULT
// return
// [ [1, 195], [2, 3127], [3, 3987]]

const getFinalResult = (reducedRows) => {
    let finalArray = [
        [1, 0],
        [2, 0],
        [3, 0],
    ]

    for (let index = 0; index < reducedRows.length; index++) {
        const element = reducedRows[index];
        for (let x = 0; x < element.length; x++) {
            const category = element[x][0];
            const number = element[x][1];
            finalArray[category - 1] = [category, number + finalArray[category - 1][1]]
        }
    }

    return finalArray
} 

const exportExcel = (finalData) => {
    const wb = new xl.Workbook()
    const ws = wb.addWorksheet('Worksheet Name')
    ws.cell(1, 1).string('Large')
    ws.cell(1, 2).string('Medium')
    ws.cell(1, 3).string('Small')
    ws.cell(2, 1).number(finalData[0][1])
    ws.cell(2, 2).number(finalData[1][1])
    ws.cell(2, 3).number(finalData[2][1])
    wb.write('test.xlsx')
}
