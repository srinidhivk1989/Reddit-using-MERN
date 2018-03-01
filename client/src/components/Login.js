import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: null
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(event) {
  this.setState({
    [event.target.name]: event.target.value
  });
}

handleSubmit(event) {
  event.preventDefault();
  let _this = this;

  axios.post('http://localhost:8080/api/login',this.state)
    .then(function (response) {
      if (response.data.status === 'error') {
        _this.setState({ errors: response.data.message })
      } else {
        _this.props.history.push({pathname:'/timeline',
        state:{detail:response.data}
    });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

render(){
  return(

    <div>
        <h2>login</h2>

        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email address</label>
            <input onChange={this.handleInput} value={this.state.email} name="email" type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="registerPassword">Password</label>
            <input onChange={this.handleInput} value={this.state.password} name="password" type="password" className="form-control" id="registerPassword" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
  )
}
}
export default withRouter(Login);
