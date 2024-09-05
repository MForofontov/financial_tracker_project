import React from 'react';
import SideBar from '../SideBar/SideBar';
import './DashBoard.css';

interface DashBoardProps {
    isSidebarVisible: boolean;
}


const Dashboard: React.FC<DashBoardProps> = ({isSidebarVisible}) => {
  // Example user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    recentActivities: [
      'Logged in from a new device',
      'Updated profile information',
      'Added a new expense',
    ],
  };

  return (
    <div className={`dashboard ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
        {<SideBar isSidebarVisible={isSidebarVisible} />}
      <header className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>{user.email}</p>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Activities</h2>
          <ul>
            {user.recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <button className="dashboard-button">Add Expense</button>
          <button className="dashboard-button">View Reports</button>
          <button className="dashboard-button">Update Profile</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;