import React, { Component } from 'react';
class AddPackages1 extends Component{
    state = {
        pack: '',
        packs: [{
            text: 'A new todo name',
            done: true,
          }],
      };

      handleChange = (event) => {
        this.setState({
           pack: event.currentTarget.value,
        });
     }

     handleCheckbox = (index) => {
        const { packs } = this.state;
        packs[index].done = !packs[index].done;
        this.setState({
           packs,
        });
     }

     handleRemove = (index) => {
        // grab original todos from state
        const { packs } = this.state;
        // create an array excluding the array value based on the index
        this.setState({
           pack: '',
           packs: [
             ...packs.slice(0, index),
             ...packs.slice(index + 1),
           ],
         });
     }

     handleSubmit = (event) => {
        // grab original todos from state 
        const { packs } = this.state;
        // todo text is result
        // append new todo with default state to todos
        this.setState({
           pack: '',
           packs: [
              {
                 text: event.currentTarget.pack.value,
                 done: false,
              },
              ...packs,
           ],
        });
        event.preventDefault();
     }

    render(){
        
    const { pack , packs} = this.state;
        return(
            <div className="addPack">
            <header styles={{ margin: '20px 0 40px 0' }} className="App-header col col-12">
              <h1>LIST OF PACKAGES</h1>
            </header>
         <div className = "row"> 

          <div className="col s12 m6">
            
          <ul className="todos list-groups" style={{ padding: 0 }}>
   {(packs.length === 0)
      ? (<li className="todo list-group-item"> NO PACKAGES </li>)
      : (packs.map((item, key) => (
        <li checked={item.done} key={`list-${(key + 1)}`} className="todo list-group-item">
            <input onChange={() => this.handleCheckbox(key)} checked={item.done} className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="defaultCheck1" styles={{
              textDecoration: (item.done) ? 'line-through' : 'none', 
            }}
            >
              {item.text}
            </label>
            <button  onClick={() => this.handleRemove(key)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
         </button>
        </li>
      )))
   }
</ul>
</div>

<div className="col s12 m5 offset-m1">
<h1>ADD PACKAGE</h1>
      <main>
      <form onSubmit={this.handleSubmit} styles={{ marginTop : '0px' }}>
      <input onChange={this.handleChange} value={this.state.pack}  type="text" className="form-control" name="pack" aria-describedby="textHelp" autoComplete="off"  placeholder="Enter Serial Number"/>

    </form>
    </main>

    </div>

            </div>
          </div>
        )
    }
}
export default AddPackages1;