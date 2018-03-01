
import React from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';
class UpvotePost extends React.Component {

constructor(props){
super(props);
console.log(props);


}

  componentDidMount() {
    let _this = this;
    axios.put("http://localhost:8080/api/upvotepost/"+ this.props.match.params.id)
      .then(function (response) {
        _this.setState({ upvotes: response.data.upvote })
        //window.location.href='/timeline';
      })
      .catch(function (error) {
        console.log(error);
      });
  }
render(){

  return(

      <h3>Your upvote has been recorded</h3>

  )
}
}
export default UpvotePost;
