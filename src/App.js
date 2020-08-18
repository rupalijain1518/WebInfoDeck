import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import Header from './components/layout/header';
import Retailers from './components/dashboard/retailer/listRetailers';
import Packages from './components/dashboard/packages/packages'
import addPackage from './components/dashboard/packages/addPackage'
import { BrowserRouter as Router , Route , Switch , Redirect} from 'react-router-dom';
import AssignPackage from './components/dashboard/packages/assignPackage'
import Login from './components/auth/login';
import NotFound from './components/misc/notFound';
import listUsers from './components/dashboard/users/listUsers'
import UserDetail from './components/dashboard/users/userDetail'
import PackageDetail from './components/dashboard/packages/packageDetail';
import RetailerDetail from './components/dashboard/retailer/retailerDetails'
import logout from './components/misc/logout'
import firebase from './config/fire'
import search from './components/dashboard/search'
function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  console.log("inside private route function " , authenticated)
  return (
    <Route
      {...rest}
      render={(props) => authenticated === null
          ?   <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          : <Component {...props} {...rest} />
        } />
  )
}


class App extends Component {
  
  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this);
   this.state = {
      authenticated: null,
      currentUser: null,
    };
  }

  setCurrentUser(u) {
    if (u) {
      this.setState({
        currentUser: u,
        authenticated: true
      })
      
console.log(this.state.authenticated , "inside auth chnged true condn")
    } else {
      this.setState({
        currentUser: null,
        authenticated: null
      })
    
console.log(this.state.authenticated , "inside auth chnged false condn")
    }
  }
  
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        this.setState({
          authenticated: true,
          currentUser: u,
        })
console.log(this.state.authenticated , "inside auth chnged true condn")
   
      } else {
        this.setState({
          authenticated: null,
          currentUser: null,
        })

        console.log(this.state.authenticated , "inside auth chnged false condn")
      }
    })
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  render() {
    return (
      <div className="App">
  <Router>

     <Header authenticated = {this.state.authenticated}/>

   <Switch>
    <Route exact path='/'   render={(props) => { return <Login setCurrentUser={this.setCurrentUser} {...props} />}}/>
    <Route exact path = "/login" render={(props) => { return <Login setCurrentUser={this.setCurrentUser} {...props} />}}/>
     
    <AuthenticatedRoute authenticated={this.state.authenticated} exact path="/users" component={listUsers}/>
     <AuthenticatedRoute authenticated={this.state.authenticated} exact path = "/retailers" component = {Retailers} /> 
     <AuthenticatedRoute authenticated={this.state.authenticated} exact path = "/packages" component = {Packages} />
     
     <AuthenticatedRoute authenticated={this.state.authenticated} exact path = "/addPackages" component = {addPackage} />
     
      <AuthenticatedRoute authenticated={this.state.authenticated} exact path='/showRetailer/:id' component={RetailerDetail} />
      
      <AuthenticatedRoute 
      authenticated={this.state.authenticated} 
      exact path='/assignPackage/:id' 
      component={AssignPackage} />
      
      <AuthenticatedRoute 
      authenticated={this.state.authenticated}
       exact path='/showUser/:id' 
       component={UserDetail} />
      
      <AuthenticatedRoute
       authenticated={this.state.authenticated}
       exact path = "/showPackage/:id" 
       component = {PackageDetail}/>
<AuthenticatedRoute
 authenticated={this.state.authenticated} 
  exact path='/search' 
  component={search}/>
     
      <AuthenticatedRoute 
      authenticated={this.state.authenticated} 
      exact path = "/addPackages" 
      component = {addPackage} />
      <Route  exact path = "/logout" component ={logout}/>
     
      
      <Route  component = {NotFound} /> 
</Switch>
    
  </Router>
  </div>
    );
  }
}


export default App;
