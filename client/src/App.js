import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import TimelinePage from './components/TimelinePage';
import UpvotePost from './components/UpvotePost';
class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/timeline" component={TimelinePage}/>
          <Route path="/upvotepost/:id" component={UpvotePost}/>

        </Switch>
      </Router>
    )
  }
}
export default App;
