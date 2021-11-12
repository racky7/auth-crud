import React, { useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { COLUMNS } from "./TableColumn";
import { Link, useHistory } from "react-router-dom";
import EditEmployee from "./EditEmployee";
import SearchEmployee from "./SearchEmployee";
import ReactPaginate from 'react-paginate'


const EmployeeTable = ({setEmployeeData, employeeData}) => {
 // const [currentPage, setCurrentPage]= useState(1)
  const token = JSON.parse(localStorage.getItem("token"));
    
  
// const [employeeData, setEmployeeData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchE,setSearchE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState('');
  let url =
  `https://mockrestapi.herokuapp.com/api/auth/employee?pageNo=1&limit=10`;
  const history = useHistory();
  
  const getEmployee = async (currentPage) => {
    
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': token }
      
  };
      
    const response = await fetch(url, requestOptions);
    const employeeData = await response.json();
    
    if(employeeData.error===false){
    setEmployeeData(employeeData.data);
    setTotal(employeeData.total)
    } 
    else if(employeeData.error===true){
      localStorage.clear();
      history.push('/login');
    }
  
    // console.log(employeeData)
    setLoading(false);
    
  };


  useEffect(() => {
    

   

    if (loading) {
      
      getEmployee();
     
      
    }
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

  function handlePageClick(data){
    // alert(data.selected)
    //setCurrentPage(data.selected+1);
    //console.log(data.selected+1)
    url =
  `https://mockrestapi.herokuapp.com/api/auth/employee?pageNo=${data.selected+1}&limit=10`;
    getEmployee(url);

  }

  const getEmployeeDataPage = async (searchApi, nameFilter) => {
    // if(filter===""){    
    //   setSearchE(false);
    //   } else setSearchE(true);
    
      const response = await fetch(searchApi+nameFilter);
      const employeeData = await response.json();
      setEmployeeData(employeeData.data);
      
      // setLoading(false);
      
    };

  function handleSearchClick(data){
    console.log("functionchala...")
    const searchApi = `https://mockrestapi.herokuapp.com/api/employee?pageNo=${data.selected+1}&limit=10&name=`;

    getEmployeeDataPage(searchApi, filter)

    

  }

 

    return (
        <>
        <div >
          <div>
            
            
          <SearchEmployee setEmployeeData={setEmployeeData} employeeData={employeeData} setTotal={setTotal} setSearchE={setSearchE} filter={filter} setFilter={setFilter}/>
          
          <span> </span>
            
          

          </div>
          
          <br/>
          

          {loading ? (
          <>
            <center>
             <br/><br/>
              <div class="loadingio-spinner-rolling-9wwlhi5tw7" >
                <div class="ldio-raemflyyk8">
            <div></div>
              </div>
              </div>
              
                
              
            </center>
          </>
        ) : (
          <>      
              <table className="table table-hover" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (<>
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
                    
                    </>
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
                            <button onClick={()=>deleteUser(row.original._id)} className="btn btn-rounded btn-danger">Delete</button>
                            <span> </span>
                            {/* <Link to={`/edit/${row.original._id}`}><button  class="btn btn-rounded btn-primary">Edit</button></Link> */}
                            <span> </span>
                            

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
                    {/* <span> </span>
                    <button onClick={()=>previousPage()} disabled={!canPreviousPage} class="btn btn-rounded btn-primary">Previous</button>
                    <span> Page{' '} {pageIndex + 1} of {pageOptions.length} </span>

                    

                    <button onClick={()=>nextPage()} disabled={!canNextPage} class="btn btn-rounded btn-primary">Next</button>
                    <span> </span> */}
                    {/* <button class="btn btn-rounded btn-primary" onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button> */}

                    {/* <span> 
                      Go to page: {' '}
                      <input style={{width:"5%"}} type='number' defaultValue={pageIndex + 1} onChange={e=>{
                        const pageNumber = e.target.value ? Number(e.target.value) - 1: 0
                        gotoPage(pageNumber)
                      }}/>
                    </span> */}
                  </center>
                  
                  {searchE?(<>
                    <center>
                  <ReactPaginate
                  
                  onPageChange={handleSearchClick}
                  pageCount={total/10}
                  containerClassName={'btn-group '}
                  pageClassName={'btn-group btn-primary'}
                  pageLinkClassName={'btn btn btn-primary'}
                  previousClassName={'btn btn-primary'}
                  previousLinkClassName={'btn btn-primary'}
                  nextClassName={'btn btn-primary'}
                  nextLinkClassName={'btn btn-primary'}
                  

                  />
                    
                  
                 </center>
                  </>):(<>
                    <center>
                  <ReactPaginate
                  
                  onPageChange={handlePageClick}
                  pageCount={total/10}
                  containerClassName={'btn-group '}
                  pageClassName={'btn-group btn-primary'}
                  pageLinkClassName={'btn btn btn-primary'}
                  previousClassName={'btn btn-primary'}
                  previousLinkClassName={'btn btn-primary'}
                  nextClassName={'btn btn-primary'}
                  nextLinkClassName={'btn btn-primary'}
                  

                  />
                    
                  
                 </center>
                  </>)}
                  

                  

                </>
        )}
              
              

              

              
        </div>
        </>
    )
}

export default EmployeeTable
