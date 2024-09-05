// src/components/Profile/ProfileDetails.tsx
import React, { useState, useEffect } from 'react';
import './ProfileDetails.css';
import { api } from '../../services/api';

interface ProfileDetailsProps {
    toggleEdit: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ toggleEdit }) => {
    const [user, setUser] = useState({ name: 'John Doe', email: '' });

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await api.get('/user/email');
                setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
            } catch (error) {
                console.error('Failed to fetch user email:', error);
            }
        };

        fetchUserEmail();
    }, []);

    return (
        <div className="profile-details">
            <h2>Profile Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Display other user details here */}
            <button onClick={toggleEdit} className="edit-button">Edit Profile</button>
        </div>
    );
};

export default ProfileDetails;