import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { COLUMNS } from "./TableColumn";
import { Link } from "react-router-dom";
import EditEmployee from "./EditEmployee";
import SearchEmployee from "./SearchEmployee";


const EmployeeTable = ({setEmployeeData, employeeData}) => {
    const url =
    "https://mockrestapi.herokuapp.com/api/employee?limit=undefined";
  
// const [employeeData, setEmployeeData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  
  
  const getEmployee = async () => {
      
    const response = await fetch(url);
    const employeeData = await response.json();
    setEmployeeData(employeeData.data);
    // setLoading(false);
    
  };


  useEffect(() => {
    

   

    // if (loading) {
      
      getEmployee();
    // }
  }, []);

  

  async function deleteUser(userID){
    //  console.log(userID);
     const deleteApi = "https://mockrestapi.herokuapp.com/api/employee/";
      await fetch(deleteApi+userID, { method: 'DELETE' });
      const newEmployee = employeeData.filter((idEmp) => idEmp._id !== userID);
      setEmployeeData(newEmployee);
      alert('User Deleted!');
      
      //console.log(employeeData);
    }

    // function compFun(userID){
    //   alert('Clicked');
    //   return <EditEmployee userID={userID}/>;
    // }
  
    const columns = COLUMNS;
  const data = employeeData;
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow
  } = useTable(
    {
      columns: columns,
      data: data
    },
    useSortBy, usePagination
  );

  const {pageIndex} = state;

 

    return (
        <>
        <div >
          <div>
            
            
          <SearchEmployee setEmployeeData={setEmployeeData} employeeData={employeeData} />
          
          <span> </span>
            
          

          </div>
          
          <br/>
                    
              <table className="table table-hover" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps({ title: undefined })
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <>
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                              <>
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                           
                          </>
                          );
                        })}
                         <td>
                            <button onClick={()=>deleteUser(row.original._id)} class="btn btn-rounded btn-danger">Delete</button>
                            <span> </span>
                            {/* <Link to={`/edit/${row.original._id}`}><button  class="btn btn-rounded btn-primary">Edit</button></Link> */}
                            <span> </span>
                            {/* <button onClick={()=>compFun(row.original._id)}>Click Me</button> */}

                            <EditEmployee setEmployeeData={setEmployeeData} employeeData={employeeData} userID={row.original._id}/>
                           
                            
                          </td>
                          
                         
                      </tr>
                      
                      </>
                    );
                  })}
                  {/* <tr>
                    <td></td>
                  </tr> */}
                  <br/>
                  
                </tbody>
              </table>
              <center>
              
                    {/* <button class="btn btn-rounded btn-primary" onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button> */}
                    <span> </span>
                    <button onClick={()=>previousPage()} disabled={!canPreviousPage} class="btn btn-rounded btn-primary">Previous</button>
                    <span> Page{' '} {pageIndex + 1} of {pageOptions.length} </span>

                    

                    <button onClick={()=>nextPage()} disabled={!canNextPage} class="btn btn-rounded btn-primary">Next</button>
                    <span> </span>
                    {/* <button class="btn btn-rounded btn-primary" onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button> */}

                    <span> 
                      Go to page: {' '}
                      <input style={{width:"5%"}} type='number' defaultValue={pageIndex + 1} onChange={e=>{
                        const pageNumber = e.target.value ? Number(e.target.value) - 1: 0
                        gotoPage(pageNumber)
                      }}/>
                    </span>
                  </center>
                  

              

              
            </div>
        </>
    )
}

export default EmployeeTable
