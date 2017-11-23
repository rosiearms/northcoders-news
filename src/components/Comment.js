import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import deleteComment from '../actions/deleteComment';
import fetchCommentsByArticle from '../actions/fetchCommentsByArticle';

class SingleComment extends React.Component {
  constructor (props) {
    super(props);
    this.removeComment = this.removeComment.bind(this);
  }

  removeComment() {
    this.props.deleteComment(this.props.comment_id);
    setTimeout(() => {this.props.fetchCommentsByArticle(this.props.article_id);}, 2000);
  }

  render() {
    return (
      <div>
        <h4><Link to={`/users/${this.props.created_by}`}>{this.props.created_by}</Link></h4>
        <div className='tile comment is-child-box'>
          <h3>{`"${this.props.body}"`}</h3>
          <br/>
          {(this.props.created_by === 'northcoder') ? <div>
            <button className='delete is-small' onClick={this.removeComment}>X</button></div> :
            <div>
            </div>}
        </div>
      </div>
    );
  }
}

SingleComment.propTypes = {
  error: PT.any,
  deleteComment: PT.func.isRequired,
  comment_id: PT.number.isRequired,
  fetchCommentsByArticle: PT.func.isRequired,
  article_id: PT.number.isRequired,
  created_by: PT.string.isRequired,
  body: PT.string.isRequired
};

const mapStateToProps = state => ({
  comments: state.fetchCommentsByArticleReducer.data,
  loading: state.fetchCommentsByArticleReducer.loading,
  error: state.fetchCommentsByArticleReducer.error
});

const mapDispatchToProps = dispatch => ({
  deleteComment: (comment_id) => {
    dispatch(deleteComment(comment_id));
  },
  fetchCommentsByArticle: (id) => {
    dispatch(fetchCommentsByArticle(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);