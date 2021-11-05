import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import EmployeeTable from './EmployeeTable';
import {useHistory} from 'react-router-dom'

import AddEmployee from './AddEmployee'


const Dashboard = () => {
  const [checkLogIn, setCheckLogIn] = useState(false);
  const history = useHistory();
  const redir = localStorage.getItem("errMsg");
  const eMail = JSON.parse(localStorage.getItem("email"));
  const passWord = JSON.parse(localStorage.getItem("password"));
  // const token = localStorage.getItem("token");
  const [employeeData, setEmployeeData] = useState([]);

  

  async function checkToken(){
    const logInApi = "https://mockrestapi.herokuapp.com/api/user/login";

        const item = {email:eMail, password:passWord};
        // console.log(item);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept' : 'application/json'     },
            body: JSON.stringify(item)
        };

        const response = await fetch(logInApi, requestOptions);
        const data = await response.json();

        if(data.error){
          // if(JSON.parse(token)!==data.user.token){
          //   history.push('/login');
          // }
          setCheckLogIn(true);

          history.push('/login');
        };

        

  }


  useEffect(()=>{
    // if(!(JSON.parse(redir)==false)){
    //     history.push('/login');
    // }
    if(!checkLogIn){
    checkToken();
    
    }

  },[checkLogIn])

  

    return (
       <>
        
        <Navbar/>
       <div>

       <center><h1 style={{margin:10}}> DashBoard</h1></center>
        <AddEmployee setEmployeeData={setEmployeeData} employeeData={employeeData}/>
        </div>
       <EmployeeTable setEmployeeData={setEmployeeData} employeeData={employeeData} />
       
       
       </>
    )
}

export default Dashboard
