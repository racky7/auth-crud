import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar'
import * as XLSX from 'xlsx';
import "../tablestyle.css"
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./TableColumn";

const AddEmployeeBulk = () => {
    const history = useHistory()
    const redir = localStorage.getItem("errMsg");
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    
    
    useEffect(()=>{
        if(!(JSON.parse(redir)==false)){
            history.push('/login');
        }

        if(loading){
            console.log(item);
            
            }
    },[loading])

   

    const readExcel=(file)=>{


        const promise=new Promise((resolve,reject)=>{

            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)

            fileReader.onload=(e)=>{
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray,{type:'buffer'});

                const wsname=wb.SheetNames[0];

                const ws= wb.Sheets[wsname];

                const data=XLSX.utils.sheet_to_json(ws)

                resolve(data);


            };

            fileReader.onerror=(error)=>{
                reject(error);
            };

              
        });

        promise.then((d)=>{
            setItem(d) 
            setLoading(true);         
            
        })

           


    }

    
  
  


    async function addEmpBulk(){
        
        const addEmployeeApi = "https://mockrestapi.herokuapp.com/api/employee/bulk";
        
        if(item.length!=0){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept' : 'application/json'    },
            body: JSON.stringify(item)
        };

        const response = await fetch(addEmployeeApi, requestOptions);
        const data = await response.json();
        console.log(data);
        
        if(!data.error){
        alert('Success!');
        
        }
    }
    else{
        alert('Please select a file')
    }
        
        // alert(item.name + ' Added!');
        
        

    }

    const fileInput = (e) =>{
        const file = e.target.files[0];
        readExcel(file);


    }
    

    return (
        <>
        <Navbar/>
        <div>
        <center><h1 style={{margin:30}}> Add Employee in Bulk </h1></center>
        </div>

        <div style={{margin: "auto", width:"100%", maxWidth:"600px", border: "2px dashed #15B67D",
  padding: "10px"}}>
        <div class="input-group mb-3">
                        <label style={{margin:"auto", padding:"10px", fontSize:"20px"}}>Upload Excel File</label>
                       
                        <div class="input-group col-xs-12">
                          
                          <input type="file" onChange={(e)=>{fileInput(e)}} accept=".xlsx, .xls, .csv" style={{border:"1px solid",maxWidth:"550px", width:"100%", margin:"auto"}} />
                          <span style={{margin:"auto", padding:"5px"}}>
                            <button class="file-upload-browse btn btn-info" onClick={addEmpBulk} type="button"  >Submit</button>
                          </span>
                        </div>
        </div>

        </div>

        {loading?(<><div style={{overflowX:"auto", padding:"10px", margin:"auto", marginTop:"50px", width:"100%", maxWidth:"950px", height:"100%"}}><h3>Preview</h3><table id="customers">
            <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Country</th>
    <th>Age</th>
    <th>Address</th>
  </tr>
            {item.map(item => <>
        <tr><td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.country}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
        </tr>
        </>)}</table></div></>):(<><div><h3 style={{padding:"10px", margin:"auto", marginTop:"50px",  width:"100%", maxWidth:"300px"}}>File Not Selected</h3></div></>)}

        
        </>
    )
}

export default AddEmployeeBulk
