import React, { useState, useEffect } from 'react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'
// Initialize Firebase
const database = firebase.firestore();

const ListUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUsers] = useState();
  const [retailers, setRetailers] = useState([]);
  const [error, setError] = useState();

  const selectUser = (user) => {
    setSelectedUsers(user);
    database.collection('users').doc(user.id).collection('retailers').get()
      .then(response => {
        const fetchedRetailers = [];
        response.forEach(document => {
          const fetchedRetailer = {
            id: document.id,
            ...document.data()
          };
          fetchedRetailers.push(fetchedRetailer);
        });
        setRetailers(fetchedRetailers);
      })
      .catch(error => {
        setError(error);
      });
  }


  useEffect(() => {
    database.collection('users').get()
      .then(response => {
        const fetchedCinemas = [];
        response.docs.forEach(document => {
          const fetchedCinema = {
            id: document.id,
            ...document.data()
          };
          fetchedCinemas.push(fetchedCinema);
        });
        setUsers(fetchedCinemas);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  console.log(props)
  return (
      <div>
          {error ? (
        <p>Ops, there is an error :(</p>
      ) : null}
    <table className="table table-striped table-sm">
          <thead className ="table-striped">
        <tr>
          <th scope="col">user's name </th>
          <th scope="col">user's email</th>
          <th scope="col">users's phone</th>
          <th scope="col">users's address</th>
          <th scope="col">View Retailer's</th>
          <th scope="col">Edit user</th>
          <th scope="col">Delete user</th>
        </tr>
      </thead>
        <tbody>
      {users.map(user => (
          <tr key={user.id}>
          <td>  <b>{user.name}</b></td>
         <td>{user.email}  </td>
         <td>  <b>{user.phone}</b></td>
         <td>{user.address} </td>
         <td>
         <button type="button"  onClick={() => selectUser(user)} className="btn btn-secondary"> View</button>  
         </td>
         <td>
         <Link to={`/edit/${this.user.id}`} class="btn btn-secondary">Edit</Link>
           </td>
         <td>
         <Link to={`/delete/${this.user.id}`} class="btn btn-secondary">Delete</Link>
           
         </td>
          </tr>
        ))}
      </tbody>
      <hr/>

      {selectedUser ? (
        <tbody>
          {retailers.map(ret => (
            <tr key={ret.id}>
             <td> <b>{ret.retailerId}</b></td>  
             <td> <b>{ret.name}</b></td>  
             <td> <b>{ret.gst}</b></td>  
             <td> <b>{ret.location}</b></td>  
             <td> <b>{ret.address}</b></td>  
          </tr>
          ))}
        </tbody>
      ) : null}
  
    </table>
    </div>);
}

export default ListUsers;