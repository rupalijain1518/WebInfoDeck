import React, { useState, useEffect, Component } from 'react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'
// Initialize Firebase
const database = firebase.firestore();

class ListRetailers extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('retailersList');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const {  name , profilrUrl , userName , gst , retailerId  , userId  , address , phone , location} = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name , 
        profilrUrl , 
        userName , 
        gst ,
        retailerId  , 
        userId  ,
        address ,
        phone ,
        location});
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
        <h1> List Of Retailers</h1>
                <br/>
        
        <table className="table table-striped table-sm">
          <thead className ="table-striped">
             <tr>
                  <th> Retailer Id </th>
                  <th>Retailer Name</th>
                  <th>User Id</th>
                  <th>User Name</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr>
                    <td> {user.key} </td>
                    <td>{user.name}</td>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td> <Link to={`/showRetailer/${user.key}`} class="btn btn-secondary">View</Link> </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
    );
  }}

export default ListRetailers;