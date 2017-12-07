import React from 'react';
import PT from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchUser from '../actions/fetchUser';
import fetchArticles from '../actions/fetchArticles';
import '../css/Author.css';

class User extends React.Component {
  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.fetchUser(username);
    this.props.fetchArticles();
  }
  render() {
    const { articles, user, loading, error } = this.props;
    return (
      <div>
        {error && <Redirect to='/404' />}
        {loading || this.props.user.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className='author'>
            <div className='hero'>
              <div className="hero-body">
                <div className='container'>
                  <div className="title">
                    {user.profileData[0].name}
                  </div>
                  <p className="subtitle">{user.profileData[0].username}</p>
                  <p className='description'>{`Take a look at all of ${user.profileData[0].username}'s articles below`}</p>
                </div>
              </div>
            </div>
            <div className='author-articles'>
              <div className='tile author-articles is-ancestor'>
                <div className='tile is-6 is-vertical is-parent'>
                  {articles.map(article => (
                    <Link key={article._id} to={`/articles/${article._id}`}> <div key={article._id}>
                      {(article.created_by === this.props.match.params.username) ?
                        <div className='tile article is-child box'>
                          <h1>{article.title}</h1>
                         
                        </div> : null
                      }
                    </div> </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

User.propTypes = {
  articles: PT.array.isRequired,
  user: PT.object.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchUser: PT.func.isRequired,
  match: PT.string.isRequired,
  fetchArticles: PT.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.ArticlesReducer.data,
  user: state.fetchUserReducer.data,
  loading: state.fetchUserReducer.loading,
  error: state.fetchUserReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchUser: (username) => {
    dispatch(fetchUser(username));
  },
  fetchArticles: () => {
    dispatch(fetchArticles());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);