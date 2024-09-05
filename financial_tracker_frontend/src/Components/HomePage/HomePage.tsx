import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './HomePage.css';

const HomePage: React.FC = () => {
    // const { isAuthenticated, login } = useAuth();
    // const navigate = useNavigate();

    // if (isAuthenticated) {
    //     navigate('/profile');
    // }

    // if (isAuthenticated === null) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="home-page">
        <header className="home-header">
            <h1>Welcome to Financial Tracker</h1>
            <p>Your personal finance management tool</p>
        </header>
        <section className="home-content">
            <div className="feature">
            <h2>Track Your Expenses</h2>
            <p>Keep an eye on your spending and manage your budget effectively.</p>
            </div>
            <div className="feature">
            <h2>Set Financial Goals</h2>
            <p>Plan and achieve your financial goals with our easy-to-use tools.</p>
            </div>
            <div className="feature">
            <h2>Get Insights</h2>
            <p>Analyze your financial data and make informed decisions.</p>
            </div>
        </section>
        <section className="home-extra">
            <div className="testimonial">
            <h2>What Our Users Say</h2>
            <p>"Financial Tracker has transformed the way I manage my finances. Highly recommended!" - Alex</p>
            </div>
            <div className="cta">
            <h2>Get Started Today</h2>
            <p>Join thousands of users who are taking control of their finances.</p>
            <button className="cta-button">Sign Up Now</button>
            </div>
        </section>
        <footer className="home-footer">
            <p>Contact us: info@financialtracker.com</p>
        </footer>
        </div>
    );
};

export default HomePage;