import React from 'react';
import axios from 'axios';

class Register extends React.Component{
  constructor(props){
  super(props);

    this.state={
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      registered:false,
      errors:null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
    handleInputChange(event){
    this.setState({
    [event.target.name]:event.target.value
  });
}
handleSubmit(event){
    event.preventDefault();
    let _this=this;
    axios.post('http://localhost:8080/api/register',this.state)
    .then(function(response){
      //console.log(response.data.errors);
      if (response.data.errors) {
            _this.setState({ errors: response.data.errors })
          }
          else if(response.data.status==='success'){
        _this.setState({registered:true})
      }
    })
    .catch(function(error){
      console.log(error);

    });
  }
  render(){
    return(
      <div>
      <h3>Register</h3>
      {this.state.registered
        ?
        <div>
          <p>Thank you for signing up.</p>
          <p> Please login...</p>
        </div>
        :
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <label htmlFor="registerName">Name</label>
              <input onChange={this.handleInputChange} name="name" type="text" value={this.state.name} className="form-control" id="registerName" placeholder="Enter name" />

            </div>


              <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input onChange={this.handleInputChange} name="password" type="password" value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
            </div>


              {this.state.errors && this.state.errors.password &&
                <p>{this.state.errors.password.msg}</p>}

                <div className="form-group">
                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                <input onChange={this.handleInputChange} name="confirmPassword" type="password" value={this.state.confirmPassword} className="form-control" id="exampleInputPassword2" placeholder="Enter Confirm Password" />
              </div>



                <div className="form-group">
                  <label htmlFor="registerEmail">Email</label>
                  <input onChange={this.handleInputChange} name="email" type="text" value={this.state.email} className="form-control" id="registerEmail" placeholder="Enter Email" />

                </div>

                {this.state.errors && this.state.errors.email &&
                <p>{this.state.errors.email.msg}</p>}


            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        }
      </div>


    )
  }
}
export default Register;
