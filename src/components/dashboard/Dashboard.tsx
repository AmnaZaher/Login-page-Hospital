import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import StatCards from './StatCards';
import ActivitiesChart from './charts/ActivitiesChart';
import AppointmentTrendChart from './charts/AppointmentTrendChart';
import DepartmentUsageChart from './charts/DepartmentUsageChart';
import { AlertStack, PatientFeed, AppointmentSummary } from './widgets/InfoWidgets';
import RegisterPatient from './patients/RegisterPatient';
import RegisterStaff from './staff/RegisterStaff';

interface DashboardProps {
    onLogout?: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userName, setUserName] = useState<string>('User');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [authError, setAuthError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const [registerMode, setRegisterMode] = useState<'patient' | 'staff'>('patient');
    const [registerRole, setRegisterRole] = useState<string>('Doctor');

    useEffect(() => {
        // Handle date formatting
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        setCurrentDate(new Date().toLocaleDateString('en-US', options));

        // Handle authentication and role check
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setAuthError('No authentication token found. Please log in.');
            return;
        }

        try {
            const decoded: any = jwtDecode(token);

            // Expected claims from typical .NET/standard JWTs
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role;
            const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || decoded.unique_name || decoded.name;

            if (role !== 'Admin') {
                setAuthError('Access denied. This page is restricted to administrators.');
                return;
            }

            if (name) {
                // Capitalize first letter of name
                const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                setUserName(formattedName);
            }
        } catch (err) {
            setAuthError('Invalid authentication token. Please log in again.');
        }
    }, []);

    // Simple fallback UI for unauthorized states, could also trigger a redirect
    if (authError) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 font-sans p-4 text-center">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-red-100">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
                    <p className="text-slate-500 mb-8">{authError}</p>
                    <button
                        onClick={() => {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            window.location.reload();
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isSidebarOpen}
                activeTab={activeTab}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={() => { onLogout?.(); }}
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    setIsSidebarOpen(false);
                }}
            />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {activeTab !== 'users' && <TopBar
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onAddUserClick={(type, role) => {
                        setActiveTab('users');
                        setRegisterMode(type);
                        if (role) setRegisterRole(role);
                    }}
                />}

                {activeTab === 'users' ? (
                    <div className="flex-1 overflow-y-auto">
                        {registerMode === 'patient' ? (
                            <RegisterPatient />
                        ) : (
                            <RegisterStaff initialRole={registerRole} />
                        )}
                    </div>
                ) : (
                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="max-w-[1600px] mx-auto space-y-8">
                            <div className="mb-8">
                                <p className="text-slate-500 font-medium mb-1">{currentDate}</p>
                                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome, {userName}</h2>
                            </div>

                            <StatCards />

                            {/* Main Content Grid */}
                            <div className="flex flex-col xl:flex-row gap-8">
                                {/* Left Column - Charts */}
                                <div className="flex-1 space-y-8 min-w-0">
                                    <ActivitiesChart />
                                    <AppointmentTrendChart />
                                    <DepartmentUsageChart />
                                </div>

                                {/* Right Column - Widgets */}
                                <div className="w-full xl:w-[400px] shrink-0 space-y-8">
                                    <AlertStack />
                                    <PatientFeed />
                                    <AppointmentSummary />
                                </div>
                            </div>

                        </div>
                    </main>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
