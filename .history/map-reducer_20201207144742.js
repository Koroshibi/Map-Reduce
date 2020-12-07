var excel = new ActiveXObject("Excel.Application");
var excel_file = excel.Workbooks.Open("jitender.xlsx");
var excel_sheet = excel_file.Worksheets("Sheet1");
var data = excel_sheet.Cells(x,y).Value;
//var value = readFromExcel(1,1).value; 
console.log("Value from Excel file is " + data);