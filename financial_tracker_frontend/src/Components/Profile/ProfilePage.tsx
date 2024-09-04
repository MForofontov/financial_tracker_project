// src/components/Profile/ProfilePage.tsx
import React, { useState } from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileEdit from './ProfileEdit';

import Header from '../Header/Header'; // Import the Header component
import Sidebar from '../SideBar/SideBar'; // Import the Sidebar component
import './ProfilePage.css'; // Import the CSS file

const ProfilePage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`profile-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <div className="profile-content">
                <h1>Profile Page</h1>
                {isEditing ? (
                    <ProfileEdit toggleEdit={toggleEdit} />
                ) : (
                    <ProfileDetails toggleEdit={toggleEdit} />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;