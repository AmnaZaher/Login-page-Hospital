import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Plus, Search, Trash2, Info, 
  ChevronRight, CheckCircle2, Loader2
} from 'lucide-react';
import { getClinics } from '../../../api/clinics';
import { staffApi } from '../../../api/staff.ts';
import type { Clinic } from '../../../types/clinics.types';
import type { StaffMember } from '../../../types/staff.types';

const AssignStaff: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Doctors' | 'Nurses'>('Doctors');
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loadingClinics, setLoadingClinics] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClinicId, setSelectedClinicId] = useState(id || "");

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await getClinics({ PageSize: 100 });
        const list = (res as any).data?.data || (res as any).data || [];
        setClinics(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Failed to fetch clinics:", err);
      } finally {
        setLoadingClinics(false);
      }
    };
    fetchClinics();
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoadingStaff(true);
        const res = await staffApi.getStaffs({ 
          Role: activeTab === 'Doctors' ? 'Doctor' : 'Nurse',
          SearchKey: searchTerm,
          PageSize: 50
        });
        const list = (res as any).staffs || (res as any).items || (res as any).data || [];
        setStaff(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Failed to fetch staff:", err);
      } finally {
        setLoadingStaff(false);
      }
    };
    
    const timeoutId = setTimeout(fetchStaff, 300);
    return () => clearTimeout(timeoutId);
  }, [activeTab, searchTerm]);

  const handleAssign = (staffMember: StaffMember) => {
    // In a real app, this would call an API like scheduleApi.createSchedule
    // or a dedicated clinic-staff assignment endpoint.
    alert(`Assigning ${staffMember.name} to clinic ${selectedClinicId}`);
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen overflow-y-auto font-sans pb-10">
      
      {/* 1. Header Area */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="text-[#1A6FC4] cursor-pointer hover:text-blue-600" onClick={() => navigate('/dashboard/clinics')}>Clinics Management</span>
          <ChevronRight size={14} />
          <span className="text-[#1A6FC4] cursor-pointer hover:text-blue-600" onClick={() => navigate(-1)}>Details</span>
          <ChevronRight size={14} />
          <span className="text-[#1A6FC4]">Assign New</span>
        </div>
      </div>

      <main className="p-8 max-w-[1400px] mx-auto space-y-8">
        {/* 2. Page Title */}
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Assign Staff to Clinic</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Allocate medical personnel to specialized clinical units.</p>
        </div>

        {/* 3. Clinic Selection */}
        <div className="max-w-md space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Select Target Clinic</label>
          {loadingClinics ? (
            <div className="flex items-center gap-2 text-slate-400 p-4"><Loader2 size={16} className="animate-spin" /> Loading clinics...</div>
          ) : (
            <select 
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all cursor-pointer"
              value={selectedClinicId}
              onChange={(e) => setSelectedClinicId(e.target.value)}
            >
              <option value="">Select a Clinic</option>
              {clinics.map(c => (
                <option key={c.id} value={c.id}>{c.clinicNameEn || c.clinicNameAr || `Clinic ${c.id}`}</option>
              ))}
            </select>
          )}
        </div>

        {/* 4. Staff Selection Card */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setActiveTab('Doctors')}
              className={`px-12 py-5 text-sm font-bold transition-all relative ${activeTab === 'Doctors' ? 'text-blue-600 bg-white' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Doctors
              {activeTab === 'Doctors' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
            </button>
            <button 
              onClick={() => setActiveTab('Nurses')}
              className={`px-12 py-5 text-sm font-bold transition-all relative ${activeTab === 'Nurses' ? 'text-blue-600 bg-white' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Nurses
              {activeTab === 'Nurses' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
            </button>
          </div>

          <div className="p-10 space-y-8">
            {/* Search */}
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Search {activeTab}</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder={`Type ${activeTab.toLowerCase()} name or ID...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Hint */}
            <div className="flex items-center gap-4 text-blue-600 bg-blue-50/50 p-5 rounded-[24px] border border-blue-100">
              <Info size={18} />
              <p className="text-xs font-bold tracking-wide">One {activeTab.slice(0, -1).toLowerCase()} can be assigned to multiple clinics simultaneously.</p>
            </div>

            {/* Table */}
            <div className="border border-slate-100 rounded-[24px] overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeTab.slice(0, -1)} Name</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialization/Dept</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loadingStaff ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center"><Loader2 className="animate-spin mx-auto text-[#1A6FC4]" size={32} /></td>
                    </tr>
                  ) : staff.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-bold">No {activeTab.toLowerCase()} found.</td>
                    </tr>
                  ) : (
                    staff.map(s => (
                      <StaffRow 
                        key={s.id} 
                        name={s.name} 
                        id={s.id} 
                        spec={s.dept} 
                        status={s.status} 
                        onAssign={() => handleAssign(s)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pb-10 pt-4">
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle2 size={16} className="text-teal-500" />
            <p className="text-[10px] font-black uppercase tracking-widest">All changes are logged for auditing purposes</p>
          </div>
          <div className="flex gap-6 items-center">
            <button onClick={() => navigate(-1)} className="text-slate-500 font-black text-sm hover:text-slate-800 transition-colors uppercase tracking-widest">Cancel</button>
            <button 
              onClick={() => navigate(`/dashboard/clinics/${selectedClinicId}`)}
              className="px-12 py-4 bg-[#1A6FC4] text-white rounded-[20px] font-black text-sm shadow-2xl shadow-blue-200/60 hover:shadow-blue-300/80 transition-all uppercase tracking-widest"
            >
              Done
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Staff Row Component
const StaffRow = ({ name, id, spec, status, onAssign }: any) => (
  <tr className="group hover:bg-slate-50/50 transition-colors">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs border border-slate-200 group-hover:text-blue-600 transition-all">
          {name.split(' ').map((n:any) => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-black text-slate-800 mb-1">{name}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-xs">ID: {id}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-6 text-sm font-bold text-slate-600">{spec}</td>
    <td className="px-8 py-6 text-center">
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${status === 'Active' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
        ● {status}
      </span>
    </td>
    <td className="px-8 py-6 text-right">
      <button 
        onClick={onAssign}
        className="text-[#1A6FC4] hover:text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1 ml-auto"
      >
        <Plus size={14} /> Assign
      </button>
    </td>
  </tr>
);

export default AssignStaff;