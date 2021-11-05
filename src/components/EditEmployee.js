import react, { useState, useEffect } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import Modal from 'react-modal'
Modal.setAppElement('#root');

const EditEmployee = ({userID, setEmployeeData, employeeData})=>{
    const editApi   =
    "https://mockrestapi.herokuapp.com/api/employee/";
    // const { id } = useParams();
    const history = useHistory();
    const redir = localStorage.getItem("errMsg");
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [age,setAge] = useState('');
    const [country,setCountry] = useState('');
    const [address,setAddress] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const getEmployee = async () => {
          
        const response = await fetch(editApi+userID);
        const employeeData = await response.json();
        //  console.log(employeeData.data.email);
        setName(employeeData.data.name);
        setPhone(employeeData.data.phone);
        setCountry(employeeData.data.country);
        setEmail(employeeData.data.email);
        setAge(employeeData.data.age);
        setAddress(employeeData.data.address);
        

        
      };
    useEffect(()=>{
        if(!(JSON.parse(redir)==false)){
            history.push('/login');
        }
        if(modalOpen){
        getEmployee();
        }
      
      },[modalOpen])

      async function updateEmp(){
        const editEmployeeApi = "https://mockrestapi.herokuapp.com/api/employee/";
        let item = {name, email, age, phone, country, address};

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
      };
      const response = await fetch(editEmployeeApi+userID, requestOptions);
      const data = await response.json();
      var myObj = [...employeeData];
      const objIndex = myObj.findIndex((obj => obj._id == userID));
      myObj[objIndex] = data.item;
      setEmployeeData(myObj);
      setModalOpen(false);
      //console.log(data.item);
      //console.log(myObj);
      }
      
    
    
    return (
        <>
        <button onClick={()=>setModalOpen(true)} className="btn btn-rounded btn-primary">Edit</button>
        <Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)} 
        style={{
          
            content: {
              
              top: '90px',
              left: '150px',
              right: '150px',
             
            }
          }}
        >
        <center><h1>Update Employee Details</h1></center>
        <div>
        <form className="forms-sample">
                        <div className="form-group row">
                            <label for="exampleInputEmail2" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                              <input  type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"  placeholder="Enter name"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label for="exampleInputEmail2" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control"  placeholder="example@mail.com"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label for="exampleInputPassword2" className="col-sm-3 col-form-label">Mobile No. </label>
                            <div className="col-sm-9">
                              <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control"  placeholder="99999999"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label for="exampleInputPassword2" className="col-sm-3 col-form-label">Age </label>
                            <div className="col-sm-9">
                              <input type="number" value={age} onChange={(e)=>setAge(e.target.value)}  className="form-control"  placeholder="19"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label for="exampleInputPassword2" className="col-sm-3 col-form-label">Country </label>
                            <div className="col-sm-9">
                              <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)}  className="form-control"  placeholder="India"/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label for="exampleInputPassword2" className="col-sm-3 col-form-label">Address </label>
                            <div className="col-sm-9">
                            <textarea value={address} onChange={(e)=>setAddress(e.target.value)}  class="form-control" id="exampleTextarea1" rows="2"></textarea>
                            </div>
                          </div>
                          
                          
                          
                        </form>

                        <center><button onClick={updateEmp} type="button" className="btn btn-warning btn-rounded mr-2">Update</button>
                        {/* <Link to="/dashboard"><button type="button" className="btn btn-danger btn-rounded mr-2">Cancel</button></Link></center> */}
                        <button type="button" onClick={()=>setModalOpen(false)} className="btn btn-danger btn-rounded mr-2">Cancel</button></center>
        </div>
        </Modal>
        </>
    )
}

export default EditEmployee;