import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { Badge } from '../../ui';
import { DataTable, TableFilters } from '../../table';
import type { Column, FilterConfig } from '../../table';
import type { StaffMember } from '../../../types/staff.types';
import type { PatientListItem } from '../../../types/patient.types';
import { staffApi } from '../../../api/staff';
import { patientApi } from '../../../api/patient';

interface UserManagementListProps {
    onMenuClick: () => void;
    onAddUserClick: (type: 'patient' | 'staff', role?: string) => void;
}

// ==================== Mock Data ====================



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
            { value: 'Admin', label: 'Admin' },
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
        key: 'sort',
        label: 'Sort By',
        type: 'select',
        placeholder: 'Newest First',
        options: [
            { value: 'Newest', label: 'Newest' },
            { value: 'Oldest', label: 'Oldest' },
            { value: 'Name A→Z', label: 'Name A→Z' },
            { value: 'Name Z→A', label: 'Name Z→A' },
        ],
        hidePlaceholder: true,
    },
    { key: 'lastLogin', label: 'Last Login', type: 'dateRange' },
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
    {
        key: 'sort',
        label: 'Sort By',
        type: 'select',
        placeholder: 'Newest First',
        options: [
            { value: 'Newest', label: 'Newest' },
            { value: 'Oldest', label: 'Oldest' },
            { value: 'Name A→Z', label: 'Name A→Z' },
            { value: 'Name Z→A', label: 'Name Z→A' },
        ],
        hidePlaceholder: true,
    },
];

// ==================== Column Definitions ====================
const staffColumns: Column<StaffMember>[] = [
    {
        key: 'name',
        header: 'STAFF NAME',
        render: (staff) => (
            <div className="flex items-center gap-3">
                <img src={staff.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name || 'U')}&background=random`} alt={staff.name || 'Staff'} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{staff.name || 'Unnamed Staff'}</span>
                    <span className="text-xs text-slate-400 font-medium">{staff.subtitle || staff.username || 'No ID'}</span>
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
        render: (staff) => <span className="font-bold text-slate-900">{staff.lastLogin || 'N/A'}</span>,
    },
    {
        key: 'dept',
        header: 'DEPT',
        render: (staff) => <span className="font-bold text-slate-900">{staff.dept || 'General'}</span>,
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
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-bold">
                    {(patient.name || 'P')[0]}
                </div>
                <span className="font-extrabold text-slate-900">{patient.name || 'Unnamed Patient'}</span>
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
        render: (patient) => <span className="font-extrabold text-slate-900">{patient.lastVisit || 'N/A'}</span>,
    },
    {
        key: 'upcoming',
        header: 'UPCOMING',
        render: (patient) => (
            <span className={`font-bold ${patient.upcoming !== '-' ? 'text-blue-500' : 'text-slate-400'}`}>
                {patient.upcoming || '-'}
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
    const [searchQuery, setSearchQuery] = useState('');
    const [staffData, setStaffData] = useState<StaffMember[]>([]);
    const [patientData, setPatientData] = useState<PatientListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();

    const fetchStaff = useCallback(async () => {
        setLoading(true);
        try {
            // Map Sort string to integer
            const sortMap: Record<string, number> = {
                'Newest': 0,
                'Oldest': 1,
                'Name A→Z': 2,
                'Name Z→A': 3
            };

            const data = await staffApi.getStaffs({
                SearchKey: searchQuery,
                Role: staffFilters.role,
                IsActive: staffFilters.status === 'Active' ? true : staffFilters.status === 'Disabled' ? false : undefined,
                sort: staffFilters.sort ? sortMap[staffFilters.sort] : undefined,
                LastLoginFrom: staffFilters.lastLoginFrom,
                LastLoginTo: staffFilters.lastLoginTo,
                PageIndex: 0,
                PageSize: 50
            });
            const list = data?.staffs || (data as any)?.items || (data as any)?.data || (Array.isArray(data) ? data : []);
            
            if (list && list.length > 0) {
                const mappedStaff = list.map((item: any) => ({
                    id: item.id || item.Id || item.nationalId || item.NationalId || '',
                    name: item.name || item.fullNameEnglish || item.FullNameEnglish || 'Unknown',
                    subtitle: item.nationalId || item.NationalId || item.specialization || '',
                    username: item.username || item.userName || item.Email || item.email || '',
                    role: item.role || item.roleName || 'Staff',
                    lastLogin: item.lastLogin || item.LastLogin || 'N/A',
                    dept: item.dept || item.department || item.specialization || 'General',
                    status: item.isActive === false ? 'Disabled' : (item.status || 'Active'),
                    avatar: item.avatar || item.PersonalPhotos || '',
                }));
                setStaffData(mappedStaff);
                setTotalItems(data?.totalCount || mappedStaff.length);
            } else {
                setStaffData([]); 
                setTotalItems(0);
            }
        } catch (error) {
            console.error('Failed to fetch staff:', error);
            setStaffData([]);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, staffFilters]);

    const fetchPatients = useCallback(async () => {
        setLoading(true);
        try {
            const sortMap: Record<string, number> = {
                'Newest': 0,
                'Oldest': 1,
                'Name A→Z': 2,
                'Name Z→A': 3
            };

            const data = await patientApi.getPatients({
                SearchKey: searchQuery,
                Gender: patientFilters.gender,
                IsActive: patientFilters.status === 'Active' ? true : patientFilters.status === 'Disabled' ? false : undefined,
                LastVisit: patientFilters.lastVisit,
                sort: patientFilters.sort ? sortMap[patientFilters.sort] : undefined,
                PageIndex: 0,
                PageSize: 50
            });
            const list = data?.patients || (data as any)?.items || (data as any)?.data || (Array.isArray(data) ? data : []);
            
            if (list && list.length > 0) {
                const mappedPatients = list.map((item: any) => ({
                    id: item.id || item.Id || item.nationalId || item.NationalId || '',
                    patientId: item.patientId || item.PatientId || item.nationalId || item.NationalId || '',
                    name: item.name || item.fullNameEnglish || item.FullNameEnglish || 'Unknown',
                    subtitle: item.nationalId || item.NationalId || item.phone || item.PhoneNumber || '',
                    demographics: (item.gender || item.Gender || '') + (item.age ? `, ${item.age}` : ''),
                    lastVisit: item.lastVisit || item.LastVisit || 'N/A',
                    upcoming: item.upcoming || item.UpcomingAppointment || '-',
                    status: item.isActive === false ? 'Disabled' : (item.status || 'Active'),
                    avatar: item.avatar || item.PersonalPhotos || '',
                    prescriptions: item.prescriptions || [],
                    prescriptionSummary: item.prescriptionSummary || { totalPrescriptions: 0, activeTreatmentNote: '', recentNote: '' },
                }));
                setPatientData(mappedPatients);
                setTotalItems(data?.totalCount || mappedPatients.length);
            } else {
                setPatientData([]);
                setTotalItems(0);
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error);
            setPatientData([]);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, patientFilters]);

    useEffect(() => {
        if (activeTab === 'staff') {
            fetchStaff();
        } else {
            fetchPatients();
        }
    }, [activeTab, fetchStaff, fetchPatients]);

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
                onSearch={setSearchQuery}
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
                                    ? 'bg-[#5390D9] text-white shadow-sm'
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
                    {loading ? (
                        <div className="flex items-center justify-center p-20 bg-white rounded-3xl border border-slate-100">
                           <div className="flex flex-col items-center gap-4">
                               <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                               <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Loading Users...</p>
                           </div>
                        </div>
                    ) : activeTab === 'staff' ? (
                        <DataTable<StaffMember>
                            columns={staffColumns}
                            data={staffData}
                            totalItems={totalItems}
                            onRowClick={(staff) => navigate(`/dashboard/users/staff/${staff.username || staff.id}`)}
                        />
                    ) : (
                        <DataTable<PatientListItem>
                            columns={patientColumns}
                            data={patientData}
                            totalItems={totalItems}
                            onRowClick={(patient) => navigate(`/dashboard/users/patient/${patient.patientId || patient.id}`)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagementList;

