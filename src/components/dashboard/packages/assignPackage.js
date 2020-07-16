const { Component } = require("react");

class AssignPackage extends Component{
    render(){

        return(
            <div>
                <br/>
       <h1>Welcome to InfoDeck</h1>
       <br/>
       <form >
      <div className="form-group">
      <label htmlFor="exampleInputEmail1">Enter User's Email Address</label>
      <input  className="form-control" type="email" required  name="email"aria-describedby="emailHelp" placeholder="Enter email" />   
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>


        )
    }
}