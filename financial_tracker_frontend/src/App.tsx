import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './utils/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import ProfilePage from "./Components/Profile/ProfilePage";
import Auth from "./Components/Auth/Auth";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/HomePage/HomePage";
import Dashboard from "./Components/DashBoard/DashBoard";
import './App.css';

const App: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };

  return (
    <AuthProvider>
      <Router>
        <Header toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Add a home route */}
            <Route path="/login" element={<Auth />} />
            <Route path="/profile" element={<PrivateRoute component={ProfilePage} isSidebarVisible = {isSidebarVisible} />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} isSidebarVisible = {isSidebarVisible} />} />
            {/* Add more routes as needed */}
          </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;