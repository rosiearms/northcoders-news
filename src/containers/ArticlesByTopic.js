import React from 'react';
import PT from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/ArticlesByTopic.css';
import fetchArticlesByTopic from '../actions/fetchArticlesByTopic';
import fetchArticles from '../actions/fetchArticles';

class ArticlesByTopic extends React.Component {
  componentDidMount() {
    const topicName = this.props.match.params.topic;
    this.props.fetchArticles();
    this.props.fetchArticlesByTopic(topicName);
  }
  render() {
    const {articles, loading, error} = this.props;
    return (
      <div className='articles'>
        {error && <Redirect to='/404' />}
        {loading || articles.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className='article-card'>
            <div className='tile is-ancestor is-vertical'>
              <h1>{this.props.match.params.topic}</h1>
              {articles.map(article => (
                <div  key={article._id} className='tile is-6 is-parent'>
                  <Link to={`/articles/${article._id}`}>
                    <div className='tile article is-child box'>
                      <h2>{article.title}</h2>
                    </div>
                  </Link>                
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
  fetchArticlesByTopic: PT.func.isRequired,
  fetchArticles: PT.func.isRequired,
  match: PT.string.isRequired
};

const mapStateToProps = state => ({
  articles: state.ArticlesReducer.data,
  loading: state.ArticlesReducer.loading,
  error: state.ArticlesReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticlesByTopic: (topic) => {
    dispatch(fetchArticlesByTopic(topic));
  },
  fetchArticles: () => {
    dispatch(fetchArticles());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesByTopic);