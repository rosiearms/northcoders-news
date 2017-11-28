import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import fetchCommentsByArticle from '../actions/fetchCommentsByArticle';
import postNewComment from '../actions/postNewComment';
import Comment from './Comment';
import '../css/ArticleComments.css';

class ArticleComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const id = this.props.id;
    this.props.fetchCommentsByArticle(id);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const id = this.props.id;
    this.props.postNewComment(id, this.state.text);
    setTimeout(() => {this.props.fetchCommentsByArticle(id);}, 2000);
    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <div className='comment-page'>
        <div className='comment-box'>
          <form onSubmit = {this.handleSubmit}>
            <label>Have your say!
            </label>
            <br/>
            <input className='input-box' type ='text' onChange= {this.handleChange} value = {this.state.text}/>
            <input className="button" type="submit" value="Post"/>
          </form>
        </div>
        <div className='comment-card'>
            {this.props.comments.map((comment, i) => (
              <div key={i}>
                <Comment
                  comment_votes={comment.votes}
                  comment_id={comment._id}
                  created_by={comment.created_by}
                  body={comment.body}
                  article_id={this.props.id} />
            
              </div>
            ))}
          </div>
        </div>
    );
  }
}

ArticleComments.propTypes = {
  comments: PT.array.isRequired,
  error: PT.any,
  fetchCommentsByArticle: PT.func.isRequired,
  id: PT.string.isRequired,
  postNewComment: PT.func.isRequired

};


const mapStateToProps = (state) => {
  return {
    comments: state.fetchCommentsByArticleReducer.data,
    loading: state.fetchCommentsByArticleReducer.loading,
    error: state.fetchCommentsByArticleReducer.error
  };
};

const mapDispatchToProps = dispatch => ({
  postNewComment: (text, id) => {
    dispatch(postNewComment(text, id));
  },
  fetchCommentsByArticle: (id) => {
    dispatch(fetchCommentsByArticle(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComments);