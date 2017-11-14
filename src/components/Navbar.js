import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <nav className='navbar'>
                    <div className='navbar-brand'>
                        <a className='navbar-item'><Link to='/'><span className="icon is-medium has-text-info">
                            <i className="fa fa-2x fa-home"></i>
                        </span></Link></a>
                        <a className='navbar-item'>
                            <img className='nc-logo' alt='logo' src='https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png' />
                        </a>
                    </div>
                </nav>
            </div>
        );
    }
}


export default HomePage;