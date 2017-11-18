import React from 'react';
import PT from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchArticles from '../actions/fetchArticles';
import '../css/Articles.css';

class Articles extends React.Component {
  componentDidMount() {
    this.props.fetchArticles();
  }
  render() {
    const { articles, loading, error } = this.props;
    return (
      <div className='articles'>
        {error && <Redirect to='/404' />}
        {loading || articles.length === 0 ? (
          <p>Loading...</p>
        ) : (
            <div className='article-card'>
              <div className='tile is-ancestor is-vertical'>
                {articles.map(article => (
                  <div key={article._id} className='tile is-6 is-parent'>
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

Articles.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticles: PT.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.fetchArticlesReducer.data,
  loading: state.fetchArticlesReducer.loading,
  error: state.fetchArticlesReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => {
    dispatch(fetchArticles());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);