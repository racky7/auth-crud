import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'


const Register = () => {
   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function makeUser() {

        setLoading(true)
        // e.preventdefault();
        const signUpApi = "https://mockrestapi.herokuapp.com/api/user";
        let item = {name, email, password};
        // console.warn(item);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept' : 'application/json'     },
            body: JSON.stringify(item)
        };

        const response = await fetch(signUpApi, requestOptions);
        const data = await response.json();
        setLoading(false);
        //console.log(data.item);
        
        if(!(data.error)){
            
        history.push("/login");
        
        }
        else {
          
          alert(data.message)
          // setLoading(true);
          
        }
    }

    return (
        <>
        <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth register-bg-1 theme-one">
          <div className="row w-100">
            <div className="col-lg-4 mx-auto">
              <h2 className="text-center mb-4">Register</h2>
              
              <div className="auto-form-wrapper">
                <form>
                <div className="form-group">
                    <div className="input-group">
                      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Full Name"/>
                      <div className="input-group-append">
                        <span className="input-group-text">
                         
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email"/>
                      <div className="input-group-append">
                        <span className="input-group-text">
                          
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password"/>
                      <div className="input-group-append">
                        <span className="input-group-text">
                          
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  

                  <div className="form-group">
                    <button type="button" onClick={makeUser} className="btn btn-primary submit-btn btn-block">Register</button>
                    {loading?(<><span><div class="loadingio-spinner-spin-svzsbqvmgk"><div class="ldio-cygw5pskthw">
<div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
</div></div></span></>):(<><span></span></>)}
                  </div>
                  <div className="text-block text-center my-3">
                    <span className="text-small font-weight-semibold">Already have and account ?</span>
                    <a href="login" className="text-black text-small">Login</a>
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

export default Register
