import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

class Result extends Component {


    render(){

        return(
            <table class="table">
            <tbody>
                
              <tr>
        <th scope="row">{this.props.user.name}</th>
                <td>{this.props.user.key}</td>
                <td>aa</td>
                <td>bb</td>
              </tr>
              
            </tbody>
          </table>
        
            )


    }
}
export default Result ;