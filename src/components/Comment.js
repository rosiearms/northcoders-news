import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import deleteComment from '../actions/deleteComment';
import alterCommentVote from '../actions/alterCommentVote';
import fetchCommentsByArticle from '../actions/fetchCommentsByArticle';
import '../css/ArticleComments.css';

class SingleComment extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      votes: 0,
      voted: false
    }
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
        <div className='comment card'>
          <div className='card-content'>
          <h3>{`"${this.props.body}"`} <Link to={`/users/${this.props.created_by}`}>{this.props.created_by}</Link>
          </h3>
            <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                  RATING: {this.props.comment_votes + this.state.votes}
              </span>
            </p>
            {(this.state.voted === false) ?
              <div>
                <p className="card-footer-item">
                  <span>
                    <button onClick={this.incrementVote}><span className="icon is-small">
                      <i className="fa fa-2x fa-thumbs-up"></i>
                    </span></button>
                  </span>
                </p>
              </div> : 
              <div>
                <p className="card-footer-item">
                  <span>
                  Thanks for voting!
                  </span>
                </p>
              </div>
            }
            {(this.state.voted === false) ? 
              <div>
                <p className="card-footer-item">
                  <span>
                    <button onClick={this.decrementVote}><span className="icon is-small">
                      <i className="fa fa-2x fa-thumbs-down"></i>
                    </span></button>
                  </span>
                </p>
              </div> :
              <div> 
                <p className="card-footer-item">
                  <span>
                  </span>
                </p>
              </div> }
            <p className="card-footer-item">
              <span>
              {(this.props.created_by === 'northcoder') ? <span>
            <button className='delete is-medium' onClick={this.removeComment}>delete</button>
            <span>Delete</span></span> :
            <span>
            </span>}
              </span>
            </p>
            <p className="card-footer-item">
              <span>
              </span>
            </p>
            <p className="card-footer-item">
              <span>
              </span>
            </p>
            <p className="card-footer-item">
              <span>
              </span>
            </p>
          </footer>
            </div>
        </div>
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
  },
  alterCommentVote: (id, vote) => {
    dispatch(alterCommentVote(id, vote));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);