import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
class UserDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      key: '',
      packages: [],
       keyPack:''
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    console.log("into assigned packages")
    const packages = [];
    querySnapshot.forEach((doc) => {
    
      packages.push({
        keyPack: doc.id,
        doc// DocumentSnapshot
        } 
        );
      });
    this.setState({
      packages : packages
   });
   console.log("packages array" , packages)
   }


  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,
        });

        const ref1 = firebase.firestore().collection('users').doc(this.props.match.params.id)
        .collection('assignedpackages')
        ref1.onSnapshot(this.onCollectionUpdate)
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
return (


  <div className="package container">
        <div className="row">
          <div className="col s12 m6">
            
          <div class="card text-center" styles="width: 18rem;">
      <br/>
<center>{this.state.user.profileUrl ? <img src={this.state.user.profileUrl} alt="" class="rounded" height="170px" width="170px"/> : "No picture"}
</center>
  <div class="card-body">
  <h5 class="card-title">{this.state.user.name} </h5>
  <p class="card-text"><small class="text-muted">{this.state.user.email}</small></p>
  </div>
  <ul class="list-group list-group-flush">
  {this.state.user.phone? <li class="list-group-item"> {this.state.user.phone} </li>: null}
  {this.state.user.address? <li class="list-group-item"> {this.state.user.address} </li>: null}
  {this.state.user.location? <li class="list-group-item"> {this.state.user.location} </li>: null}
  </ul>
  <div class="card-body">
  <button onClick={this.props.history.goBack} class="btn btn-secondary">Back</button> &nbsp;&nbsp;
     <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
  </div>
          </div>
         
        </div>
          <div className="col s12 m5 offset-m1">
          <br/>
{ this.state.packages 

? <table className="table">
          <thead className ="table-striped">
             <tr>
                  <th>Package Name</th>
                 
                </tr>
              </thead>
              <tbody>
                {this.state.packages.map(key =>
                  <tr>
                    <td>{key.keyPack}</td>
                  </tr>
                )}
              </tbody>
            </table>

:null}
   </div>
      </div>
    
</div>
 );
}
}




export default UserDetail;
