import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SearchResult from './searchResult'

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
this.updateSearch = this.updateSearch.bind(this)
        
this.unsubscribe = null;
    this.state = {
      users: [],
      search :''
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

    return(
      <div >
      <br/>
      
      <form class="form-inline">
        <i class="fas fa-search" aria-hidden="true"></i>
        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
          aria-label="Search"
          name="search" value={this.state.search} 
      onChange = {this.updateSearch}/>
      </form>
         
              <table className="table table-striped table-sm">
                <thead className ="table-striped">
                   <tr>
                        <th>User Id </th>
                        <th>User Name</th>
                        <th>User Email</th>     
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filtered.map(user => 
                    <tr>
                    <td> {user.key}</td>  
                    <td> {user.name}</td>  
                    <td> {user.email}</td>  
                     </tr>
                    )}
                    </tbody>
                  </table>
                  </div>        
         
      );
  }}

export default ListUsers;
