import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PT from 'prop-types';

const SingleArticleUI = ({ article, error, voted, incrementVote, decrementVote }) => (
  <div>
    {error && <Redirect to='/404' />}
    <div className='article-page'>
      <div className='single-article'>
        <div className="card">
          <div className="card-content">
            <p className="title is-marginless">
              {`“${article.body}”`}
            </p>
            <br />
            <p className="subtitle">
              <Link to={`/users/${article.created_by}`}>{article.created_by}</Link>
            </p>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                          RATING: {article.votes}
              </span>
            </p>
            {(voted === false) ?
              <div>
                <p className="card-footer-item">
                  <span>
                    <button onClick={incrementVote}><span className="icon is-small">
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
            {(voted === false) ?
              <div>
                <p className="card-footer-item">
                  <span>
                    <button onClick={decrementVote}><span className="icon is-small">
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
              </div>}
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
      </div>
    </div>
  </div>
);

SingleArticleUI.propTypes = {
  article: PT.object.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  id: PT.string.isRequired,
  start_vote: PT.number.isRequired, 
  voted: PT.bool.isRequired, 
  incrementVote: PT.func.isRequired, 
  decrementVote: PT.func.isRequired
};

export default SingleArticleUI;