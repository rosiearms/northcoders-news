import React from 'react';
import { Link } from 'react-router-dom';
import PT from 'prop-types'
import { connect } from 'react-redux';
import fetchTopics from '../actions/fetchTopics';
import '../css/Topics.css';

class Topics extends React.Component {
  componentDidMount() {
    this.props.fetchTopics();
  }
  render() {
    return (
      <div className='topics'>
      <section className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            TOPICS
          </h1>
          <h2 className="subtitle">
          Choose the topic you want to read about....
          </h2>
        </div>
      </div>
    </section>
        <div className="columns">
          {this.props.topics.map(topic => (
            <div className="column">
              <h1>{topic.title}</h1>
              {(topic.title === 'Football') ?  <Link key={topic._id} to={`/topics/${topic.slug}/articles`}><img src='https://i.gjcdn.net/data/fireside/posts/0/162/162/media/bouncebounce-s7ryhwwt.gif' alt='playing-football'/></Link> : (topic.title === 'Cooking') ? <Link key={topic._id} to={`/topics/${topic.slug}/articles`}><img src='https://img.buzzfeed.com/buzzfeed-static/static/2016-06/10/14/asset/buzzfeed-prod-fastlane02/anigif_sub-buzz-24586-1465583133-4.gif' alt='making-a-burger'/></Link> : (topic.title === 'Coding') ?  <Link key={topic._id} to={`/topics/${topic.slug}/articles`}><img src='https://media.giphy.com/media/gU25raLP4pUu4/giphy.gif' alt='code-screen'/> </Link>: ''
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Topics.propTypes = {
  topics: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchTopics: PT.func.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    topics: state.fetchTopicsReducer.data,
    loading: state.fetchTopicsReducer.loading,
    error: state.fetchTopicsReducer.error
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTopics: () => {
    dispatch(fetchTopics());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
