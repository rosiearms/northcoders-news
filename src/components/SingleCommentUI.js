import React from 'react';
import { Link } from 'react-router-dom';
import PT from 'prop-types';

const SingleCommentUI = ({ body, created_by, comment_votes, start_vote, voted, incrementVote, decrementVote, removeComment }) => (
  <div>
    <div className='comment card'>
      <div className='card-content'>
        <h3>{`"${body}"`} <Link to={`/users/${created_by}`}>{created_by}</Link>
        </h3>
        <footer className="card-footer">
          <p className="card-footer-item">
            <span>
              RATING: {comment_votes + start_vote}
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
              {(created_by === 'northcoder') ? <span>
                <button className='delete is-medium' onClick={removeComment}>delete</button>
                <span>Delete</span></span> :
                <span>
                </span>}
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
);

SingleCommentUI.propTypes = {
  body: PT.string.isRequired,
  created_by: PT.string.isRequired,
  comment_votes: PT.number.isRequired,
  start_vote: PT.number.isRequired,
  voted: PT.bool.isRequired,
  incrementVote: PT.func.isRequired,
  decrementVote: PT.func.isRequired,
  removeComment: PT.func.isRequired
};

export default SingleCommentUI;