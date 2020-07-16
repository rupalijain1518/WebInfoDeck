import React, { useContext } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from './components/layout/header';
import Retailers from './components/dashboard/retailer/listRetailers';
import addPackages from './components/dashboard/packages/addPacakage';
import Packages from './components/dashboard/packages/packages'
 import { Redirect , BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Login from './components/auth/login';
import NotFound from './components/misc/notFound';
import rd from './components/dashboard/retailer/retailerDetails'
import Users from './components/dashboard/users/listUsers'
import {firebaseAuth} from './provider/AuthProvider'
function App() {
  const { token } = useContext(firebaseAuth)
  console.log(token)
  return (
   <Router>
       <div className="App">
      <Header/>
 
    <Switch>
    <Route exact path='/' render={rProps => token === null ? <Login /> : <Packages />} />
      <Route exact path = "/login" render={rProps => token === null ? <Login /> : <Packages />}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path = "/retailers" component = {Retailers} /> 
      <Route exact path="/retailer/:id" component = {rd}/>
      <Route exact path = "/add" component = {addPackages} />
      <Route exact path = "/packages" component = {Packages} />
      <Route  component = {NotFound} /> 
           </Switch>
      </div>
   </Router>

  );
}

export default App;
