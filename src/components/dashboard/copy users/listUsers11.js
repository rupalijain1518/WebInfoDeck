import React, { useState, useEffect } from 'react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const database = firebase.firestore();

const ListUsers = (props) => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  const selectCinema = (cinema) => {
    setSelectedCinema(cinema);
    database.collection('users').doc(cinema.id).collection('retailers').get()
      .then(response => {
        const fetchedMovies = [];
        response.forEach(document => {
          const fetchedMovie = {
            id: document.id,
            ...document.data()
          };
          fetchedMovies.push(fetchedMovie);
        });
        setMovies(fetchedMovies);
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
        setCinemas(fetchedCinemas);
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
        </tr>
      </thead>
        <tbody>
      {cinemas.map(cinema => (
          <tr key={cinema.id}>
          <td>  <b>{cinema.name}</b></td>
         <td>{cinema.email}  </td>
         <td>  <b>{cinema.phone}</b></td>
         <td>{cinema.address} </td>
         <td>
         <button type="button"  onClick={() => selectCinema(cinema)} className="btn btn-secondary"> View</button> 
         
         </td>
          </tr>
        ))}
      </tbody>
      <hr/>

      {selectedCinema ? (
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
             <td> <b>{movie.retailerId}</b></td>  
             <td> <b>{movie.name}</b></td>  
             <td> <b>{movie.gst}</b></td>  
             <td> <b>{movie.location}</b></td>  
             <td> <b>{movie.address}</b></td>  
          </tr>
          ))}
        </tbody>
      ) : null}
  
    </table>
    </div>);
}

export default ListUsers;