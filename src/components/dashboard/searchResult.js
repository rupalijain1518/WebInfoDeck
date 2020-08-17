import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Result from './result'

class SearchResult extends Component {


    render(){

        return(
           <div>
               serach result
                {this.props.users.map( user =>
                    <Result user = {user} />
                )}
              </div>
            )


    }
}
export default SearchResult ;