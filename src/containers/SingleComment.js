import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import deleteComment from '../actions/deleteComment';
import alterCommentVote from '../actions/alterCommentVote';
import fetchCommentsByArticle from '../actions/fetchCommentsByArticle';
import SingleCommentUI from '../components/SingleCommentUI';
import '../css/ArticleComments.css';

class SingleComment extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      votes: 0,
      voted: false
    };
    this.removeComment = this.removeComment.bind(this);
    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
  }

  removeComment() {
    this.props.deleteComment(this.props.comment_id);
    setTimeout(() => {this.props.fetchCommentsByArticle(this.props.article_id);}, 2000);
  }

  incrementVote() {
    const id = this.props.comment_id;
    this.props.alterCommentVote(id, 'up');
    this.setState({
      votes: this.state.votes + 1,
      voted: true
    });
  }

  decrementVote() {
    const id = this.props.comment_id;
    this.props.alterCommentVote(id, 'down');
    this.setState({
      votes: this.state.votes - 1,
      voted: true
    });
  }

  render() {
    return (
      <div>
        <SingleCommentUI
          body={this.props.body}
          created_by={this.props.created_by}
          comment_votes={this.props.comment_votes}
          start_vote={this.state.votes}
          voted={this.state.voted}
          incrementVote={this.incrementVote}
          decrementVote={this.decrementVote}
          removeComment={this.removeComment}
        />
      </div>
    );
  }
}

SingleComment.propTypes = {
  error: PT.any,
  deleteComment: PT.func.isRequired,
  comment_id: PT.string.isRequired,
  fetchCommentsByArticle: PT.func.isRequired,
  article_id: PT.string.isRequired,
  created_by: PT.string.isRequired,
  body: PT.string.isRequired,
  comment_votes: PT.number.isRequired,
  alterCommentVote: PT.func.isRequired
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
  },
  alterCommentVote: (id, vote) => {
    dispatch(alterCommentVote(id, vote));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);