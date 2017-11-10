import React from 'react';
import {Link} from 'react-router-dom';

class Topics extends React.Component {
  render() {
    return (
      <div>
        <h1>TOPICS</h1>
        <Link to='/topics/:topic/articles'>Articles about..</Link>
      </div>
    );
  }
}

export default Topics;