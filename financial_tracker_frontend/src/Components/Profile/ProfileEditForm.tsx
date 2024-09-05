// src/components/Profile/ProfileEdit.tsx
import React, { useState } from 'react';
import './ProfileEditForm.css';

interface ProfileEditFormProps {
  toggleEdit: () => void;
}


const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ toggleEdit }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
    });
  
    const [errors, setErrors] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const validate = () => {
      let valid = true;
      let errors = { name: '', email: '', password: '', confirmPassword: '' };
  
      if (!formData.name) {
        errors.name = 'Name is required';
        valid = false;
      }
  
      if (!formData.email) {
        errors.email = 'Email is required';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
        valid = false;
      }
  
      if (formData.password && formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        valid = false;
      }
  
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        valid = false;
      }
  
      setErrors(errors);
      return valid;
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validate()) {
        // Submit form data
        console.log('Form submitted:', formData);
      }
    };
  
    return (
      <div className="profile-edit-form">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <button className='profile-form-button' type="submit">Save Changes</button>
          <button className='profile-form-button' type="button" onClick={toggleEdit}>Cancel</button>
        </form>
      </div>
    );
  };

export default ProfileEditForm;