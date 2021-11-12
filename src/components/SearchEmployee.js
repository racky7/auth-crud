import React, {useState} from 'react'

const SearchEmployee = ({setEmployeeData, setTotal, employeeData, setSearchE, filter, setFilter}) => {

    
    const searchApi = "https://mockrestapi.herokuapp.com/api/employee?pageNo=1&limit=10&name=";
    const getEmployeeData = async (nameFilter) => {
      if(nameFilter===""){    
        setSearchE(false);
        } else setSearchE(true);
      
        const response = await fetch(searchApi+nameFilter);
        const employeeData = await response.json();
        setEmployeeData(employeeData.data);
        setTotal(employeeData.total)
        // setLoading(false);
        
      };
    function searchEmp(e){
       
        // e.preventDefault();
        // if(filter!=''){
            // console.log(filter);
        
           

        getEmployeeData(filter);
        // }
        // else setEmployeeData(employeeData);
        

        

        
        
    }

    return (
        <>
        <div>
        <div class="ml-auto search-form d-none d-md-block" style={{width:"30%", float:"right", marginRight:10}} >
            <div class="form-group border border-primary">
              
              <input type="text" value={filter} onChange={(e)=>setFilter(e.target.value)} class="form-control" style={{fontSize:15}} placeholder="Search by name..."/>
              <span onClick={searchEmp} className="btn btn-rounded btn-danger">Search 🔍</span>
            </div>
          </div>
        </div>
        </>
    )
}

export default SearchEmployee
