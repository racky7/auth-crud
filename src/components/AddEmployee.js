import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Modal from 'react-modal'
Modal.setAppElement('#root');

const AddEmployee = ({setEmployeeData, employeeData}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const history = useHistory();
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [age,setAge] = useState('');
    const [country,setCountry] = useState('');
    const [address,setAddress] = useState('');

    async function addEmp(){
        
        const addEmployeeApi = "https://mockrestapi.herokuapp.com/api/employee";
        let item = {name, email, age, phone, country, address};
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept' : 'application/json'     },
            body: JSON.stringify(item)
        };

        const response = await fetch(addEmployeeApi, requestOptions);
        const data = await response.json();
        console.log(data.item);
        alert(item.name + ' Added!');
        setEmployeeData((employeeData) => {
            return [...employeeData, data.item];
          });
        setModalOpen(false);

    }
   

    return (<>
    <button onClick={()=>setModalOpen(true)} className="btn btn-rounded btn-success" style={{margin:5, padding:5, fontSize:18}}>Add Employee</button>
    <Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)} 
        style={{
          
          content: {
            
            top: '90px',
            left: '150px',
            right: '150px',
           
          }
        }}
        >
                <button onClick={()=>setModalOpen(false)} className="btn btn-rounded btn-danger">Close</button>
                <center><h2>Create a New Employee</h2></center><br/>
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
                              <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control"  placeholder="99999999"/>
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

                        <center><button type="button" onClick={addEmp} className="btn btn-success btn-rounded mr-2">Submit</button></center>
        </div>
                
          </Modal>
        
        </>
    )
}

export default AddEmployee
