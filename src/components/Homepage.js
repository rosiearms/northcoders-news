import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Homepage.css';


class HomePage extends React.Component {
  render() {
    return (
      <div className='Homepage'>
      <section className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
          NORTHCODERS NEWS
          </h1>
          <h2 className="subtitle">
          Welcome to Northcoders very own blog site! Browse through our articles and user comments. If you have something to say about them make sure you post your own! Or vote for the articles you like the best....
          </h2>
        </div>
      </div>
    </section>
        <div className='columns'>
          <div className='column is-half'>
            <h3>Browse through all our <Link to='/articles'>articles...</Link></h3>
          </div>
          <div className='column is-half'>
            <h3>Or take a look at our <Link to='/topics'>topics...</Link></h3>
          </div>
        </div>
      </div>
    );
  }
}


export default HomePage;