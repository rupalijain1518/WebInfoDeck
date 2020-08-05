import React, {  Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {Link} from 'react-router-dom'
class RetailerDetail extends Component{
  constructor(props) {
    super(props);
    this.unsubscribe = null
    this.state = {
      user: {},
      key: '',
      gst1:[],
      packages:[],
      key1:'',
      keyPack:''
    };
  }

/*  onCollectionUpdate = (querySnapshot) => {
    const packages = [];
    querySnapshot.forEach((doc) => {
    
      packages.push({
        keyPack: doc.id,
        doc// DocumentSnapshot
        });
    });
    this.setState({
      packages
   });
  }
*/
  componentDidMount() {
   
    const ref = firebase.firestore().collection('retailersList').doc(this.props.match.params.id);
    ref.get().then((doc) => {
   
      const gst1 = [];
      
      const data = doc.data().gstInfo;
      if (data){
      gst1.push({
        tradeNam:data.tradeNam,
        lgnm: data.lgnm,
        addr: data.addr,
        ctb:data.ctb ,
        lstupdt:data.lstupdt ,
        sts:data.sts
      });
    }
      this.setState({
        user: doc.data(),
        key: doc.id,
       key1 : doc.data().userId
      ,gst1 :gst1       
      }, ()=>{});        
      
      });
 /*   
const ref1 = firebase.firestore().collection('users').doc(this.state.key1)
.collection('retailers').doc(this.props.match.params.id)
.collection('givenPackages')
ref1.onSnapshot(this.onCollectionUpdate)
*/
  }

  delete(id){
    firebase.firestore().collection('retailersList').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/retailers")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    
  }

render(){
return (
  
  <div className="row">
  <div className="col s12 m6">
  <br/>

  <div className="card" styles="width: 18rem;">
    <div className="card-body">
<h6 className="card-subtitle mb-2 text-muted">{this.state.user.name}</h6>
<img src={this.state.user.profileUrl} alt="..." class="rounded float-right" height="200px" width="200px"/>
    <p className="card-text">
        {this.state.key1}
      {this.state.user.email}<br/>
      {this.state.user.phone}<br/>
     {this.state.user.address}<br/>
     {this.state.user.location}<br/>
     </p>

      <Link to={`/editUser/${this.state.key}`} class="btn btn-success">yet to be implemented</Link> &nbsp;&nbsp;
     <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
         
            </div>
            </div> 
       
           
       </div>
  <div className="col s12 m5 offset-m1">
  <br/>
  {this.state.user.gst && this.state.user.gst !== "not available" ?<h5> GST NUMBER: {this.state.user.gst}</h5> : null}
<br/>
{ this.state.gst1 

? <table className="table">
          <thead className ="table-striped">
             <tr>
                  <th>Retailer trade Name</th>
                  <th>Retailer Status</th>
                  <th>Retailer address</th>
                
                </tr>
              </thead>
              <tbody>
                {this.state.gst1.map(key =>
                  <tr>
                    <td>{key.tradeNam}</td>
                    <td>{key.sts}</td>
                    <td>{key.addr}</td>
                  </tr>
                )}
              </tbody>
            </table>

:null}
  </div>

{this.state.packages}

</div>


);
}
}
export default RetailerDetail;
