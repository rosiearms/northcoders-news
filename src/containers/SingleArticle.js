import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import fetchArticles from '../actions/fetchArticles';
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
    this.props.fetchArticles();
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
        {console.log(this.props.articles)}
        <SingleArticleUI
          articles={this.props.articles}
          loading={this.props.loading}
          error={this.props.error}
          id={this.props.match.params.article_id}
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
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticles: PT.func.isRequired,
  alterArticleVote: PT.func.isRequired,
  match: PT.object.isRequired
};

const mapStateToProps = state => ({
  articles: state.ArticlesReducer.data,
  loading: state.ArticlesReducer.loading,
  error: state.ArticlesReducer.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => {
    dispatch(fetchArticles());
  },
  alterArticleVote: (id, vote) => {
    dispatch(alterArticleVote(id, vote));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);