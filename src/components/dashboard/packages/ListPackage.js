import React, { Component } from 'react'
import PackageSummary from './packageSummary'

const ListPackage = ({packages : packages}) =>{

  return (
    <div>
    <table className="table table-striped table-sm">
          <thead className ="table-striped">
        <tr>
          <th scope="col">#</th>
          <th scope="col">serial number</th>
          <th scope="col">check</th>
        </tr>
      </thead>
        <tbody>
 
     <PackageSummary  />
   
      </tbody>
    
    </table>
    </div>

  );
}
export default ListPackage;