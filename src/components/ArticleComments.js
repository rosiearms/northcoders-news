import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import fetchCommentsByArticle from '../actions/fetchCommentsByArticle';
import postNewComment from '../actions/postNewComment';

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
    const id = this.props.match.params.article_id;
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
    const id = this.props.match.params.article_id;
    this.props.postNewComment(text, id);
    setTimeout(() => {this.props.fetchCommentsByArticle(id)}, 500)
    this.setState({
      text: ''
    })
  }
  render() {
    return (
      <div>
        <div>
        <form onSubmit = {this.handleSubmit}>
          <label>Add a comment</label>
          <br/>
          <input type ='text' onChange= {this.handleChange} value = {this.state.text}/>
          <input type = 'submit'/>
        </form>
      </div>
        {this.props.comments.map(comment => (
          <div key={comment._id}>
            <h3>{`${comment.body}...`}</h3>
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
  postNewComment: (text, id) => {
    dispatch(postNewComment(text, id));
  },
  fetchCommentsByArticle: (id) => {
    dispatch(fetchCommentsByArticle(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComments);