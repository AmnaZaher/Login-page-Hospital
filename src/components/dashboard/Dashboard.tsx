import { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import StatCards from "../../components/dashboard/StatCards";

import AppointmentTrendChart from "./charts/AppointmentTrendChart";

import { PatientFeed } from "./widgets/InfoWidgets";
import StatusDistribution from "./widgets/StatusDistribution";
import QuickActions from "./widgets/QuickActions";
import DoctorStatus from "./widgets/DoctorStatus";
import RegisterPatient from "./patients/RegisterPatient";
import RegisterStaff from "./staff/RegisterStaff";
import UserManagementList from "./users/UserManagementList";
import UserProfileDetail from "./users/UserProfileDetail";
import PatientProfileDetail from "./users/PatientProfileDetail";
import LabResultDetail from "./users/LabResultDetail";
import RadiologyReportDetail from "./users/RadiologyReportDetail";
import PrescriptionDetail from "./users/PrescriptionDetail";
import ClinicsContainer from "./clinics/ClinicsContainer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize activeTab based on current path to avoid flickering on refresh
  const getInitialTab = (pathname: string) => {
    if (pathname.includes("/dashboard/users")) return "users";
    if (pathname.includes("/dashboard/clinics")) return "clinics";
    if (pathname.includes("/dashboard/reports")) return "reports";
    if (pathname.includes("/dashboard/appointments")) return "appointments";
    if (pathname.includes("/dashboard/departments")) return "departments";
    if (pathname.includes("/dashboard/billing")) return "billing";
    if (pathname.includes("/dashboard/settings")) return "settings";
    return "dashboard";
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(getInitialTab(location.pathname));
  const [userViewMode, setUserViewMode] = useState<"list" | "register">("list");
  const [registerMode, setRegisterMode] = useState<"patient" | "staff">("patient");
  const [registerRole, setRegisterRole] = useState<string>("Doctor");

  const [currentDate, setCurrentDate] = useState<string>("");

  // Sync activeTab with URL
  useEffect(() => {
    setActiveTab(getInitialTab(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(new Date().toLocaleDateString("en-US", options));
  }, []);

  const userName = user?.name || "User";


  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans relative">
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
        onLogout={() => {
          onLogout?.();
        }}
        // onTabChange={(tab) => {
        //   setActiveTab(tab);
        //   if (tab === "users") {
        //     setUserViewMode("list");
        //     navigate("/dashboard/users");
        //   } else if (tab === "dashboard") {
        //     navigate("/dashboard");
        //   } else if (tab === "reports") {
        //     navigate("/dashboard/reports");
        //   } else if (tab === "appointments") {
        //     navigate("/dashboard/appointments");
        //   } else if (tab === "departments") {
        //     navigate("/dashboard/departments");
        //   } else if (tab === "billing") {
        //     navigate("/dashboard/billing");
        //   } else if (tab === "settings") {
        //     navigate("/dashboard/settings");
        //   }
        //   setIsSidebarOpen(false);
        // }}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "users") {
            setUserViewMode("list");
          }
        }}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {activeTab !== "users" &&
          activeTab !== "clinics" &&
          !location.pathname.includes("/dashboard/users") &&
          !location.pathname.includes("/dashboard/clinics") && (
            <TopBar
              onMenuClick={() => setIsSidebarOpen(true)}
              onAddUserClick={(type, role) => {
                setActiveTab("users");
                setUserViewMode("register");
                setRegisterMode(type);
                if (role) setRegisterRole(role);
                navigate("/dashboard/users");
              }}
            />
          )}

        <Routes>
          {/* Staff Profile */}
          <Route
            path="users/staff/:id"
            element={
              <UserProfileDetail onMenuClick={() => setIsSidebarOpen(true)} />
            }
          />

          {/* Patient Profile */}
          <Route
            path="users/patient/:id"
            element={
              <PatientProfileDetail
                onMenuClick={() => setIsSidebarOpen(true)}
              />
            }
          />

          {/* Lab Result Detail */}
          <Route
            path="users/patient/:id/lab/:labId"
            element={
              <LabResultDetail
                onMenuClick={() => setIsSidebarOpen(true)}
              />
            }
          />

          {/* Radiology Report Detail */}
          <Route
            path="users/patient/:id/radiology/:radiologyId"
            element={
              <RadiologyReportDetail
                onMenuClick={() => setIsSidebarOpen(true)}
              />
            }
          />

          {/* Prescription Detail */}
          <Route
            path="users/patient/:id/prescription/:prescriptionId"
            element={
              <PrescriptionDetail
                onMenuClick={() => setIsSidebarOpen(true)}
              />
            }
          />

          {/* Clinics */}
          <Route
            path="clinics"
            element={<ClinicsContainer />}
          />

          {/* User Management List + Register */}
          <Route
            path="users"
            element={
              <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
                {userViewMode === "list" ? (
                  <UserManagementList
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onAddUserClick={(type, role) => {
                      setUserViewMode("register");
                      setRegisterMode(type);
                      if (role) setRegisterRole(role);
                    }}
                  />
                ) : (
                  <div className="flex-1 overflow-y-auto w-full">
                    {registerMode === "patient" ? (
                      <RegisterPatient
                        onSwitchView={(type, role) => {
                          setRegisterMode(type);
                          if (role) setRegisterRole(role);
                        }}
                      />
                    ) : (
                      <RegisterStaff
                        initialRole={registerRole}
                        onSwitchView={(type, role) => {
                          setRegisterMode(type);
                          if (role) setRegisterRole(role);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            }
          />

          {/* Dashboard Home */}
          <Route
            path="*"
            element={
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-[1600px] mx-auto space-y-4">
                  <div className="mb-4">
                    <p className="text-slate-500 font-medium mb-1">
                      {currentDate}
                    </p>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      Good Morning Dr. {userName}
                    </h2>
                  </div>
                  
                  <StatCards />
                  
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left Column: Chart & Quick Actions */}
                    <div className="flex-1 space-y-4 min-w-0">
                      <AppointmentTrendChart />
                      <QuickActions />
                    </div>

                    {/* Right Column: Widgets */}
                    <div className="w-full lg:w-[350px] shrink-0 space-y-4">
                      <StatusDistribution />
                      <DoctorStatus />
                      <PatientFeed />
                    </div>
                  </div>
                </div>
              </main>
            }
          />

        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
