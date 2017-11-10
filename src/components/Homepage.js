import React from 'react';
import {Link} from 'react-router-dom';


class HomePage extends React.Component {
  render () {
    return (
      <div>
        <h1>NORTHCODERS NEWS</h1>
        <h2>Articles from Northcoders....</h2>
        <h3>Search by<Link to='/topics'>topic</Link></h3>
        <h3>View all <Link to='/articles'>articles...</Link></h3>
        <ul>
          <li>Article, author, comments for the article</li>
        </ul>
      </div>
    );
  }
}


export default HomePage;