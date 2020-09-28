import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as ReactBootStrap from 'react-bootstrap'
class AssignPackages extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      counter: 0,
      names: [], from: '', to: '', prefix: '', id1: undefined, email: '', check: true,
      loading: false, errorPackage: null, users: [], key: '', error: null, status: null, packages: [], assign: null
    }
  }

  handleSubmit = (e) => {
    let packages1 = [];
    for (var i = this.state.from; i <= this.state.to; i++) {
      packages1.push(this.state.prefix + i);
    }
    this.setState({
      loading: true
    })
    const db = firebase.firestore()
    let errorPackage = [];
    let assign = []

    if (this.state.packages.length === 0) {
      this.setState({
        errorPackage: 'Can not assign packages : List is empty'
      })
    } else {
      if (this.state.packages.length > 0) {
        for (var i = 0; i < this.state.packages.length; i++) {
          for (var j = 0; j < packages1.length; j++) {
            if (this.state.packages[i].key === packages1[j] && this.state.packages[i].check === false) {

              console.log(this.state.packages[i].key)
              return (
                this.setState({
                  loading: false,
                  errorPackage: 'Already Assigned'
                }, () => {
                })
              )
            }
          }
        }
      }
      packages1.map(async (name) => {
        this.state.packages.map(async (pack) => {
          if (pack.name === name && pack.check === true) {
            console.log(pack.name, name, pack.check)
            await db.collection('users').doc(this.state.id1).get()
              .then((res) => {
                this.setState({
                  loading: false,
                  email: res.data().email
                })
              })
            await db.collection('packages').doc(name).set({
              name: name,
              check: false,
              userId: this.state.id1,
              email: this.state.email,

            }, { merge: true })
              .finally((res) => {
                this.setState({
                  loading: false,
                  status: true
                })
                console.log("Succefully inserted packages")
              })
              .catch((err) => {
                console.log("error occured", err)
              });

            assign.push(name + '  ')
            // assigning packages to users into db
            await db.collection('users').doc(this.state.id1).collection('assignedpackages').doc(name).set({
              name: name,
              check: false
            }, { merge: true }).finally((res) => {

              this.setState({
                loading: false,
                assign: assign,
                status: true
              })
            })
              .catch((err) => {
                console.log("error occured", err)
              });
          }
          else {
            if (pack.name !== name) {
              return this.setState({
                loading: false,
                errorPackage: 'No Such Package exist'
              })

            }
          }

        })
      })

    }
    e.preventDefault()
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name
      });
    });
    this.setState({
      users
    });
  }

  onCollectionUpdate1 = (querySnapshot) => {
    const packages = [];
    querySnapshot.forEach((doc) => {
      const { name, check } = doc.data();
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
    const pack = firebase.firestore().collection('packages').onSnapshot(this.onCollectionUpdate1);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      status: false,
      errorPackage: null
    })

  }

  render() {
    return (
      <div>
        <br />
        <h1>Assign Package</h1>
        <br />
        {this.state.assign ? <div className="alert alert-success" role="alert">
          Assigned Packages :{this.state.assign}
        </div> : this.state.errorPackage ? <div className="alert alert-success" role="alert">
          {this.state.errorPackage}
        </div> : this.state.status ? <div className="alert alert-success" role="alert">
          Packages assigned
        </div> : null}
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Enter kit's prefix</label>
            <input required type="text" value={this.state.prefix} onChange={this.handleChange} className="form-control" id="prefix" name="prefix" placeholder="Kit serial Number" />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">From</label>
            <input required type="text" value={this.state.from} onChange={this.handleChange} className="form-control" id="from" name="from" placeholder="Kit serial Number" />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">To</label>
            <input required type="text" value={this.state.to} onChange={this.handleChange} className="form-control" id="to" name="to" placeholder="Kit serial Number" />
          </div>

          <div>
            <label htmlFor="exampleInputPassword1">Select User</label>
            <br />

            {this.state.id1 === 'undefined' || undefined ? <p className="text-danger">Please Select user</p> : null}

            <select required
              placeholder="select your choice"
              className="browser-default custom-select"
              name="id1"
              value={this.state.id1}
              onChange={this.handleChange}
            >
              <option key='undefined' value="undefined" > Select </option>
              {this.state.users.map((user, key) =>

                <option key={user.key} value={user.key}>{user.name}</option>
              )}</select>
          </div>
          <br />
          <div className="form-group">
            {this.state.loading ? <button className="btn btn-primary" type="button">
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button> : null}

            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
          </div>
        </form>

      </div >
    );
  }
}

export default AssignPackages;
