
import {useHistory} from 'react-router-dom'
import React, {useEffect} from "react";
import Login from './components/Login'
function App() {
  const history = useHistory();
  const redir = localStorage.getItem("errMsg");
  
  useEffect(()=>{
    if((JSON.parse(redir)==false)){
      history.push('/dashboard');
  }
  },[])
  
  return (
    <>
      
    
    </>
  );
}

export default App;
