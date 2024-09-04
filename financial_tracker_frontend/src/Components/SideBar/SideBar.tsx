// src/components/Profile/Sidebar.tsx
import React from 'react';
import './SideBar.css'; // Import the CSS file

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
            <div className={`side-bar ${isOpen ? 'open' : ''}`}>
                <button onClick={onClose} className="close-button">×</button>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default SideBar;