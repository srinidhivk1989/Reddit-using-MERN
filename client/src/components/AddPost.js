import React from 'react';
import axios from 'axios';


class AddPost extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      postmsg:'',

      name:this.props.user.name,
      user_id:this.props.user._id
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    handleSubmit(event){
      event.preventDefault();
      //let _this=this;
      axios.post('http://localhost:8080/api/addpost',{postmsg:this.state.postmsg,
                                                      name:this.state.name
                                                      })
      .then(function(response){
        console.log(response);
      window.location.href='/timeline';

      })
      .catch(function(error){
        console.log(error);

      });
    }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
  <label htmlFor="postmsg">Post on Reddit</label>
  <textarea className="form-control" onChange={this.handleInputChange} name="postmsg"  value={this.state.postmsg} id="postmsg" rows={3}/>
      </div>

  <button type="submit" className="btn btn-primary">Post</button>
</form>
    )
    }
  }
  export default AddPost;
