import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface UserManagementListProps {
    onMenuClick: () => void;
    onAddUserClick: (type: 'patient' | 'staff', role?: string) => void;
}

const mockStaff = [
    { id: '1', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Amr Mohamed', subtitle: '1232-3422', username: 'Amoed-aa', role: 'Nurse', lastLogin: 'Jan 12, 2024', dept: 'Emergency', status: 'Disabled', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: '4', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: '5', name: 'Dr. Ali Mohamed', subtitle: '1232-3422', username: 'Amohamed-s', role: 'Doctor', lastLogin: 'Jan 12, 2024', dept: 'Cardiology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=15' },
];

const mockPatients = [
    { id: '1', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '2', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: '-', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '3', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Disabled', avatar: 'https://i.pravatar.cc/150?img=10' },
    { id: '4', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Disabled', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '5', name: 'Sara Magdy', subtitle: '1232-3422', patientId: '#P-45', demographics: 'Female, 32', lastVisit: 'Jan 12, 2024', upcoming: 'Feb 15, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=16' },
];

const UserManagementList = ({ onMenuClick, onAddUserClick }: UserManagementListProps) => {
    const [activeTab, setActiveTab] = useState<'patient' | 'staff'>('staff');
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full bg-slate-50 relative font-sans">
            <TopBar
                title="User Management"
                searchPlaceholder={activeTab === 'patient' ? "Search patients by name, ID or phone..." : "Search staff by name, username or ID..."}
                onMenuClick={onMenuClick}
                onAddUserClick={onAddUserClick}
            />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8">

                    {/* Tabs */}
                    <div className="flex items-center w-full max-w-[320px] bg-[#5390D9]/20 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('patient')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'patient' ? 'bg-[#5390D9] text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            Patient
                        </button>
                        <button
                            onClick={() => setActiveTab('staff')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'staff' ? 'bg-white text-[#5390D9] shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                        >
                            Hospital Staff
                        </button>
                    </div>

                    {/* Filters */}
                    {activeTab === 'staff' ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 font-bold text-sm">Role</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium">
                                        <option>All Roles</option>
                                        <option>Doctor</option>
                                        <option>Nurse</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 font-bold text-sm">Status</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium">
                                        <option>All Statuses</option>
                                        <option>Active</option>
                                        <option>Disabled</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 font-bold text-sm">Department</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium">
                                        <option>All Departments</option>
                                        <option>Cardiology</option>
                                        <option>Emergency</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 font-bold text-sm">Gender</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium">
                                        <option>All Genders</option>
                                        <option>Female</option>
                                        <option>Male</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 font-bold text-sm">Status</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium">
                                        <option>All Statuses</option>
                                        <option>Active</option>
                                        <option>Disabled</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 font-bold text-sm">Last Visit</label>
                                <div className="relative">
                                    <input type="text" placeholder="mm / dd / yy" className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium" />
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 font-bold text-sm">Upcoming Appointment</label>
                                <div className="relative">
                                    <input type="text" placeholder="mm / dd / yy" className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium" />
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Table Container */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    {activeTab === 'staff' ? (
                                        <tr className="bg-[#f8fbff] text-slate-400 text-xs font-extrabold uppercase tracking-widest border-b border-slate-100">
                                            <th className="px-6 py-5 rounded-tl-2xl">STAFF NAME</th>
                                            <th className="px-6 py-5">USERNAME</th>
                                            <th className="px-6 py-5">ROLE</th>
                                            <th className="px-6 py-5">LAST LOGIN</th>
                                            <th className="px-6 py-5">DEPT</th>
                                            <th className="px-6 py-5">STATUS</th>
                                            <th className="px-6 py-5 rounded-tr-2xl">ACTIONS</th>
                                        </tr>
                                    ) : (
                                        <tr className="bg-[#f8fbff] text-slate-400 text-xs font-extrabold uppercase tracking-widest border-b border-slate-100">
                                            <th className="px-6 py-5 rounded-tl-2xl">PATIENT NAME</th>
                                            <th className="px-6 py-5">ID</th>
                                            <th className="px-6 py-5">DEMOGRAPHICS</th>
                                            <th className="px-6 py-5">LAST VISIT</th>
                                            <th className="px-6 py-5">UPCOMING</th>
                                            <th className="px-6 py-5">STATUS</th>
                                            <th className="px-6 py-5 rounded-tr-2xl">ACTIONS</th>
                                        </tr>
                                    )}

                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {activeTab === 'staff' ? (
                                        mockStaff.map((staff) => (
                                            <tr key={staff.id} onClick={() => navigate(`/users/${staff.id}`)} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-900">{staff.name}</span>
                                                            <span className="text-xs text-slate-400 font-medium">{staff.subtitle}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-extrabold text-slate-900">{staff.username}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`font-bold ${staff.role === 'Doctor' ? 'text-blue-500' : 'text-emerald-500'}`}>
                                                        {staff.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-slate-900">{staff.lastLogin}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-slate-900">{staff.dept}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${staff.status === 'Active'
                                                        ? 'bg-emerald-100 text-emerald-600'
                                                        : 'bg-slate-200 text-slate-500'
                                                        }`}>
                                                        {staff.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <button onClick={(e) => e.stopPropagation()} className="text-blue-500 hover:text-blue-700 font-bold text-sm transition-colors text-left">Edit</button>
                                                        <button onClick={(e) => e.stopPropagation()} className="text-red-500 hover:text-red-700 font-bold text-sm transition-colors text-left">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        mockPatients.map((patient) => (
                                            <tr key={patient.id} onClick={() => navigate(`/users/${patient.id}`)} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
                                                        <div className="flex flex-col">
                                                            <span className="font-extrabold text-slate-900">{patient.name}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-extrabold text-slate-900">{patient.patientId}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold tracking-wider">{patient.subtitle}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-slate-900">{patient.demographics}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-extrabold text-slate-900">{patient.lastVisit}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`font-bold ${patient.upcoming !== '-' ? 'text-blue-500 hover:text-blue-600 cursor-pointer' : 'text-slate-400'}`}>
                                                        {patient.upcoming}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${patient.status === 'Active'
                                                            ? 'bg-emerald-100 text-emerald-600'
                                                            : 'bg-slate-200 text-slate-500'
                                                        }`}>
                                                        {patient.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1.5">
                                                        <button onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:text-blue-800 font-extrabold text-xs transition-colors text-left uppercase tracking-wide">Edit</button>
                                                        <button onClick={(e) => e.stopPropagation()} className="text-red-500 hover:text-red-700 font-extrabold text-xs transition-colors text-left uppercase tracking-wide">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))

                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-[#f8fbff] px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-400">
                                Showing 1 to 5 of 1,234 results
                            </span>
                            <div className="flex items-center gap-1">
                                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">1</button>
                                <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-200 font-bold text-sm flex items-center justify-center transition-colors">2</button>
                                <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-200 font-bold text-sm flex items-center justify-center transition-colors">3</button>
                                <span className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">...</span>
                                <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-200 font-bold text-sm flex items-center justify-center transition-colors">32</button>
                                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserManagementList;
