import React, { Component } from 'react'
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';

import * as fire from '../../../config/fire'

class ListRetailers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users : []
    };
  }
   
counter(){

}
  componentDidMount() {
    const db = firebase.firestore();
        db.collection("users")
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data);
            this.setState({ users: data });
          });
      }
    

  render(){
    const { users } = this.state;
    
    
  return (
    <div>
    <table className="table table-striped table-sm">
          <thead className ="table-striped">
        <tr>
          <th scope="col">#</th>
          <th scope="col">User </th>
          <th scope="col">Contact</th>
        </tr>
      </thead>
        <tbody>
        {users.map(pack => (

        <tr key={pack.uid}>
         <td> {this.counter}</td>
         <td> {pack.name} </td>
         <td> <button type="button"  className="btn btn-secondary">
           Assigned{pack.check}
           </button>
            </td>
         
         </tr>
        ))}
      </tbody>
    
    </table>
    </div>


  );
  }
}
export default ListRetailers;