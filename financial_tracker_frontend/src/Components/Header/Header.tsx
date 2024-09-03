import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">My Website</div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/login" className="login-button">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;