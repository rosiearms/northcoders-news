import React from 'react';
import PT from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import fetchArticles from '../actions/fetchArticles';

class Articles extends React.Component {
  componentDidMount () {
    this.props.fetchArticles();
  }
  render() {
    const {articles, loading, error} = this.props;
    return(
      <div>
        <div>
          <h2>Articles...</h2>
          {error && <Redirect to='/404' />}
          {loading || articles.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div>
              {articles.map(article => (
                <div  key={article._id}>
                  <h3>{article.title}</h3>
        <p><Link to={`/articles/${article._id}/comments`}>Comments...</Link></p>
                </div>								
              ))}
            </div>
          )}
        </div>

        <p><Link to='/users/:username'>Author...</Link></p>
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