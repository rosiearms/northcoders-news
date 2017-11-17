import React from 'react';
import '../css/Footer.css';

class Footer extends React.Component {
    render () {
        const currentYear = new Date().getFullYear();
        return (
            <footer className="footer">
  <div className="container">
    <div className="content has-text-centered">
        <strong>Northcoders News</strong> by <a href="https://github.com/rosiearms">Rosie Armstrong</a>
  <p className='copyright'>© NCnews {currentYear}</p>
    </div>
  </div>
</footer>
    );
};

}


export default Footer;