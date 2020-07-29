import React, { useState, useEffect } from 'react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
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
          <th scope="col" >View Retailer's</th>
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
          </tr>
        ))}
     
      </tbody>
 
     <thead className ="table-striped">
     <tr>
       <th scope="col">Retailer's Id </th>
       <th scope="col">Retialer's Name</th>
       <th scope="col">Retailer's Location</th>
       <th scope="col">Retailer's Address</th>   
       <th scope="col">Retialer's Phone</th>
       <th scope="col">Retialer's GST</th>
     </tr>
   </thead>
  
 
   {selectedUser ? (
         
     <tbody >
          {retailers.map(ret => (
            <tr  class="table-success"  key={ret.id}>
             <td> <b>{ret.retailerId}</b></td>  
             <td> <b>{ret.name}</b></td>  
             <td> <b>{ret.location}</b></td>  
             <td> <b>{ret.address}</b></td>  
             <td> <b>{ret.phone}</b></td>  
            
             <td> <b>{ret.gst}</b></td>  
            
          </tr>
          ))}
        </tbody>
      ) : null}
  
    </table>


    
    </div>);
}

export default ListUsers;