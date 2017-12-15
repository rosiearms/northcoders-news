import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import fetchSingleArticle from '../actions/fetchSingleArticle';
import alterArticleVote from '../actions/alterArticleVote';
import SingleArticleUI from '../components/SingleArticleUI';
import ArticleComments from './ArticleComments';
import '../css/SingleArticle.css';

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false
    };
    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
  }

  // componentWillMount(nextProps){
  //   console.log(nextProps);
  // }

  componentDidMount() {
    let id = this.props.match.params.article_id;
    this.props.fetchSingleArticle(id);
  }

  incrementVote() {
    const id = this.props.match.params.article_id;
    this.props.alterArticleVote(id, 'up');
    this.setState({
      voted: true
    });
  }

  decrementVote() {
    const id = this.props.match.params.article_id;
    this.props.alterArticleVote(id, 'down');
    this.setState({
      voted: true
    });
  }
  render() {
    return (
      <div>
        <SingleArticleUI
          article={this.props.article}
          error={this.props.error}
          voted={this.state.voted}
          incrementVote={this.incrementVote}
          decrementVote={this.decrementVote}
        />
        <ArticleComments
          id={this.props.match.params.article_id} />
      </div>
    );
  }
}

SingleArticle.propTypes = {
  article: PT.object.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchSingleArticle: PT.func.isRequired,
  alterArticleVote: PT.func.isRequired,
  match: PT.object.isRequired
};

const mapStateToProps = state => ({
  article: state.ArticleReducer.data,
  loading: state.ArticleReducer.loading,
  error: state.ArticleReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchSingleArticle: (id) => {
    dispatch(fetchSingleArticle(id));
  },
  alterArticleVote: (id, vote) => {
    dispatch(alterArticleVote(id, vote));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);