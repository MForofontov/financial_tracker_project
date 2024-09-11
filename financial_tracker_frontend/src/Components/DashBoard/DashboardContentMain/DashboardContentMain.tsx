import React, { useState } from 'react';
import PieChartExpenses from './PieChartExpenses';
import DateModal from './DateModal';
import ScrollableBox from './ScrollableBox';
import './DashboardContentMain.css';

interface Transaction {
    user: number;
    account: number;
    amount: number;
    date: string;
    description: string;
    category_name: string;
    transaction_type_name: string;
  }

interface DashboardContentProps {
    transactions: Transaction[];
    startDate: string;
    endDate: string;
    currency: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    fetchData: () => void;
    setCurrency: (currency: string) => void
}

const DashboardContentMain: React.FC<DashboardContentProps> = ({
    transactions,
    startDate,
    endDate,
    currency,
    setStartDate,
    setEndDate,
    fetchData,
    setCurrency
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="dashboard-content">
            <div className="dashboard-section">
                <h2>Quick Actions</h2>
                <PieChartExpenses transactions={transactions} />
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
    );
};

export default DashboardContentMain;