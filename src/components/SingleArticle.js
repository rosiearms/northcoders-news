import React from 'react';
import PT from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchArticles from '../actions/fetchArticles';
import alterArticleVote from '../actions/alterArticleVote';

class SingleArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: 0
        }
        this.incrementVote = this.incrementVote.bind(this);
        this.decrementVote = this.decrementVote.bind(this);
    }

    incrementVote() {
        const id = this.props.match.params.article_id; 
        this.props.alterArticleVote(id, 'up');
        this.setState({
            votes: this.state.votes + 1
        });
    }

    decrementVote() {
        const id = this.props.match.params.article_id;
        this.props.alterArticleVote(id, 'down');
        this.setState({
            votes: this.state.votes - 1
        });
    }
    render() {
        const { articles, loading, error } = this.props;
        const id = this.props.match.params.article_id;
        return (
            <div>
                <div>
                    {error && <Redirect to='/404' />}
                    {loading || articles.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                            <div>
                                {articles.map(article => (
                                    <div key={article._id}>
                                        {article._id === id ? (<div>
                                            <h1>{article.title}</h1>
                                            <p>{article.body}</p>
                                            <p>{article.votes + this.state.votes}</p><button onClick={this.incrementVote}>up</button><button onClick={this.decrementVote}>down</button>
                                        </div>) : ''}
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                <p><Link to='/users/:username'>Author...</Link></p>
            </div>
        );
    }
}

SingleArticle.propTypes = {
    articles: PT.array.isRequired,
    loading: PT.bool.isRequired,
    error: PT.any,
    fetchArticles: PT.func.isRequired,
    alterArticleVote: PT.func.isRequired
};

const mapStateToProps = state => ({
    articles: state.fetchArticlesReducer.data,
    loading: state.fetchArticlesReducer.loading,
    error: state.fetchArticlesReducer.error
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