import React , {Component}from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
class AddPackages extends Component{
  
  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
this.state={
  names :[],
  from : '',
  to : '',
  prefix: '',
  id1 : '',
  email:'',
  check : true,
  users:[],key:''
}
  }
  
   handleSubmit =async (e) =>{
    // creating packages from the user inputs 
    let packages = [];
    for (var i = this.state.from; i <= this.state.to; i++) {
        packages.push(this.state.prefix + i);
        this.setState({
          names : packages
        })
      }
  
const db = firebase.firestore()

this.state.names.map((name)=>{
// case-1 : adding packages and assigning them immediately to the users
  if(this.state.id1 !== '' && this.state.id1  && this.state.id1 !== "Select" ){

    //getting details of user
  /*   db.collection('users').doc(this.state.id1).get()
    .finally((res) =>{
    this.setState({
      email : res.data().email
    })
    })
*/
// adding packages into db
db.collection('packages').doc(name).set({
  name: name,
  check: false,
  userId:this.state.id1,
  //email :this.state.email
})
.finally(( res)=>{
console.log("Succefully inserted packages" ,res)
})
.catch((err) => {
  console.log("error occured" ,err)
});

// assigning packages to users into db
db.collection('users').doc(this.state.id1).collection('assignedpackages').doc(name).set({
      name: name,
      check : false
    }, {merge : true}).finally(( res)=>{
      console.log("Succefully assigned Packages" , res)
        })
        .catch((err) => {
          console.log("error occured" , err)
        });

}else{
//case 2: only adds packages and assign it to user later on
  // adding packages into db
db.collection('packages').doc(name).set({
  name: name,
  check: true,
  userId:this.state.id1,
  //email :this.state.email
})
.finally(( res)=>{
console.log("Succefully inserted packages" ,res)
})
.catch((err) => {
  console.log("error occured" ,err)
});
}  

})
e.preventDefault()

}

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name  } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }


handleChange = (e)=>{
      this.setState({
        [e.target.name] :e.target.value
        })
      }


      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
        <input required type="text"  value={this.state.prefix} onChange={this.handleChange} className="form-control" id="prefix" name="prefix" placeholder="Kit serial Number"/>
      </div>
      
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">From</label>
        <input required type="text"  value={this.state.from} onChange={this.handleChange} className="form-control" id="from" name = "from" placeholder="Kit serial Number"/>
      </div>
     
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">To</label>
        <input required type="text"  value={this.state.to} onChange={this.handleChange} className="form-control" id="to" name = "to" placeholder="Kit serial Number"/>
      </div>

<div>
<label htmlFor="exampleInputPassword1">Select User</label>
<br/>       
<select 
className="browser-default custom-select"
name = "id1"
value={this.state.id1} 
onChange={this.handleChange} 
> 
      <option > Select </option>
      {this.state.users.map((user , key) =>
 
      <option   key = {user.key} value={user.key}>{user.name}</option>
      )}</select>
</div>
<br/>
<div className="form-group">
<button type="submit" className="btn btn-primary">Submit</button>
   </div>
  </form>
  </div>
    );
  }
  }
  
  export default AddPackages;