import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import assignPackage from './assignPackage'
import React , {Component} from 'react'
class ListPackage extends Component {
  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this); // bind of show function
   
    this.state = {
                packages: [],
                showForm: false
   
   };
  }
   
  showForm = () => {
    return (
   <div>
                <br/>
       <h1>Welcome to InfoDeck</h1>
       <br/>
       <form >
      <div className="form-group">
      <label htmlFor="exampleInputEmail1">Enter User's Email Address</label>
      <input  className="form-control" type="email" required  name="email"aria-describedby="emailHelp" placeholder="Enter email" />   
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>
      );
  }


  async componentDidMount() {
    const db = firebase.firestore();
    db.collection("packages")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({ packages: data });
      });     }
    
      
  render(){
    const { packages} = this.state;
 var trial = {
     name : this.state.name
 }   
    
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
        {packages.map((pack) => (

<tr key={pack.uid}    >                 
              
        <td>{pack.name}</td>
               <td> 
                   <button type="button"   onClick={event => alert(event.target.value )}  id = {pack.name} value = {pack.name}  className="btn btn-secondary">
                       Assign
                   </button>
                   {this.state.showForm ? this.showForm() : null} 
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