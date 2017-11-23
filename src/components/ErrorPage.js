import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ErrorPage.css';

const ErrorPage = () => (
  <div className='ErrorPage' >
    <img className='background-image' src='https://s-media-cache-ak0.pinimg.com/originals/a9/e4/d4/a9e4d44e5ea0dae6cae4ef6c68833b10.gif' alt='error-screen' />
    <h1>Errrm....maybe try that again...</h1>
    <br />
    <a className='button is-inverted'><Link to='/'>HOME</Link></a>
  </div>
);

export default ErrorPage;