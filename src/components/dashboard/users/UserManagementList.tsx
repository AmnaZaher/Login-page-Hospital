import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { Badge } from '../../ui';
import { DataTable, TableFilters } from '../../table';
import type { Column, FilterConfig } from '../../table';
import type { StaffMember } from '../../../types/staff.types';
import type { PatientListItem } from '../../../types/patient.types';

interface UserManagementListProps {
    onMenuClick: () => void;
    onAddUserClick: (type: 'patient' | 'staff', role?: string) => void;
}

// ==================== Mock Data ====================
const mockStaff: StaffMember[] = [
    { id: '1', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Amr Mohamed', subtitle: '1232-3422', username: 'Amoed-aa', role: 'Nurse', lastLogin: 'Jan 12, 2024', dept: 'Emergency', status: 'Disabled', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: '4', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: '5', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=15' },
];

const emptyPrescriptionSummary = { totalPrescriptions: 0, activeTreatmentNote: '', recentNote: '' };

const mockPatients: PatientListItem[] = [
    { id: '1', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', prescriptions: [], prescriptionSummary: emptyPrescriptionSummary },
    { id: '2', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: '-', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=9', prescriptions: [], prescriptionSummary: emptyPrescriptionSummary },
    { id: '3', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Disabled', avatar: 'https://i.pravatar.cc/150?img=10', prescriptions: [], prescriptionSummary: emptyPrescriptionSummary },
    { id: '4', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Disabled', avatar: 'https://i.pravatar.cc/150?img=12', prescriptions: [], prescriptionSummary: emptyPrescriptionSummary },
    { id: '5', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=16', prescriptions: [], prescriptionSummary: emptyPrescriptionSummary },
];

// ==================== Filter Configs ====================
const staffFilterConfig: FilterConfig[] = [
    {
        key: 'role',
        label: 'Role',
        type: 'select',
        placeholder: 'All Roles',
        options: [
            { value: 'Doctor', label: 'Doctor' },
            { value: 'Nurse', label: 'Nurse' },
        ],
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'All Statuses',
        options: [
            { value: 'Active', label: 'Active' },
            { value: 'Disabled', label: 'Disabled' },
        ],
    },
    {
        key: 'department',
        label: 'Department',
        type: 'select',
        placeholder: 'All Departments',
        options: [
            { value: 'Cardiology', label: 'Cardiology' },
            { value: 'Emergency', label: 'Emergency' },
        ],
    },
];

const patientFilterConfig: FilterConfig[] = [
    {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        placeholder: 'All Genders',
        options: [
            { value: 'Female', label: 'Female' },
            { value: 'Male', label: 'Male' },
        ],
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'All Statuses',
        options: [
            { value: 'Active', label: 'Active' },
            { value: 'Disabled', label: 'Disabled' },
        ],
    },
    { key: 'lastVisit', label: 'Last Visit', type: 'date', placeholder: 'mm / dd / yy' },
    { key: 'upcoming', label: 'Upcoming Appointment', type: 'date', placeholder: 'mm / dd / yy' },
];

// ==================== Column Definitions ====================
const staffColumns: Column<StaffMember>[] = [
    {
        key: 'name',
        header: 'STAFF NAME',
        render: (staff) => (
            <div className="flex items-center gap-3">
                <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{staff.name}</span>
                    <span className="text-xs text-slate-400 font-medium">{staff.subtitle}</span>
                </div>
            </div>
        ),
    },
    {
        key: 'username',
        header: 'USERNAME',
        render: (staff) => <span className="font-extrabold text-slate-900">{staff.username}</span>,
    },
    {
        key: 'role',
        header: 'ROLE',
        render: (staff) => (
            <span className={`font-bold ${staff.role === 'Doctor' ? 'text-blue-500' : 'text-emerald-500'}`}>
                {staff.role}
            </span>
        ),
    },
    {
        key: 'lastLogin',
        header: 'LAST LOGIN',
        render: (staff) => <span className="font-bold text-slate-900">{staff.lastLogin}</span>,
    },
    {
        key: 'dept',
        header: 'DEPT',
        render: (staff) => <span className="font-bold text-slate-900">{staff.dept}</span>,
    },
    {
        key: 'status',
        header: 'STATUS',
        render: (staff) => (
            <Badge variant={staff.status === 'Active' ? 'success' : 'default'}>
                {staff.status}
            </Badge>
        ),
    },
    {
        key: 'actions',
        header: 'ACTIONS',
        render: () => (
            <div className="flex flex-col gap-1">
                <button onClick={(e) => e.stopPropagation()} className="text-blue-500 hover:text-blue-700 font-bold text-sm transition-colors text-left">
                    Edit
                </button>
                <button onClick={(e) => e.stopPropagation()} className="text-red-500 hover:text-red-700 font-bold text-sm transition-colors text-left">
                    Delete
                </button>
            </div>
        ),
    },
];

const patientColumns: Column<PatientListItem>[] = [
    {
        key: 'name',
        header: 'PATIENT NAME',
        render: (patient) => (
            <div className="flex items-center gap-3">
                <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
                <span className="font-extrabold text-slate-900">{patient.name}</span>
            </div>
        ),
    },
    {
        key: 'patientId',
        header: 'ID',
        render: (patient) => (
            <div className="flex flex-col">
                <span className="font-extrabold text-slate-900">{patient.patientId}</span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider">{patient.subtitle}</span>
            </div>
        ),
    },
    {
        key: 'demographics',
        header: 'DEMOGRAPHICS',
        render: (patient) => <span className="font-bold text-slate-900">{patient.demographics}</span>,
    },
    {
        key: 'lastVisit',
        header: 'LAST VISIT',
        render: (patient) => <span className="font-extrabold text-slate-900">{patient.lastVisit}</span>,
    },
    {
        key: 'upcoming',
        header: 'UPCOMING',
        render: (patient) => (
            <span className={`font-bold ${patient.upcoming !== '-' ? 'text-blue-500' : 'text-slate-400'}`}>
                {patient.upcoming}
            </span>
        ),
    },
    {
        key: 'status',
        header: 'STATUS',
        render: (patient) => (
            <Badge variant={patient.status === 'Active' ? 'success' : 'default'} size="sm">
                {patient.status}
            </Badge>
        ),
    },
    {
        key: 'actions',
        header: 'ACTIONS',
        render: () => (
            <div className="flex flex-col gap-1.5">
                <button onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:text-blue-800 font-extrabold text-xs transition-colors text-left uppercase tracking-wide">
                    Edit
                </button>
                <button onClick={(e) => e.stopPropagation()} className="text-red-500 hover:text-red-700 font-extrabold text-xs transition-colors text-left uppercase tracking-wide">
                    Delete
                </button>
            </div>
        ),
    },
];

// ==================== Component ====================
const UserManagementList = ({ onMenuClick, onAddUserClick }: UserManagementListProps) => {
    const [activeTab, setActiveTab] = useState<'patient' | 'staff'>('staff');
    const [staffFilters, setStaffFilters] = useState<Record<string, string>>({});
    const [patientFilters, setPatientFilters] = useState<Record<string, string>>({});
    const navigate = useNavigate();



    return (
        <div className="flex flex-col h-full bg-slate-50 relative font-sans">
            <TopBar
                title="User Management"
                searchPlaceholder={
                    activeTab === 'patient'
                        ? 'Search patients by name, ID or phone...'
                        : 'Search staff by name, username or ID...'
                }
                onMenuClick={onMenuClick}
                onAddUserClick={onAddUserClick}
            />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8">
                    {/* Tabs */}
                    <div className="flex items-center w-full max-w-[320px] bg-[#5390D9]/20 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('patient')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                                activeTab === 'patient'
                                    ? 'bg-[#5390D9] text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-800'
                            }`}
                        >
                            Patient
                        </button>
                        <button
                            onClick={() => setActiveTab('staff')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                                activeTab === 'staff'
                                    ? 'bg-white text-[#5390D9] shadow-sm'
                                    : 'text-slate-600 hover:text-slate-800'
                            }`}
                        >
                            Hospital Staff
                        </button>
                    </div>

                    {/* Filters */}
                    {activeTab === 'staff' ? (
                        <TableFilters
                            filters={staffFilterConfig}
                            values={staffFilters}
                            onChange={(key, value) =>
                                setStaffFilters((prev) => ({ ...prev, [key]: value }))
                            }
                        />
                    ) : (
                        <TableFilters
                            filters={patientFilterConfig}
                            values={patientFilters}
                            onChange={(key, value) =>
                                setPatientFilters((prev) => ({ ...prev, [key]: value }))
                            }
                        />
                    )}

                    {/* Table */}
                    {activeTab === 'staff' ? (
                        <DataTable<StaffMember>
                            columns={staffColumns}
                            data={mockStaff}
                            totalItems={1234}
                            onRowClick={(staff) => navigate(`/dashboard/users/staff/${staff.id}`)}
                        />
                    ) : (
                        <DataTable<PatientListItem>
                            columns={patientColumns}
                            data={mockPatients}
                            totalItems={1234}
                            onRowClick={(patient) => navigate(`/dashboard/users/patient/${patient.id}`)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagementList;
