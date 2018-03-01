import React from 'react';
import axios from 'axios';
import AddPost from './AddPost';
import RetrievePost from './RetrievePost';



class TimelinePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:null
    }
      this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout() {
      let _this = this;
      axios.get('http://localhost:8080/api/logout')
        .then(function (response) {
          _this.setState({ user: null })
          window.location.href='/';
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    componentDidMount()
    {
      let _this = this;
      axios.get('http://localhost:8080/api/current_user')
    .then(function (response) {
      console.log(response);
      if (response.data.error) {
        _this.setState({ loading: false })
      } else {
        _this.setState({ user: response.data })
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}


  render(){
    return(

      <div>
      <h1> Welcome </h1>
      <button onClick={this.handleLogout}>Logout</button>
      <AddPost user={this.props.location.state.detail} />
      <RetrievePost user={this.props.location.state.detail}/>

      </div>
    )
  }
}
export default TimelinePage;
