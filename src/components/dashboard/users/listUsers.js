import React, { Component } from 'react'
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';

import * as fire from '../../../config/fire'

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      email:[]
    };
  }
   

  async componentDidMount() {
      const db = firebase.firestore();
      db.collection("users")
      .get()
      .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.id);
          console.log(data);
          this.setState({ users: data });
      })
      .catch( err =>{
          console.log(err);
      });

      db.collection("users")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log("email" ,data);
        this.setState({ email: data });
        
      });

    }

/* update  
  async  componentDidMount() {
    const db = firebase.firestore();
    db.collection("users").doc('8qKWMUyJypDRlkuzyZNC')
      .update(
        {name : "hit and trial"}
      )
      .then(querySnapshot => {
         });   

  }
// delete retailers
  async  componentDidMount() {
  
    const db = firebase.firestore();
    db.collection("users").doc('8qKWMUyJypDRlkuzyZNC')
      .delete(
      )
      .then(querySnapshot => {
         });   

  }
// delete retailers
async componentDidMount() {
  const db = firebase.firestore();
  db.collection("users").doc("GhSSh60j80fFpae3QqmjJ1gs0Bs1")
  .collection("retailers").doc("6af5d4d6-7c40-4213-a61e-c84a").delete()
    .then(console.log("user retailer del")).catch( err => console.log(err));     }  

 */

  render(){
    const { users } = this.state;
    const { email} = this.state
    
  return (
    <div>
    <table className="table table-striped table-sm">
          <thead className ="table-striped">
        <tr>
        
          <th scope="col">User's ID</th>
          <th scope="col">User's Name</th>
          <th scope="col">User's Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(pack => (

        <tr key={pack.uid}>
         <td> {pack}</td>
         <td> {pack.name} </td>
         <td> {pack.email}   </td>
         
         </tr>
        ))}
      </tbody>
    
    </table>
    </div>




  );
  }
}
export default ListUsers;