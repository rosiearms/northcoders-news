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
		setTimeout(() => {this.props.fetchCommentsByArticle(this.props.article_id)}, 2000)
	}

	render() {
		return (
			<div>
				<h4><Link to={`/users/${this.props.created_by}`}>{this.props.created_by}</Link></h4>
            <div className='tile comment is-child-box'>
            <h3>{`"${this.props.body}"`}</h3>
            {(this.props.created_by === 'northcoder') ? <div>
              <button onClick={this.removeComment}>delete</button></div> :
              <div>
                <button disabled='true'>delete</button></div>}
            </div>
			</div>
		);
	}
}

SingleComment.propTypes = {
	error: PT.any
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