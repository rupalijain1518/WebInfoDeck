import firebase from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'
import React , {Component} from 'react'
import {Switch} from '@material-ui/core'
class ListPackage extends Component {
  constructor(props) {
    super(props);
    
    this.toggleHandler=this.toggleHandler.bind(this);
    this.ref = firebase.firestore().collection('packages');
    this.unsubscribe = null;
    this.state = {
      packages: [],
      display: false,
       search :''

  
    };
  }
  updateSearch = (e) =>{
    this.setState({
        search :e.target.value
    })
}

  onCollectionUpdate = (querySnapshot) => {
    const packages = [];
    querySnapshot.forEach((doc) => {
      const { name , check } = doc.data();
      packages.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        check
      });
    });
    this.setState({
      packages
   });
  }
  
  toggleHandler=()=> {
    const currentStatus=this.state.display;
    this.setState({
      display: !currentStatus
    })
console.log(this.state.display)
  }

  componentDidMount() {
    this.unsubscribe = this.ref.orderBy("name", "asc").onSnapshot(this.onCollectionUpdate);
  }

  render() {

    const { search } = this.state;
    const filtered = this.state.packages.filter(user => {
      return user.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1;
    });

    return (
      <div  ><br/>
     <div className="form-group"> <label htmlFor="exampleInputEmail1">Place your text  </label> 
    
    <input id="search"type="text" className="form-control"  placeholder="Search .."  
      name="search" 
      value={this.state.search} 
      onChange = {this.updateSearch}/>
        <br/></div>
     <h1> List Of Packages</h1>
                <br/>
        
        <table className="table table-striped table-sm">
          <thead className ="table-striped">
             <tr>
                  <th>Package Id</th>
                  <th>View Package</th>
                  <th>Assign </th>
                  <th>Activate </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(pack =>
                  <tr key ={pack.key}>
                    <td>{pack.key}</td>
                    <td><Link to={`/showPackage/${pack.key}`} className="btn btn-secondary">View</Link></td>
                <td>  
                   {pack.check === true ? 
                   <Link to={`/assignPackage/${pack.key}`}   
                   className="btn btn-secondary">Assign</Link> : 
                   <label htmlFor="exampleInputEmail1">Assigned</label>
                   }
                </td>

                <td> 
  <Switch 
  id = "activate" 
  size = "medium" 
  color= "primary" 
  value = {this.state.display} 
  onChange={this.toggleHandler}/>
                </td>
                 
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
    );
  }
}
export default ListPackage;