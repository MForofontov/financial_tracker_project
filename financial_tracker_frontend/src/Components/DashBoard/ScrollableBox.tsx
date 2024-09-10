import React from 'react';
import './ScrollableBox.css'; // Import the CSS file

interface Transaction {
  user: number;
  account: number;
  amount: number;
  date: string;
  description: string;
  category_name: string;
  transaction_type_name: string;
}

interface ScrollableBoxProps {
  transactions: Transaction[];
}

const ScrollableBox: React.FC<ScrollableBoxProps> = ({ transactions }) => {
  return (
    <div className="scrollable-box">
      {transactions.map((transaction, index) => (
        <div key={index} className="scrollable-box-item">
          <p>{transaction.category_name}</p>
          <p>{new Date(transaction.date).toLocaleString(undefined, { day: 'numeric', month: 'short' })}</p>
          <p
            style={{
              color: transaction.transaction_type_name === 'expense' ? 'red' : transaction.transaction_type_name === 'income' ? 'green' : 'black',
            }}
          >
            {transaction.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScrollableBox;