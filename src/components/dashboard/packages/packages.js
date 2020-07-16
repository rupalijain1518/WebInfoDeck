import React, { Component } from 'react'
import AddPackages from './addPacakage'
import ListPackage from './ListPackage'

class Packages extends Component {
  render() {
    console.log(this.props);
   const {packages} = this.props;
    return (
      <div className="package container">
        <div className="row">
          <div className="col s12 m6">
            
          <ListPackage/>
          </div>
          <div className="col s12 m5 offset-m1">
          <AddPackages />
          </div>
        </div>
      </div>
    );
  }
}
export default Packages