import React, { useState } from 'react';
import CreateUserAPI from '../../API/CreateUserAPI';
import LoginUserToken from '../../API/LoginUserToken';
import './Auth.css';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLoginUser = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = await LoginUserToken(email, password);
            // Save tokens to localStorage
            console.log('User logged In sucessufuly', token);
            // Handle successful user creation (e.g., redirect, show message)
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error (e.g., show error message)
        }
    }

    const handleRegisterUser = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = await CreateUserAPI(email, password);
            // Save tokens to localStorage
            console.log('User created successfully:', token);
            // Handle successful user creation (e.g., redirect, show message)
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="auth-container">
            {isLogin ? (
                <div className="login-form">
                    <h2>Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Email:</label>
                            <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            id="username"
                            name="username"
                            required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            required />
                        </div>
                        <button onClick={handleLoginUser} type="submit" className="auth-button">Login</button>
                    </form>
                    <p className="toggle-text">
                        Don't have an account? <span onClick={toggleForm}>Register</span>
                    </p>
                </div>
            ) : (
                <div className="register-form">
                    <h2>Register</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button onClick={handleRegisterUser} type="submit" className="auth-button">Register</button>
                    </form>
                    <p className="toggle-text">
                        Already have an account? <span onClick={toggleForm}>Login</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Auth;