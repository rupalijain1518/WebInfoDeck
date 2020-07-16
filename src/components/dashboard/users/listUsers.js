import React, { Component } from 'react'

class Users extends Component {
  render() {
    return (
      <div>
      <table className="table table-striped table-sm">
            <thead className ="table-striped">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
          <tbody>
          <tr>
          <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
          <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
    <tr>
          <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
    <tr>
          <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
        </tbody>
      
      </table>
      </div>
      );
  }
}

export default Users
