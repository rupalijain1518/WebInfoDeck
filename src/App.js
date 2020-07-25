import React, { useContext } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from './components/layout/header';
import Retailers from './components/dashboard/retailer/listRetailers';
import Packages from './components/dashboard/packages/packages'
import addPackages from './components/dashboard/packages/addPacakage'
 import { BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Login from './components/auth/login';
import AssignPackage from './components/dashboard/packages/assignPackage'
import NotFound from './components/misc/notFound';
import rd from './components/dashboard/retailer/retailerDetails'
import listUsers from './components/dashboard/users/listUsers'
import {firebaseAuth} from './provider/AuthProvider'
import UserDetail from './components/dashboard/users/userDetail'
import PackageDetail from './components/dashboard/packages/packageDetail';
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
      <Route exact path='/editUser/:id' component={UserDetail} />
      <Route exact path='/showUser/:id' component={UserDetail} />
      
      <Route exact path = "/showPackage/:id" component = {PackageDetail}/>
      <Route exact path = "/assignPackage/:id" component = {AssignPackage}/>
      <Route exact path = "/addPackages" component = {addPackages} />
      <Route exact path = "/packages" component = {Packages} />
      
     
      <Route exact path="/retailer/:id" component = {rd}/>
     
      <Route  component = {NotFound} /> 
       </Switch>
     
   </Router>
   </div>
  );
}

export default App;
