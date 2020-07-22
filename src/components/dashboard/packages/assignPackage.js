import React ,{Component}from 'react'

import * as firebase from 'firebase';
import 'firebase/firestore';
class AssignPackage extends Component{

  constructor() {
    super();
    this.state = {};
  }
  
  state={
    user:"",
    name:''
    }
    
  handleSubmit= (e)=>{
  e.preventDefault();
 
  const db = firebase.firestore();
  
  console.log("Assign PACK state", this.state)  
  
  console.log("Assign PACK props", this.props)  
 
}
    handleChange = (e)=>{
      this.setState({
        [e.target.id] :e.target.value
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
        <label htmlFor="exampleInputPassword1">Enter kit's serial number</label>
        <input required type="text"  value={this.state.name} onChange={this.handleChange} className="form-control" id="name" placeholder="Kit serial Number"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Enter user's Id</label>
        <input required type="text"  value={this.state.user} onChange={this.handleChange} className="form-control" id="name" placeholder="Kit serial Number"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
    );
  }
}

export default AssignPackage