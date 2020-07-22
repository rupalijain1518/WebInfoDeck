
import React, {useContext} from 'react';
import { NavLink} from 'react-router-dom';
import firebaseAuth from '../../provider/AuthProvider'

const LoggedInLinks = () =>{
//  const {handleSignout, inputs, setInputs, errors} = useContext(firebaseAuth)


  //const handleSubmit = (e) => {
    //e.preventDefault()
    //console.log('handleSubmit for logout')
    //handleSignout()
  //}
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
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/modalButton">modal</NavLink>
      </li>
          </ul>
          <ul className="navbar-nav nav-right">
          <li className="nav-item">
        <NavLink className="nav-link" exact to="/logout"><button onClick = "handleSubmit" type="button"class="btn btn-dark">logout</button></NavLink>
          </li>
          </ul>
</div>  
  
);
}
export default LoggedInLinks;