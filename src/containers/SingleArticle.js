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
      votes: 0,
      voted: false
    };
    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.article_id;
    this.props.fetchSingleArticle(id);
  }

  incrementVote() {
    const id = this.props.match.params.article_id;
    this.props.alterArticleVote(id, 'up');
    this.setState({
      votes: this.state.votes + 1,
      voted: true
    });
  }

  decrementVote() {
    const id = this.props.match.params.article_id;
    this.props.alterArticleVote(id, 'down');
    this.setState({
      votes: this.state.votes - 1,
      voted: true
    });
  }
  render() {
    return (
      <div>
        <SingleArticleUI
          article={this.props.article}
          error={this.props.error}
          start_vote={this.state.votes}
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
  article: state.ArticlesReducer.data,
  loading: state.ArticlesReducer.loading,
  error: state.ArticlesReducer.error
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