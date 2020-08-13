import React , {Component} from 'react';
import firebase from '../../config/fire'

import { Redirect } from 'react-router-dom'
class Login extends Component{
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      redirect: false,
      email :'',
      password:''
    }
  }
   
  handleSubmit= (e)=>{
  e.preventDefault();
firebase.auth().signInWithEmailAndPassword(this.state.email , this.state.password)
.then((u) =>{
   this.props.setCurrentUser(u)
    this.setState({redirect : true},
    ()=>{ console.log("redurect state changed")})
  })
  .catch((err)=>{
    console.log("Error into login ",err)
  })

}
  handleChange = (e)=>{
    this.setState({
      [e.target.id] :e.target.value
    })
  }
  render(){

//    const { from } = this.props.location.state || { from: { pathname: '/' } }

  //  if (this.state.redirect === true) {
    //  return <Redirect to={from} />
    //}

    if(this.state.redirect === true ) {
      return <Redirect to = "/packages"/>
    }
   return(
     <div> 
       <br/>
       <h1>Welcome to InfoDeck</h1>
       <br/>
    <form onSubmit={this.handleSubmit}>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input required value={this.email} type="email" onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input required value = {this.password}type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>
  );
}
}

export default Login;