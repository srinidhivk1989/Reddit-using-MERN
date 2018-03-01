
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class RetrievePost extends React.Component{
constructor(props){
  super(props);
  console.log(props);
  this.state={
    messages:null,

  }
}
componentDidMount(){
  let _this=this;
  axios.get('http://localhost:8080/api/retrievepost')
  .then(function(response)
{
  _this.setState({messages:response.data})

  console.log(response);

})
.catch(function(error){
  console.log(error);
})

}


  render(){

    return(
      <div>

    {this.state.messages &&
        this.state.messages.map(function(message){
        return (
          <div key={message._id}>
            <p>{message.postmsg}</p>
            <p>Uploader:{message.name}</p>
            <p>Upvotes:{message.upvote}</p>
            <Link to={`/upvotepost/${message._id}`} >Upvote</Link>
          </div>
        )
      })

  }

  </div>
    )
  }
}
export default RetrievePost;
