import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    [key: string]: any; // Allow additional props
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        // Optionally, you can return a loading spinner or some placeholder here
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;