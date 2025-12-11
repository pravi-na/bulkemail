import { useState } from 'react'
import './App.css'
import axios from "axios";
import * as   XLSX from "xlsx"

function App() {
  const [msg,setmsg] = useState("");
  const [status,setstatus] = useState(false);
  const [file, setfile] =useState([])
  function handleSend(){
    setstatus(true)
    axios.post("http://localhost:5000/sendemail", {msg:msg,file:file})
    .then((data)=>{
      if(data.data){
        alert("Email sent Successfully");
        setstatus(false)
      }
    })
    .catch(()=>alert("Email cannot sent"));
  }
  function handlemsg(e){
    setmsg(e.target.value)
  }
  function handleFile(event){
    let files = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        let data =e.target.result;
        let workbook = XLSX.read(data,{type:'binary'});
        let sheetname = workbook.SheetNames[0];
        console.log(workbook,sheetname)
        let worksheet = workbook.Sheets[sheetname];
        let emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        let totalEmail = emailList.map((item)=>{return item.A});
        setfile(totalEmail)
    }
    reader.readAsBinaryString(files);
  }
  return (
    <>
      <div className='bg-blue-950 text-white font-medium text-5xl text-center p-4'> BulkMail </div>
      <div className='bg-blue-800 text-white font-medium p-4 text-center text-2xl' >We can help your business with sending multiple emails at once</div>
      <div className='bg-blue-600 text-white text-center p-4 font-medium text-2xl'>Drag and Drop</div>
      <div className='bg-blue-400 p-4 flex items-center justify-center flex-col'>
        <textarea className='p-4 text-black border-2 border-black w-[80%] h-32 outline-none rounded-md' placeholder='Enter the email text...' name='msg' value={msg} onChange={handlemsg}></textarea>
        <input type="file" className='border-4 border-dashed m-4 p-4' onChange={handleFile} />
        <div className='text-white font-medium text-xl p-4'> Total emails in the file: {file.length}</div>
        <div className='bg-blue-950 text-white p-4 m-4 text-xl rounded-md' onClick={handleSend}>{status ? "Sending":"Send"}</div>
        </div>
    </>
  )
}

export default App
