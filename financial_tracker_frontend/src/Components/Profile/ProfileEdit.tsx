// src/components/Profile/ProfileEdit.tsx
import React, { useState } from 'react';

interface ProfileEditProps {
    toggleEdit: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ toggleEdit }) => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    // Add other user details here

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to API
        toggleEdit();
    };

    return (
        <div className="profile-edit">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* Add other form fields here */}
                <button type="submit" className="auth-button">Save</button>
                <button type="button" onClick={toggleEdit} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default ProfileEdit;