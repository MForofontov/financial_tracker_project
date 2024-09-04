import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import SideBar from '../SideBar/SideBar';
import './Header.css'; // Import the CSS file


interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = true; // Replace with actual authentication logic

    const logout = async () => {
        // Add your logout logic here
        await logout();
        navigate('/login/');
    };

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        toggleSidebar(); // Call the prop function to notify the parent component
    };

    const toggleProfileSidebar = () => {
        setIsProfileSidebarOpen(!isProfileSidebarOpen);
    };

    return (
        <header className="header">
            <button onClick={handleToggleSidebar} className="sidebar-toggle-button">☰</button>
            {isSidebarOpen && <SideBar onClose={handleToggleSidebar} />}
            <div className="logo">My Website</div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                    {isAuthenticated ? (
                        <>
                            <li><a href="/profile">Profile</a></li>
                            {location.pathname === '/profile' && (
                                <li>
                                    <button onClick={toggleProfileSidebar} className="profile-sidebar-toggle-button">
                                        ☰
                                    </button>
                                </li>
                            )}
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <li><a href="/login">Login</a></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
