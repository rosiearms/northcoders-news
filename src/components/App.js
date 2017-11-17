import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Topics from './Topics';
import ArticlesByTopic from './ArticlesByTopic';
import Articles from './Articles';
import ArticleComments from './ArticleComments';
import Author from './Author';
import SingleArticle from './SingleArticle';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorPage from './ErrorPage';
import '../css/App.css';



class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/articles' component={Articles} />
            <Route exact path='/articles/:article_id' component={SingleArticle} />
            <Route exact path='/topics' component={Topics} />
            <Route exact path='/topics/:topic/articles' component={ArticlesByTopic} />
            <Route exact path='/articles/:article_id/comments' component={ArticleComments} />
            <Route exact path='/users/:username' component={Author} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
