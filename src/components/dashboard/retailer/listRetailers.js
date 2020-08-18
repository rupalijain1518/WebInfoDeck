import React, {Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'

class ListRetailers extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('retailersList');
    this.unsubscribe = null;
    this.state = {
      users: [],
      search :''

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
  updateSearch = (e) =>{
    this.setState({
        search :e.target.value
    })
}

  componentDidMount() {
    this.unsubscribe = this.ref.orderBy("name", "asc").onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const { search } = this.state;
    const filtered = this.state.users.filter(user => {
      return user.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1;
    });

    return (
      <div  > <br/>
      
     <div className="form-group"> <label htmlFor="exampleInputEmail1">Place your text  </label> 
    
     <input id="search"type="text" className="form-control"  placeholder="Search .."  
       name="search" 
       value={this.state.search} 
       onChange = {this.updateSearch}/>
         <br/></div>
   
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
              {filtered.map(user =>
                  <tr key ={user.key}> 
                    <td> {user.key} </td>
                    <td>{user.name}</td>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td> <Link to={`/showRetailer/${user.key}`} className="btn btn-secondary">View</Link> </td>
                  </tr>
                )}
                </tbody>
              </table>
          </div>
        
    );
  }}

export default ListRetailers;