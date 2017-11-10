import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Topics from './Topics';
import ArticlesByTopic from './ArticlesByTopic';
import Articles from './Articles';
import ArticleComments from './ArticleComments';
import Author from './Author';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/articles' component={Articles} />
            <Route exact path='/topics' component={Topics} />
            <Route exact path='/topics/:topic/articles' component={ArticlesByTopic} />
            <Route exact path='/articles/:article_id/comments' component={ArticleComments} />
            <Route exact path='/users/:username' component={Author} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
