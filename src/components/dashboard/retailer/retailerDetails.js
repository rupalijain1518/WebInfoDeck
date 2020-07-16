 import React from 'react';
 const rd = (props) =>{
    
    const id = props.match.params.id;
    return (
        <div className="card" styles="width: 18rem;">
        <div className="card-body">
    <h5 className="card-title">Card title {id}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a className="card-link">Card link</a>
          <a  className="card-link">Another link</a>
        </div>
      </div>
     );
 }
 export default rd;
