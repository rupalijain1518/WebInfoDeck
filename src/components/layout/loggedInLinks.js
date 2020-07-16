import React  from 'react';
import {Link , NavLink} from 'react-router-dom';
const LoggedInLinks = () =>{
return(    
<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav mr-auto">
      
      
<li className="nav-item">
        <NavLink className="nav-link" exact to="/users">Users</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/retailers">Retailers</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/packages">packages</NavLink>
      </li>
          </ul>
          <ul className="navbar-nav nav-right">
          <li className="nav-item">
        <NavLink className="nav-link" exact to="/logout">Logout</NavLink>
          </li>
          </ul>
</div>  
  
);}
export default LoggedInLinks;