import React from 'react';

import Register from './Register';
import Login from './Login';
class HomePage extends React.Component{
  render(){
    return(
        <div>
          <p>Howdy, Welcome to Reddit!</p>
          <Register />
          <Login />
        </div>
    )
  }
}
export default HomePage;
