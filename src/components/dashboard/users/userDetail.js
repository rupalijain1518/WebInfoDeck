import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      key: '',
      packages: [],
      keyPack: ''
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const packages = [];
    querySnapshot.forEach((doc) => {

      packages.push({
        keyPack: doc.id,
      }
      );
    });
    this.setState({
      packages: packages
    });
    console.log(this.state.packages)
  }


  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,
        });

        const ref1 = firebase.firestore().collection('users').doc(this.props.match.params.id)
          .collection('assignedpackages')
        ref1.onSnapshot(this.onCollectionUpdate)
      }
    });
  }

  delete(id) {
    this.state.packages.map(async (name, key) => {
      console.log(name.keyPack, id)
      // changing status of package
      await firebase.firestore().collection('packages').doc(name.keyPack).set({
        name: name.keyPack,
        check: true,
      }, { merge: false })
        .finally((res) => {
          console.log("packages being unassgined ")
        })
        .catch((err) => {
          console.log("error occured", err)
        });
      //deleting packages from assignedPackage
      await firebase.firestore().collection('users').doc(id)
        .collection('assignedpackages').doc(name.keyPack).delete().then(() => {
          console.log("Document successfully deleted from assign packages!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      //delete user from users
      await firebase.firestore().collection('users').doc(id).delete().then(() => {
        console.log("Document successfully deleted from users!");
        this.props.history.push("/users")
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    })
  }

  render() {
    return (


      <div className="package container" >
        <div className="row">
          <div className="col s12 m6">

            <div className="card text-center" styles="width: 18rem;">
              <br />
              <center>{this.state.user.profileUrl ? <img src={this.state.user.profileUrl} alt="" className="rounded" height="170px" width="170px" /> : "No picture"}
              </center>
              <div className="card-body">
                <h5 className="card-title">{this.state.user.name} </h5>
                <p className="card-text"><small className="text-muted">{this.state.user.email}</small></p>
              </div>
              <ul className="list-group list-group-flush">
                {this.state.user.phone ? <li className="list-group-item"> {this.state.user.phone} </li> : null}
                {this.state.user.address ? <li className="list-group-item"> {this.state.user.address} </li> : null}
                {this.state.user.location ? <li className="list-group-item"> {this.state.user.location} </li> : null}
              </ul>
              <div className="card-body">
                <button onClick={this.props.history.goBack} className="btn btn-secondary">Back</button> &nbsp;&nbsp;
     <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
              </div>
            </div>

          </div>
          <div className="col s12 m5 offset-m1">
            <br />
            {this.state.packages

              ? <table className="table">
                <thead className="table-striped">
                  <tr>
                    <th>Package Name</th>

                  </tr>
                </thead>
                <tbody>
                  {this.state.packages.map(key1 =>
                    <tr key={key1.key}>
                      <td>{key1.keyPack}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              : null}
          </div>
        </div>

      </div>
    );
  }
}




export default UserDetail;
