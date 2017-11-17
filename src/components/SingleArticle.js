import React from 'react';
import PT from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchArticles from '../actions/fetchArticles';
import alterArticleVote from '../actions/alterArticleVote';
import ArticleComments from './ArticleComments';
import '../css/SingleArticle.css';

class SingleArticle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			votes: 0,
			voted: false
		}
		this.incrementVote = this.incrementVote.bind(this);
		this.decrementVote = this.decrementVote.bind(this);
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
										{article._id === id ? (
											<div className='single-article'>
												<section className="hero is-bold">
													<div className="hero-body">
														<div className="container">
															<h1 className="title">
																{article.title}</h1>
														</div>
													</div>
												</section>
												<div className="card">
													<div className="card-content">
														<p className="title">
															{`“${article.body}”`}
														</p>
														<p className="subtitle">
															<Link to={`/users/${article.created_by}`}>{article.created_by}</Link>
														</p>
													</div>
													<footer className="card-footer">
														<p className="card-footer-item">
															<span>
																RATING: {article.votes + this.state.votes}
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
											</div>) : ''}
									</div>
								))}
								<ArticleComments
									id={this.props.match.params.article_id} />
							</div>
						)}
				</div>

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