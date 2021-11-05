import react from "react";
import { PageList } from "./Pagelist";
import "../navbar.css"
import { Link, useHistory } from "react-router-dom";


const Navbar = () => {
    const history=useHistory();
    const usrName = JSON.parse(localStorage.getItem("usrName"));
    function logOut(){
        localStorage.clear();
        history.push('/login');

    }
      const pageList = PageList.map((itr, index) => {
    const { url, title } = itr;
    return (
      <li key={index}>
        {/* <Link exact to={itr.url} activeClassName="active">
          {itr.title}
        </Link> */}
        <button onClick={logOut} className="btn btn-success btn-fw">Logout</button>
      </li>
    );
  });
  return (
    <nav>
      <div className="headerT" >Hi, {usrName} </div>
      <ul className="menulist">{pageList}</ul>
    </nav>
  );
};

export default Navbar;
