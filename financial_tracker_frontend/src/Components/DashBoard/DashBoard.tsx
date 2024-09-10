import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import ScrollableBox from './ScrollableBox';
import SideBar from '../SideBar/SideBar';
import DateModal from './DateModal';
import PieChartExpenses from './PieChartExpenses';
import './DashBoard.css';

interface DashBoardProps {
    isSidebarVisible: boolean;
}

interface RecordsOverviewProps {
  user: number;
  account: number;
  amount: number;
  date: string;
  description: string;
  category_name: string;
  transaction_type_name: string;
}

const Dashboard: React.FC<DashBoardProps> = ({isSidebarVisible}) => {

  const [transactions, setTransactions] = useState<RecordsOverviewProps[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [account, setAccount] = useState('acc1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [datesSet, setDatesSet] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formattedStartOfMonth = startOfMonth.toISOString().split('T')[0];
    const formattedEndOfMonth = endOfMonth.toISOString().split('T')[0];

    setStartDate(formattedStartOfMonth);
    setEndDate(formattedEndOfMonth);
    setDatesSet(true); // Indicate that the dates have been set
  }, []);

  useEffect(() => {
    if (datesSet) {
      // Perform actions that depend on the dates being set
      fetchData();
    }
  }, [datesSet]);

  const fetchData = () => {
    // Fetch transactions from API with parameters
    const params = {
      account: account,
      start_date: startDate,
      end_date: endDate,
    };

    api.get('/filtered-transactions/', { params })
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

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
    <div className={`dashboard-container ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
    {<SideBar isSidebarVisible={isSidebarVisible} />}
    <div className="dashboard-main">
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
          <PieChartExpenses transactions={transactions}/>
        </div>
        <div className="dashboard-section">
          <div className='records-overview-title-container'>
          <h2>Records Overview</h2>
          <button className="vertical-dots-button" onClick={() => setIsModalOpen(true)}>&#8942;</button>
          </div>
          <DateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="date-filter">
              <label>
                Start Date:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <button className="dashboard-button" onClick={() => { fetchData(); setIsModalOpen(false); }}>Fetch Data</button>
            </div>
          </DateModal>
          <ScrollableBox transactions={transactions} />
        </div>
      </section>
    </div>
  </div>
  );
};

export default Dashboard;