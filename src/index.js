import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import EditEmployee from './components/EditEmployee';
import AddEmployeeBulk from './components/AddEmployeeBulk'


ReactDOM.render(
  <React.StrictMode>
    <Router>
        
        <Switch>
          
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route path="/addEmployeeBulk" component={AddEmployeeBulk} />
          
          <Route path="/edit/:id" children={<EditEmployee />} />

        </Switch>
      
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


