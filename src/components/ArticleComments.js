import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import fetchCommentsByArticle from '../actions/fetchCommentsByArticle';

class ArticleComments extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchCommentsByArticle(id);
  }
  render() {
    return (
      <div>
        {this.props.comments.map(comment => (
          <div key={comment._id}>
            <h3>{comment.body}</h3>
            <h4>{comment.created_by}</h4>
          </div>
        ))}
      </div>
    );
  }
}
ArticleComments.propTypes = {
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchCommentsByArticle: PT.func.isRequired
};


const mapStateToProps = (state) => {
  return {
  comments: state.fetchCommentsByArticleReducer.data,
  loading: state.fetchCommentsByArticleReducer.loading,
  error: state.fetchCommentsByArticleReducer.error
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCommentsByArticle: (id) => {
    dispatch(fetchCommentsByArticle(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComments);