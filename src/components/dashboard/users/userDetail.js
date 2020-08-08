import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
class UserDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,

        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('users').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/users")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    
  }

render(){
console.log(this.state.user)
  return (
    
    <div class="card text-center" styles="width: 18rem;">
      <br/>
<center>{this.state.user.profileUrl ? <img src={this.state.user.profileUrl} alt="..." class="rounded" height="170px" width="170px"/> : "No picture"}
</center>
  <div class="card-body">
  <h5 class="card-title">{this.state.user.name} </h5>
  <p class="card-text"><small class="text-muted">{this.state.user.email}</small></p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{this.state.user.phone ? this.state.user.phone : "Not Available"}</li>
    <li class="list-group-item">{this.state.user.address ? this.state.user.address : "Not Available"}</li>
    <li class="list-group-item">{this.state.user.location ? this.state.user.location : "Not Available"}</li>
  </ul>
  <div class="card-body">
  <button onClick={this.props.history.goBack} class="btn btn-secondary">Back</button> &nbsp;&nbsp;
     <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
  </div>
  
         
</div>
 );
}
}




export default UserDetail;
