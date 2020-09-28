import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
class DeletePackages extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users');
        this.unsubscribe = null;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            names: [], from: '', to: '', prefix: '', id1: undefined, email: '', check: true,
            loading: false, errorPackage: '', users: [], key: '', error: null, status: null, packages: [], assign: null
        }
    }

    handleSubmit = (e) => {
        let packages1 = [];
        this.setState({
            loading: true
        })
        for (var i = this.state.from; i <= this.state.to; i++) {
            packages1.push(this.state.prefix + i);
        }
        let assign = []
        if (this.state.packages.length === 0) {
            this.setState({
                loading: false,
                errorPackage: 'Can not delete packages : List is empty'
            })
        } else {
            if (this.state.packages.length > 0) {
                for (var i = 0; i < this.state.packages.length; i++) {
                    for (var j = 0; j < packages1.length; j++) {
                        if (this.state.packages[i].key === packages1[j] && this.state.packages[i].check === false) {
                            this.setState({
                                loading: false,
                                errorPackage: 'Can not delete assigned packages'
                            })
                            break;
                        }
                        else {
                            if (this.state.packages[i].key === packages1[j] && this.state.packages[i].check === true) {
                                console.log(this.state.packages[i].key)
                                firebase.firestore().collection('packages').doc(packages1[j]).delete().then(() => {
                                    this.setState({
                                        loading: false,
                                        status: true
                                    })
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });

                            }
                        }
                    }
                }
                this.props.history.push("/listPackages")

            }
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
                <h1>Delete Package</h1>
                <br />
                { this.state.errorPackage ? <div className="alert alert-success" role="alert">
                    {this.state.errorPackage}
                </div> : this.state.status ? <div className="alert alert-success" role="alert">
                    Packages deleted
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

export default DeletePackages;