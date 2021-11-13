import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar'
const AddEmployeeBulk = () => {
    const history = useHistory()
    const redir = localStorage.getItem("errMsg");

    useEffect(()=>{
        if(!(JSON.parse(redir)==false)){
            history.push('/login');
        }
      
    
      },[])
    

    return (
        <>
        <Navbar/>
        <div>
        <center><h1 style={{margin:10}}> Add Employee in Bulk </h1></center>
        </div>
        </>
    )
}

export default AddEmployeeBulk
