import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();

    async function logIn() {
        const logInApi = "https://mockrestapi.herokuapp.com/api/user/login";

        const item = {email, password};
        // console.log(item);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept' : 'application/json'     },
            body: JSON.stringify(item)
        };

        const response = await fetch(logInApi, requestOptions);
        const data = await response.json();

        console.log(data.error);
        if(!data.error){
            localStorage.setItem("errMsg", JSON.stringify(false));
            localStorage.setItem("usrName", JSON.stringify(data.user.name))
            localStorage.setItem("token", JSON.stringify(data.token))
            // localStorage.setItem("email", JSON.stringify(data.user.email))
            // localStorage.setItem("password", JSON.stringify(password))

            history.push("/dashboard");
            
        }
        else {
            // localStorage.setItem("errMsg", JSON.stringify(true));
            alert(data.message);
        }


    }


    return (
        <>
        <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div className="row w-100">
            <div className="col-lg-4 mx-auto">
              <div className="auto-form-wrapper">
                <form>
                  <div className="form-group">
                    <label className="label">Email</label>
                    <div className="input-group">
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="example@mail.com"/>
                      <div className="input-group-append">
                        <span className="input-group-text">
                          
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="label">Password</label>
                    <div className="input-group">
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="*********"/>
                      <div className="input-group-append">
                        <span className="input-group-text">
                         
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="button" onClick={logIn} className="btn btn-primary submit-btn btn-block">Login</button>
                  </div>
                  
                 
                  <div className="text-block text-center my-3">
                    <span className="text-small font-weight-semibold">Not a member ?</span>
                    <a href="register" className="text-black text-small">Create new account</a>
                  </div>
                </form>
              </div>
              
              
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
        </>
    )
}

export default Login
