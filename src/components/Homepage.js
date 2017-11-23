import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Homepage.css';


class HomePage extends React.Component {
  render() {
    return (
      <div className='Homepage is-marginless'>
        <section className="hero is-medium is-marginless">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
          NORTHCODERS NEWS
              </h1>
              <h2 className="subtitle">
          Welcome to Northcoders very own blog site! Have a browse through our articles and user comments. If you have something to say about them make sure you post your own comment or just make a vote. Also, if you like what a user is writing, click on their username to see all the articles they have written. Enjoy! 
              </h2>
            </div>
          </div>
          <div className='hero-footer'>
        <div className='container'>
        <Link to='/articles'>
          <div className='button is-inverted first'>
            <h3>All Articles</h3>
          </div>
          </Link>
          <Link to='/topics'>
          <div className='button second'>
            <h3>Topics</h3>
          </div>
          </Link>
        </div>
        </div>
        </section>
      </div>
    );
  }
}


export default HomePage;