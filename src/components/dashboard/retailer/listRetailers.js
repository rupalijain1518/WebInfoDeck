import React from 'react';
import RetailerSummary from './retailerSummary';
const Retailers = () =>{
    return( 
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
 
  <RetailerSummary/>
  </tbody>

</table>
</div>
    );
}

export default Retailers