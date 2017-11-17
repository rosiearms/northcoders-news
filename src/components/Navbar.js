import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <nav className='navbar'>
                    <div className='navbar-brand'>
                        <Link className='navbar-item' to='/'><span className="icon is-medium has-text-info">
                            <i className="fa fa-2x fa-home"></i>
                        </span></Link>
                        <a className='navbar-item' href='https://northcoders.com/start-coding?ads_cmpid=949839241&ads_adid=47028772797&ads_matchtype=b&ads_network=g&ads_creative=228828910521&utm_term=northcoders&ads_targetid=kwd-375530169794&utm_campaign=&utm_source=adwords&utm_medium=ppc&ttv=2&gclid=EAIaIQobChMI3_f-8M_G1wIVYbftCh2kLwu5EAAYASAAEgJz2vD_BwE'>
                            <img className='nc-logo' alt='logo' src='https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png' />
                        </a>
                    </div>
                </nav>
            </div>
        );
    }
}


export default HomePage;