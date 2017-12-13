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

Articles.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticles: PT.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.ArticlesReducer.data,
  loading: state.ArticlesReducer.loading,
  error: state.ArticlesReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => {
    dispatch(fetchArticles());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);