import React  from 'react';
import LoggedInLinks from './loggedInLinks'
import LogoutLinks from './logoutLinks'
const Header = () =>{
return(    
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" >InfoDeck</a>
  <LoggedInLinks/>
  <LogoutLinks/>
</nav>
);}
export default Header;