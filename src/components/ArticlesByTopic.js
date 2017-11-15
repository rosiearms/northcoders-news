import React from 'react';
import PT from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/Articles.css';
import fetchArticlesByTopic from '../actions/fetchArticlesByTopic';

class ArticlesByTopic extends React.Component {
  componentDidMount() {
    const topicName = this.props.match.params.topic;
    this.props.fetchArticlesByTopic(topicName);
  }
  render() {
    const {articles, loading, error} = this.props;
    return (
      <div className='articles'>
         <section className="hero is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Articles
          </h1>
          <h2 className="subtitle">
          Click 'Read more' to view the full article. Don't forget to vote if you like it, or vote down if you don't!
          </h2>
        </div>
      </div>
      </section>
      {error && <Redirect to='/404' />}
      {loading || articles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className='article-card'>
        <div className='tile is-ancestor is-vertical'>
          {articles.map(article => (
            <div  key={article._id} className='tile is-6 is-parent'>
              <div className='tile article is-child box'>
              <h1>{article.title}</h1>
              <h3><Link to={`/articles/${article._id}`}>Read more...</Link></h3>                  
              </div>
            </div>								
          ))}
        </div>
        </div>
      )}
      </div>
    );
  }
}
ArticlesByTopic.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticlesByTopic: PT.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.fetchArticlesByTopicReducer.data,
  loading: state.fetchArticlesByTopicReducer.loading,
  error: state.fetchArticlesByTopicReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticlesByTopic: (topic) => {
    dispatch(fetchArticlesByTopic(topic));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesByTopic);