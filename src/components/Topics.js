import React from 'react';
import {Link} from 'react-router-dom';
import PT from 'prop-types'
import { connect } from 'react-redux';
import fetchTopics from '../actions/fetchTopics';

class Topics extends React.Component {
  componentDidMount() {
    this.props.fetchTopics();
  }
  render() {
    return (
      <div>
        <h1>TOPICS</h1>
        <nav>
        {this.props.topics.map(topic => (
          <Link key={topic._id} to={`/topics/${topic.slug}/articles`}>{topic.title}</Link>
        ))}
        </nav>
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
