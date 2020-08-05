import firebase from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'
import React , {Component} from 'react'
class ListPackage extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('packages');
    this.unsubscribe = null;
    this.state = {
      packages: []
    };
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

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div  >
     <br/>
        <h1> List Of Packages</h1>
                <br/>
        
        <table className="table table-striped table-sm">
          <thead className ="table-striped">
             <tr>
                  <th>Package Id</th>
                  <th>View Package</th>
                  <th>Assign </th>
                </tr>
              </thead>
              <tbody>
                {this.state.packages.map(pack =>
                  <tr>
                    <td>{pack.key}</td>
                    <td><Link to={`/showPackage/${pack.key}`} class="btn btn-secondary">View</Link></td>
                <td>   {pack.check === true ? <Link to={`/assignPackage/${pack.key}`}   
                 class="btn btn-secondary">Assign</Link> : 
                 <label htmlFor="exampleInputEmail1">Assigned</label>
                } </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
    );
  }
}
export default ListPackage;