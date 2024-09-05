// src/components/Profile/ProfilePage.tsx
import React, { useState } from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileEditForm from './ProfileEditForm';
import SideBar from '../SideBar/SideBar'; // Import the Sidebar component
import './ProfilePage.css'; // Import the CSS file

interface ProfilePageProps {
    isSidebarVisible: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isSidebarVisible }) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={`profile-page ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
            {<SideBar isSidebarVisible={isSidebarVisible} />}
            <div className="profile-content">
                <h1>Profile Page</h1>
                {isEditing ? (
                    <ProfileEditForm toggleEdit={toggleEdit} />
                ) : (
                    <ProfileDetails toggleEdit={toggleEdit} />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;