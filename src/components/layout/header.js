import React  from 'react';
import {Link , NavLink} from 'react-router-dom';
import LoggedInLinks from './loggedInLinks'
import LogoutLinks from './logout.Links'
const Header = () =>{
return(    
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" >InfoDeck</a>
  <LoggedInLinks/>
  <LogoutLinks/>
</nav>
);}
export default Header;