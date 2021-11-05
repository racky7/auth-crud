import React, {useState} from 'react'

const SearchEmployee = ({setEmployeeData, employeeData}) => {

    const [filter, setFilter] = useState('');
    const searchApi = "https://mockrestapi.herokuapp.com/api/employee?limit=undefined&name=";
    const getEmployeeData = async (nameFilter) => {
      
        const response = await fetch(searchApi+nameFilter);
        const employeeData = await response.json();
        setEmployeeData(employeeData.data);
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
              <input type="text" value={filter} onKeyUp={searchEmp} onChange={(e)=>setFilter(e.target.value)} class="form-control" style={{fontSize:15}} placeholder="Search by name..."/>
            </div>
          </div>
        </div>
        </>
    )
}

export default SearchEmployee
