
import React, {useContext} from 'react';
import {firebaseAuth} from '../../provider/AuthProvider'

const Login = () => {


  const {handleSignin, inputs, setInputs, errors} = useContext(firebaseAuth)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit')
    handleSignin()
    
  }
  const handleChange = e => {
    const {name, value} = e.target
    console.log(inputs)
    setInputs(prev => ({...prev, [name]: value}))
  }

  return (
<div> 
       <br/>
       <h1>Welcome to InfoDeck</h1>
       <br/>
       <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input  className="form-control" type="email" required onChange={handleChange} name="email"aria-describedby="emailHelp" placeholder="Enter email" value={inputs.email} />   
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
    
      <input type="password" className="form-control"  required onChange={handleChange} name="password" placeholder='password' value={inputs.password} />
      
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
<div >  
    {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
    </div>
  </form>
</div>

    );
};

export default Login;