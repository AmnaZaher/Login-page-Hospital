import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from './routePaths';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    // Wait for token check to finish before deciding to redirect
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="animate-spin w-8 h-8 border-4 border-[#1A6FC4] border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={PATHS.LOGIN} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

