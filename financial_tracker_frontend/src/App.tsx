import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './utils/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import ProfilePage from "./Components/Profile/ProfilePage";
import Auth from "./Components/Auth/Auth";
import Header from "./Components/Header/Header";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
            {/* Add more routes as needed */}
          </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;