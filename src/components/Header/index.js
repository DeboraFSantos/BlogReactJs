import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import firebase from '../../firebase';

function Header(){

   
        return(
            <header id="main-header">
                <div className="header-content">
                    <Link to="/">
                        PROGRAMAÇÃO
                    </Link>
                    <Link to="/login">
                        Painel
                    </Link>
                </div>
            </header>
        );
    
}

export default Header;