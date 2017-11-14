import React from 'react';
import '../css/Footer.css';

class Footer extends React.Component {
    render () {
        const currentYear = new Date().getFullYear();
        return (
            <footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        <strong>Northcoders News</strong> by <a href="https://github.com/rosiearms">Rosie Armstrong</a>
  <p className='copyright'>© NCnews {currentYear}</p>
      </p>
    </div>
  </div>
</footer>
    );
};

}


export default Footer;