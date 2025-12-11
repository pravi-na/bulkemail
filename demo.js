
const fileInput = document.getElementById("fileInput");
fileInput.addEventListener('change', (event) =>{
    let files = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        let data =e.target.result;
        let workbook = XLSX.read(data,{type:'binary'});
        let sheetname = workbook.SheetNames[0];
        console.log(workbook,sheetname)
        let worksheet = workbook.Sheets[sheetname];
        let emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        console.log(emailList)
    }
    reader.readAsBinaryString(files);
    
})
