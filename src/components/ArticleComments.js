import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import fetchCommentsByArticle from '../actions/fetchCommentsByArticle';
import postNewComment from '../actions/postNewComment';
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

  handleSubmit(e) {
    e.preventDefault();
    const {text} = this.state;
    const id = this.props.id;
    this.props.postNewComment(text, id);
    setTimeout(() => {this.props.fetchCommentsByArticle(id)}, 2000)
    this.setState({
      text: ''
    })
  }
  render() {
    return (
      <div>
        <div className='comment-box'>
        <form onSubmit = {this.handleSubmit}>
          <label>Don't just vote, have your say too!
          </label>
          <br/>
          <input className='input-box' type ='text' onChange= {this.handleChange} value = {this.state.text}/>
          <input class="button" type="submit" value="Post"/>
        </form>
      </div>
      <div className='comment-card'>
      <div className='tile is-ancestor is-vertical'>
        {this.props.comments.map(comment => (
          <div className='tile is-7 is parent' key={comment._id}>
            <h4>{comment.created_by}</h4>
            <div className='tile comment is-child-box'>
            <h3>{`"${comment.body}"`}</h3>
            </div>
          </div>
        ))}
        </div>
        </div>
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
  postNewComment: (text, id) => {
    dispatch(postNewComment(text, id));
  },
  fetchCommentsByArticle: (id) => {
    dispatch(fetchCommentsByArticle(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComments);