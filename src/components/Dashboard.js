import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import EmployeeTable from './EmployeeTable';
import {useHistory, Link} from 'react-router-dom'

import AddEmployee from './AddEmployee'
import AddEmployeeBulk from './AddEmployeeBulk';


const Dashboard = () => {
  const [checkLogIn, setCheckLogIn] = useState(false);
  const history = useHistory();
  const redir = localStorage.getItem("errMsg");
  const token = JSON.parse(localStorage.getItem("token"));
  // const eMail = JSON.parse(localStorage.getItem("email"));

  // const passWord = JSON.parse(localStorage.getItem("password"));
  
  const [employeeData, setEmployeeData] = useState([]);

  


  useEffect(()=>{
    if(!(JSON.parse(redir)==false)){
        history.push('/login');
    }
  //   if(!checkLogIn){
  //   checkToken();
    
  //   }

  },[])

  

    return (
       <>
        
        <Navbar/>
       <div>

       <center><h1 style={{margin:10}}> DashBoard</h1></center>
        <AddEmployee setEmployeeData={setEmployeeData} token={token} employeeData={employeeData}/>
        <Link to='/addEmployeeBulk' className="btn btn-rounded btn-success" style={{margin:5, padding:5, fontSize:18}}>Add Employee Bulk</Link>


        </div>
       <EmployeeTable setEmployeeData={setEmployeeData} employeeData={employeeData} />
       
       
       </>
    )
}

export default Dashboard
