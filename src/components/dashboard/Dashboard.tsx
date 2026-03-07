import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import StatCards from './StatCards';
import ActivitiesChart from './charts/ActivitiesChart';
import AppointmentTrendChart from './charts/AppointmentTrendChart';
import DepartmentUsageChart from './charts/DepartmentUsageChart';
import { AlertStack, PatientFeed, AppointmentSummary } from './widgets/InfoWidgets';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1600px] mx-auto space-y-8">
                        <div className="mb-8">
                            <p className="text-slate-500 font-medium mb-1">Monday, 24 November 2025</p>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Good Morning Dr. Sara</h2>
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
            </div>
        </div>
    );
};

export default Dashboard;
