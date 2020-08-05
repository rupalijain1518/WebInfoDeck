import React , {Component}from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
class AddPackages extends Component{
  
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  state={
    names :[],
    from : '',
    to : '',
    prefix: '',
    id1 : ''
}
    
  handleSubmit= (e)=>{
 
    e.preventDefault();
    let packages = [];
    for (var i = this.state.from; i <= this.state.to; i++) {
        packages.push(this.state.prefix + i);
    
        this.setState({
          names : packages
        },() => {})
    
      }
  
const db = firebase.firestore()
this.state.names.map((name)=>{

db.collection('packages').doc(name).set({
    name: name,
    check: true,
    userId:this.state.id1
  }).then(( res)=>{
console.log("Succefully inserted packages" ,res)
  }).catch((err) => {
    console.log("error occured" ,err)
  });
 if(this.state.id1){

  db.collection('users').doc(this.state.id1).collection('assignedpackages').doc(name).set({
    name: name,
    check : false
  }, {merge : true}).then(( res)=>{
    console.log("Succefully assigned Packages" + res)
      }).catch((err) => {
        console.log("error occured" + err)
      });
    
    db.collection('packages').doc(name).set({

      check : false
    },{merge : true})
 
 }
    
    })

/*    this.setState({
      names : [],prefix:'',from:'',to:'',id1:''
    },() => {})
*/
}

handleChange = (e)=>{
      this.setState({
        [e.target.id] :e.target.value
        },()=>{})
      }
    render(){
      return(
       <div> 
         <br/>
         <h1>Add Package</h1>
         <br/>
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Enter kit's prefix</label>
        <input required type="text"  value={this.state.prefix} onChange={this.handleChange} className="form-control" id="prefix" placeholder="Kit serial Number"/>
      </div>
      
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">From</label>
        <input required type="text"  value={this.state.from} onChange={this.handleChange} className="form-control" id="from" placeholder="Kit serial Number"/>
      </div>
     
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">To</label>
        <input required type="text"  value={this.state.to} onChange={this.handleChange} className="form-control" id="to" placeholder="Kit serial Number"/>
      </div>


      <div className="form-group">
        <label htmlFor="exampleInputPassword1">User's ID</label>
        <input  type="text"  value={this.state.id1} onChange={this.handleChange} className="form-control" id="id1" placeholder="User's Id "/>
      </div>


      
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>


  </div>
    );
  }
  }
  
  export default AddPackages;