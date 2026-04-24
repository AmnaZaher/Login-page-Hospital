import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import TopBar from '../TopBar';
import { Badge } from '../../ui';
import { DataTable, TableFilters } from '../../table';
import type { Column } from '../../table';
import type { StaffMember } from '../../../types/staff.types';
import type { PatientListItem } from '../../../types/patient.types';
import { staffApi } from '../../../api/staff';
import { patientApi } from '../../../api/patient';
import { 
    staffFilterConfig, 
    patientFilterConfig 
} from './UserManagement.constants';

interface UserManagementListProps {
    onMenuClick: () => void;
    onAddUserClick: (type: 'patient' | 'staff', role?: string) => void;
}

const UserManagementList = ({ onMenuClick, onAddUserClick }: UserManagementListProps) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'staff' | 'patients'>('staff');
    
    // Staff State
    const [staffData, setStaffData] = useState<StaffMember[]>([]);
    const [staffTotal, setStaffTotal] = useState(0);
    const [currentStaffPage, setCurrentStaffPage] = useState(1);
    const [staffLoading, setStaffLoading] = useState(false);
    const [staffSearch, setStaffSearch] = useState('');
    const [staffFilters, setStaffFilters] = useState<Record<string, string>>({});

    // Patient State
    const [patientData, setPatientData] = useState<PatientListItem[]>([]);
    const [patientTotal, setPatientTotal] = useState(0);
    const [currentPatientPage, setCurrentPatientPage] = useState(1);
    const [patientLoading, setPatientLoading] = useState(false);
    const [patientSearch, setPatientSearch] = useState('');
    const [patientFilters, setPatientFilters] = useState<Record<string, string>>({});

    // Column Definitions
    const staffColumns: Column<any>[] = useMemo(() => [
        {
            key: 'name',
            header: 'STAFF NAME',
            render: (staff) => (
                <div className="flex items-center gap-3">
                    <img src={staff.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name || 'U')}&background=random`} alt={staff.name || 'Staff'} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{staff.name || 'Unnamed Staff'}</span>
                        <span className="text-xs text-slate-400 font-medium">{staff.username || staff.id || 'No ID'}</span>
                    </div>
                </div>
            ),
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
    ], []);

    const patientColumns: Column<any>[] = useMemo(() => [
        {
            key: 'name',
            header: 'PATIENT NAME',
            render: (patient) => (
                <div className="flex items-center gap-3">
                    <img src={patient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name || 'U')}&background=random`} alt={patient.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{patient.name || 'Unknown Patient'}</span>
                        <span className="text-xs text-slate-400 font-medium">{patient.nationalId || patient.id || 'No ID'}</span>
                    </div>
                </div>
            ),
        },
        {
            key: 'gender',
            header: 'GENDER',
            render: (patient) => <span className="font-bold text-slate-900">{patient.gender || 'N/A'}</span>,
        },
        {
            key: 'age',
            header: 'AGE',
            render: (patient) => <span className="font-bold text-slate-900">{patient.age || 'N/A'}</span>,
        },
        {
            key: 'phone',
            header: 'PHONE',
            render: (patient) => <span className="font-bold text-slate-900">{patient.phone || 'N/A'}</span>,
        },
        {
            key: 'status',
            header: 'STATUS',
            render: (patient) => (
                <Badge variant={patient.status === 'Active' ? 'success' : 'default'}>
                    {patient.status}
                </Badge>
            ),
        },
    ], []);

    // API Key Mapping Helpers
    const mapSortValue = (val: string) => {
        switch(val) {
            case 'Newest': return 0;
            case 'Oldest': return 1;
            case 'Name A→Z': return 2;
            case 'Name Z→A': return 3;
            default: return 0;
        }
    };

    const fetchStaff = useCallback(async () => {
        setStaffLoading(true);
        try {
            const data = await staffApi.getStaffs({
                SearchKey: staffSearch,
                PageIndex: currentStaffPage - 1,
                PageSize: 5,
                sort: mapSortValue(staffFilters.sort || ''),
                Role: staffFilters.role,
                IsActive: staffFilters.status === 'Active' ? true : (staffFilters.status === 'Disabled' ? false : undefined)
            });

            if (data) {
                const list = data.staffs || (data as any).items || (data as any).data || (Array.isArray(data) ? data : []);
                const mappedStaff = list.map((item: any) => {
                    const rolesMap: Record<string, string> = {
                        '1': 'Admin', '2': 'Doctor', '3': 'Nurse', '4': 'Pharmacist', '5': 'Radiologist', '6': 'Lab Technician',
                        'Admin': 'Admin', 'Doctor': 'Doctor', 'Nurse': 'Nurse', 'Pharmacist': 'Pharmacist', 'Radiologist': 'Radiologist', 'Lab Technician': 'Lab Technician'
                    };
                    
                    const findRole = () => {
                      const s = String(item.role || item.Role || '');
                      return rolesMap[s] ?? (isNaN(parseInt(s)) ? s : 'Staff');
                    };

                    const findDept = () => {
                      const d = item.department || item.Department || item.dept || item.Dept;
                      if (typeof d === 'object') return d.name || 'General';
                      return d || 'General';
                    };

                    return {
                        ...item,
                        id: item.id || item.Id || item.nationalId,
                        name: item.name || item.fullNameEnglish || item.FullNameEnglish || 'Unknown',
                        role: findRole(),
                        dept: findDept(),
                        status: item.isActive === false ? 'Disabled' : (item.status || 'Active'),
                        lastLogin: item.lastLogin || 'N/A',
                        avatar: item.avatar || item.PersonalPhotos || ''
                    };
                });
                setStaffData(mappedStaff);
                setStaffTotal(data.totalCount || mappedStaff.length);
            }
        } catch (error) {
            console.error('Failed to fetch staff:', error);
        } finally {
            setStaffLoading(false);
        }
    }, [currentStaffPage, staffSearch, staffFilters]);

    const fetchPatients = useCallback(async () => {
        setPatientLoading(true);
        try {
            const data = await patientApi.getPatients({
                SearchKey: patientSearch,
                PageIndex: currentPatientPage - 1,
                PageSize: 5,
                sort: mapSortValue(patientFilters.sort || ''),
                Gender: patientFilters.gender,
                IsActive: patientFilters.status === 'Active' ? true : (patientFilters.status === 'Disabled' ? false : undefined),
                LastVisit: patientFilters.lastVisit
            });

            if (data) {
                const list = data.patients || (data as any).items || (data as any).data || [];
                const mappedPatients = list.map((item: any) => ({
                    ...item,
                    id: item.id || item.Id || item.nationalId,
                    name: item.name || item.fullNameEnglish || item.FullNameEnglish || 'Unknown',
                    status: item.isActive === false ? 'Disabled' : (item.status || 'Active'),
                }));
                setPatientData(mappedPatients);
                setPatientTotal(data.totalCount || mappedPatients.length);
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        } finally {
            setPatientLoading(false);
        }
    }, [currentPatientPage, patientSearch, patientFilters]);

    useEffect(() => {
        if (activeTab === 'staff') fetchStaff();
        else fetchPatients();
    }, [activeTab, fetchStaff, fetchPatients]);

    const handleRowClick = (item: any) => {
        if (activeTab === 'staff') {
            navigate(`/dashboard/users/staff/${item.id}`);
        } else {
            navigate(`/dashboard/users/patient/${item.id}`);
        }
    };

    const handleFilterChange = (key: string, value: string) => {
      if (activeTab === 'staff') {
        setStaffFilters(prev => ({ ...prev, [key]: value }));
      } else {
        setPatientFilters(prev => ({ ...prev, [key]: value }));
      }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 relative font-sans overflow-hidden w-full">
            <TopBar
                title={<span className="text-slate-900 font-bold">User Management</span>}
                onMenuClick={onMenuClick}
                onAddUserClick={() => onAddUserClick('staff')}
            />

            <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-8">
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit mb-8 border border-slate-200/60 shadow-sm self-center md:self-start">
                    <button
                        onClick={() => setActiveTab('staff')}
                        className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
                            activeTab === 'staff'
                                ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        Hospital Staff
                    </button>
                    <button
                        onClick={() => setActiveTab('patients')}
                        className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
                            activeTab === 'patients'
                                ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        Patients
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                    <div className="p-6 border-b border-slate-100">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input 
                              type="text"
                              placeholder={activeTab === 'staff' ? "Search staff by name or ID..." : "Search patients by name or ID..."}
                              className="w-full bg-slate-50 border border-slate-200 py-3 pl-12 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                              value={activeTab === 'staff' ? staffSearch : patientSearch}
                              onChange={(e) => activeTab === 'staff' ? setStaffSearch(e.target.value) : setPatientSearch(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <TableFilters 
                          filters={activeTab === 'staff' ? staffFilterConfig : patientFilterConfig}
                          values={activeTab === 'staff' ? staffFilters : patientFilters}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    
                    {activeTab === 'staff' ? (
                        <DataTable<any>
                            columns={staffColumns}
                            data={staffData}
                            isLoading={staffLoading}
                            onRowClick={handleRowClick}
                            totalItems={staffTotal}
                            currentPage={currentStaffPage}
                            onPageChange={setCurrentStaffPage}
                        />
                    ) : (
                        <DataTable<any>
                            columns={patientColumns}
                            data={patientData}
                            isLoading={patientLoading}
                            onRowClick={handleRowClick}
                            totalItems={patientTotal}
                            currentPage={currentPatientPage}
                            onPageChange={setCurrentPatientPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagementList;
