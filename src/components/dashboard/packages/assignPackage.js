import React , {Component}from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
class AssignPackage extends Component{
  
  constructor() {
    super();
  
  
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  state={
    id1:"",
    key: '',
    email : ''  
  }
    
  handleSubmit = async (e) =>{
    
  e.preventDefault();
 
  const db = firebase.firestore();



  await db.collection('users').doc(this.state.id1).get()
  .then((res) =>{
  this.setState({
    email : res.data().email
  })
  })
  await db.collection('users').doc(this.state.id1).collection('assignedpackages').doc(this.props.match.params.id).set({
    name: this.props.match.params.id,
    check: false,
  }, {merge : true}); 
 
  await db.collection("packages").doc(this.props.match.params.id).set({
    check : false,
    email : this.state.email,
    id1 : this.state.id1
  }, {merge : true})
  
console.log(" detialss" ,this.state.email , this.state.id1)

  this.props.history.push("/packages")
   
}
handleChange = (e)=>{
  this.setState({
    id1 :e.target.value
  })
}
    render(){
     return(
       <div> 
         <br/>
         <h1>Assign Package</h1>
         <br/>
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Enter User's ID</label>
        <input required type="text"  value={this.state.id1} onChange={this.handleChange} className="form-control" id="name" placeholder="User's id number"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
    );
  }
  }
  
  export default AssignPackage ;