import React, { Component } from 'react'
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';

import * as fire from '../../../config/fire'

class ListPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
    };
  }
   
counter(){

}
  componentDidMount() {
    const db = firebase.firestore();
        db.collection("packages")
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data);
            this.setState({ packages: data });
          });
      }
    

  render(){
    const { packages} = this.state;
    
    
  return (
    <div>
    <table className="table table-striped table-sm">
          <thead className ="table-striped">
        <tr>
          <th scope="col">#</th>
          <th scope="col">serial Number</th>
          <th scope="col">Assigned</th>
        </tr>
      </thead>
        <tbody>
        {packages.map(pack => (

        <tr key={pack.uid}>
         <td> {pack.uid}</td>
         <td> {pack.name} </td>
         <td> <button type="button"  className="btn btn-secondary">
           Assigned   {String(pack.check)}
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
export default ListPackage;