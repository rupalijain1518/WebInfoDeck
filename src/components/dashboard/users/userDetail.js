import React, { useState, useEffect, Component } from 'react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'
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
    
    <div className = "container">
    <br/>
    <div className="card" styles="width: 18rem;">
    <div className="card-body">
<h5 className="card-title">{this.state.user.name} </h5>
      <h6 className="card-subtitle mb-2 text-muted">{this.state.user.email}</h6>
      <p className="card-text">
     {this.state.user.phone}<br/>
                   {this.state.user.address}<br/>
                   {this.state.user.location}<br/>
               </p>
      <Link to={`/editUser/${this.state.key}`} class="btn btn-success">yet to be implemented</Link> &nbsp;&nbsp;
     <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
         
            </div>
            </div>
  </div>
 );
}
}
export default UserDetail;
