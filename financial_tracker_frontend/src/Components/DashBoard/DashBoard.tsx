import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import SideBar from '../SideBar/SideBar';
import DashboardContentMain from './DashboardContentMain/DashboardContentMain';
import './DashBoard.css';

interface Account {
  id: number;
  name: string;
  balance: number;
  currency_symbol: string;
}

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

interface User {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  phone_number: string | null;
  address: string;
}

const Dashboard: React.FC<DashBoardProps> = ({isSidebarVisible}) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<RecordsOverviewProps[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());
  const [datesSet, setDatesSet] = useState<boolean>(false);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {

    const fetchUserProfile = async (): Promise<User> => {
      try {
        const response = await api.get('/profile/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Return a default user object or handle the error appropriately
        return {
          email: "",
          first_name: "",
          last_name: "",
          date_of_birth: null,
          phone_number: null,
          address: ""
        };
      }
    };
    
    const fetchAccounts = async () => {
      try {
        const response = await api.get('/accounts/');
        console.log(response.data);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    const setInitialDates = () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
      const formattedStartOfMonth = startOfMonth.toISOString().split('T')[0];
      const formattedEndOfMonth = endOfMonth.toISOString().split('T')[0];
  
      setStartDate(formattedStartOfMonth);
      setEndDate(formattedEndOfMonth);
      setDatesSet(true); // Indicate that the dates have been set
    }

    const fetchDataSequentially = async () => {
      await fetchUserProfile();
      await fetchAccounts();
      setInitialDates();
    };
  
    fetchDataSequentially();
  
  }, []);

  useEffect(() => {
    if (datesSet) {
      // Perform actions that depend on the dates being set
      fetchData();
    }
  }, [datesSet]);

  useEffect(() => {
    if (accounts.length > 0) {
      setSelectedAccounts(new Set([accounts[0].name]));
    }
  }, [accounts]);

  const fetchData = () => {
    // Fetch transactions from API with parameters
    const accountNames = accounts.map(account => account.name);
    const queryParams = new URLSearchParams();

    accountNames.forEach(name => queryParams.append('accounts', name));
    queryParams.append('start_date', startDate);
    queryParams.append('end_date', endDate);

    api.get(`/filtered-transactions/?${queryParams.toString()}`)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

  const handleAccountClick = (accountId: string) => {
    setSelectedAccounts(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(accountId)) {
        newSelected.delete(accountId);
      } else {
        newSelected.add(accountId);
      }
      return newSelected;
    });
  };

  return (
    <div className={`dashboard-container ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
    {<SideBar isSidebarVisible={isSidebarVisible} />}
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h1>Welcome, {user ? user.email : ""}</h1>
      </header>
      <div className="accounts-container">
          {accounts.map(account => (
            <div
              key={account.id}
              className={`account-box ${selectedAccounts.has(account.name) ? 'selected' : ''}`}
              onClick={() => handleAccountClick(account.name)}
            >
              <p>{account.name}</p>
              <p>Balance: {account.balance}</p>
            </div>
          ))}
        </div>
      <DashboardContentMain
          transactions={transactions}
          startDate={startDate}
          endDate={endDate}
          currency={currency}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          fetchData={fetchData}
          setCurrency={setCurrency} />
    </div>
  </div>
  );
};

export default Dashboard;