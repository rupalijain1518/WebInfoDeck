import React , {Component}from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
class AddPackages extends Component{
  
  constructor() {
    super();
    this.state = {};
  }
  
  state={
    id1:"",
    key: ''  
  }
    
  handleSubmit= (e)=>{
    
  console.log("Add PACK state", this.state.id1 ) 
  e.preventDefault();
 
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(this.state.id1).collection('assignedPackages').doc(this.props.match.params.id).set({
    name: this.props.match.params.id,
    check: false
  }); 
  
}
handleChange = (e)=>{
  this.setState({
    [e.target.id] :e.target.value
  })
}

    componentDidMount() {
      const ref = firebase.firestore().collection('packages').doc(this.props.match.params.id);
      ref.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            user: doc.data(),
            key: doc.id
          });
        } else {
          console.log("No such document!");
        }
      });
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
        <input required type="text"  value={this.state.id1} onChange={this.handleChange} className="form-control" id="name" placeholder="Kit serial Number"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
    );
  }
  }
  
  export default AddPackages;