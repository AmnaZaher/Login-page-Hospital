import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { 
  MapPin, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  History 
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  licenseId: string;
  location: string;
  email: string;
  nationalId: string;
  phone: string;
  address: string;
  gender: string;
  experience: string;
  qualifications: string;
  status: 'Active' | 'Disabled';
  lastLogin: string;
  avatar: string;
}

const mockStaffData: Record<string, UserProfile> = {
  '1': {
    id: '1',
    name: 'Dr. Ali Mohamed Ahmed',
    role: 'Senior Cardiologist',
    department: 'Cardiology Department',
    licenseId: '#MC-55635-2024',
    location: 'Clinic Wing A, Room 23',
    email: 'A.MOHAMED@host.com',
    nationalId: 'XXX-XX-2343',
    phone: '+1 (555) 334-8726',
    address: '256 Oah Valley rd, Apartment 12B, Springfield, IL',
    gender: 'Male',
    experience: '12 Years',
    qualifications: 'MD from Johns Hopkins Universty',
    status: 'Active',
    lastLogin: '2 hours ago from terminal B-12',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  '2': {
    id: '2',
    name: 'Nurse Amr Mohamed',
    role: 'Senior Nurse',
    department: 'Emergency Department',
    licenseId: '#NR-22123-2023',
    location: 'ER Ward, Station 2',
    email: 'A.MOHAMED@host.com',
    nationalId: 'XXX-XX-4421',
    phone: '+1 (555) 442-1299',
    address: '112 North Ave, Springfield, IL',
    gender: 'Male',
    experience: '8 Years',
    qualifications: 'BSN from State University',
    status: 'Disabled',
    lastLogin: 'Jan 12, 2024',
    avatar: 'https://i.pravatar.cc/150?img=12'
  }
};

const UserProfileDetail = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (id && mockStaffData[id]) {
        setUser(mockStaffData[id]);
      } else {
        setUser(mockStaffData['1']);
      }
      setLoading(false);
    }, 400); 
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-slate-50 relative font-sans w-full">
        <TopBar title={<span className="text-slate-400">User Management <span className="mx-2">&rsaquo;</span> <span className="text-slate-900">Profile Detail</span></span> as any} onMenuClick={onMenuClick} onAddUserClick={() => {}} />
        <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-50 relative font-sans overflow-hidden">
      <TopBar 
        title={
          <span className="text-slate-400">
            <span className="cursor-pointer hover:text-slate-600 transition-colors" onClick={() => navigate('/users')}>User Management</span> 
            <span className="mx-2">&rsaquo;</span> 
            <span className="text-slate-900">Profile Detail</span>
          </span> as any
        }
        onMenuClick={onMenuClick} 
        onAddUserClick={() => {}} 
      />

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 md:space-y-8 pb-10">
          
          {/* Header Section */}
          <div className="bg-white rounded-[24px] p-6 lg:p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
            <button className="absolute top-6 right-6 flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
               </svg>
               Edit
            </button>
            <div className="relative shrink-0">
               <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-2 border-2 border-blue-50">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full bg-slate-100" />
               </div>
               {user.status === 'Active' && (
                 <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
               )}
            </div>
            
            <div className="flex-1 text-center md:text-left pt-2 md:pt-0">
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
                 <h1 className="text-3xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{user.name.replace('Ahmed', '').trim()}</h1>
                 <span className="bg-[#eff6ff] text-blue-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider">
                   {user.role}
                 </span>
               </div>
               
               <p className="text-base text-slate-400 font-bold mb-6">
                 {user.department} <span className="mx-2">&bull;</span> Medical License ID: {user.licenseId}
               </p>

               <div className="flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-start gap-3">
                 <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-sm font-bold text-slate-600 truncate">{user.location}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-sm font-bold text-slate-600 truncate">{user.email}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Personal Information */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
               <div className="px-8 py-6 border-b border-slate-100/60">
                 <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight">Personal Information</h2>
               </div>
               <div className="p-8 space-y-6 flex-1">
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Full Name</p>
                   <p className="text-base font-bold text-slate-900">{user.name}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">National ID</p>
                   <p className="text-base font-bold text-slate-900">{user.nationalId}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Phone Number</p>
                   <p className="text-base font-bold text-slate-900">{user.phone}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Email Address</p>
                   <p className="text-base font-bold text-slate-900 break-all">{user.email}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Address</p>
                   <p className="text-base font-bold text-slate-900">{user.address}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Gender</p>
                   <p className="text-base font-bold text-slate-900">{user.gender}</p>
                 </div>
               </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
               <div className="px-8 py-6 border-b border-slate-100/60">
                 <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight">Professional Details</h2>
               </div>
               <div className="p-8 space-y-6 flex-1">
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Clinical Role</p>
                   <p className="text-base font-bold text-slate-900">{user.role}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Department</p>
                   <p className="text-base font-bold text-slate-900">{user.department}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Clinic Assignment</p>
                   <span className="inline-block mt-1 bg-[#eff6ff] text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold">
                     {user.location}
                   </span>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">License Number</p>
                   <p className="text-base font-bold text-slate-900">{user.licenseId} ({user.status})</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Professional Experience</p>
                   <p className="text-base font-bold text-slate-900">{user.experience}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-[#b0bec5] mb-1">Qualifications</p>
                   <p className="text-base font-bold text-slate-900">{user.qualifications}</p>
                 </div>
               </div>
            </div>

            {/* Work & Account Info */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
               <div className="px-8 py-6 border-b border-slate-100/60">
                 <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight">Work & Account Info</h2>
               </div>
               <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col">
                 
                 {/* Weekly Schedule */}
                 <div className="bg-[#f8fbff] rounded-[20px] p-6 border border-blue-50/50">
                    <h3 className="text-sm font-black text-blue-600 tracking-widest uppercase mb-4">WEEKLY SCHEDULE</h3>
                    <div className="flex justify-between items-center mb-4 px-2">
                       {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                         <div key={i} className="flex flex-col items-center gap-2">
                           <span className="text-xs font-black text-[#b0bec5]">{day}</span>
                           <div className={`w-2.5 h-2.5 rounded-full ${i < 5 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                         </div>
                       ))}
                    </div>
                    <p className="text-sm font-bold text-slate-500">Morning Shift (8 AM - 4 PM)</p>
                 </div>

                 {/* Next Shift */}
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black tracking-widest text-[#b0bec5] uppercase mb-0.5">NEXT SHIFT</p>
                      <p className="text-sm font-extrabold text-slate-900">Tomorrow, 08:00 AM</p>
                    </div>
                 </div>

                 {/* Account Status */}
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black tracking-widest text-[#b0bec5] uppercase mb-0.5">ACCOUNT STATUS</p>
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900">{user.status}</span>
                          {user.status === 'Active' ? (
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          ) : (
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          )}
                      </div>
                    </div>
                 </div>

                 {/* Last Login */}
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <History className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black tracking-widest text-[#b0bec5] uppercase mb-0.5">LAST LOGIN</p>
                      <p className="text-sm font-extrabold text-slate-900">{user.lastLogin}</p>
                    </div>
                 </div>

                 <div className="mt-auto pt-6 border-t border-slate-50 hidden md:block"></div>
                 <div className="mt-auto md:mt-0 pb-2">
                    <button className="w-full py-4 rounded-[14px] border-2 border-red-100 text-red-500 font-extrabold hover:bg-red-50 transition-colors uppercase tracking-wide text-sm">
                        DEACTIVE ACCOUNT
                    </button>
                 </div>

               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetail;
