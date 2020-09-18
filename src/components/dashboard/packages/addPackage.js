import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Link } from '@material-ui/core';
class AddPackages extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;

    this.handleSubmit1 = this.handleSubmit1.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      names: [], from: '', to: '', prefix: '', id1: undefined, email: '', check: true,
      users: [], key: '', error: null, clicked: null, status: null
    }
  }

  handleSubmit1 = (e) => {
    console.log("called submit")

    let packages = [];
    for (var i = this.state.from; i <= this.state.to; i++) {
      packages.push(this.state.prefix + i);
      this.setState({
        names: packages
      })
    }
    const db = firebase.firestore()
    this.state.names.map(async (name) => {

      await db.collection('packages').doc(name).set({
        name: name,
        check: true,
      })
        .finally((res) => {
          console.log(this.state.names)
          this.setState({
            id1: null,
            names: null,
            status: true
          }, () => { console.log(this.state.names) })
        })
        .catch((err) => {
          console.log("error occured", err)
        });


      await db.collection('availablePackages').doc(name).set({
        name: name,
        check: true,
      })
        .finally((res) => {
          console.log(this.state.names)
          this.setState({
            id1: null,
            names: null,
            status: true
          }, () => { console.log(this.state.names) })
        })
        .catch((err) => {
          console.log("error occured", err)
        });
    })

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

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      status: false
    })
    console.log("called")
  }

  render() {
    return (
      <div>
        <br />
        <h1>Add Package</h1>
        <br />
        {this.state.status ? <div className="alert alert-success" role="alert">
          Packages added
</div>
          : null}
        <form onSubmit={this.handleSubmit1}>
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

          <br />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddPackages;