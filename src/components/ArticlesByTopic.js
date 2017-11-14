import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import fetchArticlesByTopic from '../actions/fetchArticlesByTopic';

class ArticlesByTopic extends React.Component {
  componentDidMount() {
    const topicName = this.props.match.params.topic;
    this.props.fetchArticlesByTopic(topicName);
  }
  render() {
    return (
      <div>
        {this.props.articles.map(article => (
          <div key={article._id}>
            <h3>{article.title}</h3><Link to={`/articles/${article._id}`}>...</Link>
          </div>
        ))}
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