import React, { Component } from 'react'
import  AddPackages1 from './addPackages1'

class Packages1 extends Component {
  render() {
    console.log(this.props);
   const {packages} = this.props;
    return (
     <AddPackages1/>
    );
  }
}
export default Packages1