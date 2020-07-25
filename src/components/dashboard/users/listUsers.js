import React, { useState, useEffect, Component } from 'react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'
// Initialize Firebase
const database = firebase.firestore();

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name , email , address , phone , location} = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        email,
        address,
        phone,
        location
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div  >
     <br/>
        <h1> List Of Users</h1>
                <br/>
        
        <table className="table table-striped table-sm">
          <thead className ="table-striped">
             <tr>
                  <th> User Id </th>
                  <th>User Name</th>
                  <th>User Email</th>
                  
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr>
                    <td> {user.key} </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td> <Link to={`/showUser/${user.key}`} class="btn btn-secondary">View</Link> </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
    );
  }}

export default ListUsers;