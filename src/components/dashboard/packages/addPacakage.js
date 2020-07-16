import React , {Component}from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
class AddPackages extends Component{
  
  constructor() {
    super();
    this.state = {};
  }
  
  state={
    id:"",
    name:'',
    check:true
    }
    
  handleSubmit= (e)=>{
  e.preventDefault();
 
  const db = firebase.firestore();
  const userRef = db.collection('packages').add({
    name: this.state.name,
    check: true
  });
 
  console.log("Add PACK state", this.state)  
  
  console.log("Add PACK props", this.props)  
 
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
         <h1>Add Package</h1>
         <br/>
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Enter kit's serial number</label>
        <input required type="text"  value={this.state.name} onChange={this.handleChange} className="form-control" id="name" placeholder="Kit serial Number"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
    );
  }
  }
  
  export default AddPackages;