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
                Welcome to Northcoders very own blog site! Have a browse through our articles... vote, comment and enjoy!
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
              <div className='dropdown is-hoverable'>
                <div className='dropdown-trigger'>
                  <button className='button second' aria-haspopup='true' aria-controls='dropdown-menu'>
                    <span>Topics</span>
                    <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <Link to={`/topics/football/articles`} class="dropdown-item">
                      Football
      </Link>
                    <Link to={`/topics/cooking/articles`} class="dropdown-item">
                      Cooking
      </Link>
                    <Link to={`/topics/coding/articles`} class="dropdown-item">
                      Coding
      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


export default HomePage;