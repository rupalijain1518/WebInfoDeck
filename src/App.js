import React, { useContext } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from './components/layout/header';
import Retailers from './components/dashboard/retailer/listRetailers';
import Packages from './components/dashboard/packages/packages'
import addPackages from './components/dashboard/packages/addPacakage'
 import { BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Login from './components/auth/login';
import NotFound from './components/misc/notFound';
import rd from './components/dashboard/retailer/retailerDetails'
import listUsers from './components/dashboard/copy users/listUsers11'
import {firebaseAuth} from './provider/AuthProvider'
import Modal from './components/auth/Modal'
function App() {
  const { token } = useContext(firebaseAuth)
  console.log(token)
  return (
       <div className="App">
   <Router>
 
      <Header/>
 
    <Switch>
    <Route exact path='/' render={rProps => token === null ? <Login /> : <Packages />} />
      <Route exact path = "/login" render={rProps => token === null ? <Login /> : <Packages />}/>
      <Route exact path="/users" component={listUsers}/>
      <Route exact path = "/retailers" component = {Retailers} /> 
      <Route exact path="/retailer/:id" component = {rd}/>
      <Route exact path = "/add" component = {addPackages} />
      <Route exact path = "/packages" component = {Packages} />
      <Route exact path = "/modalButton" className = {Modal} />    
 
      <Route  component = {NotFound} /> 
       </Switch>
     
   </Router>
   </div>
  );
}

export default App;
