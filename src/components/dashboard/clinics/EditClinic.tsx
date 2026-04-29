import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Info, MapPin, Trash2, CheckCircle2, Circle, ChevronRight, Loader2, Save 
} from 'lucide-react';
import { getClinicById, updateClinic } from '../../../api/clinics';
import { scheduleApi } from '../../../api/schedules';
import type { Clinic } from '../../../types/clinics.types';
import type { DoctorSchedule } from '../../../api/schedules';

const EditClinic: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clinicNameEn: "",
    clinicNameAr: "",
    specialization: "",
    isActive: true,
    workingDays: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [clinicRes, scheduleRes] = await Promise.all([
          getClinicById(Number(id)),
          scheduleApi.getSchedules({ ClinicId: Number(id), PageSize: 50 })
        ]);

        if (clinicRes.data) {
          const raw = clinicRes.data as any;
          const c = {
            ...raw,
            id: raw.id || raw.Id || Number(id)
          };
          setClinic(c);
          setFormData({
            clinicNameEn: c.clinicNameEn || "",
            clinicNameAr: c.clinicNameAr || "",
            specialization: c.specialization || "",
            isActive: c.isActive,
            workingDays: c.workingDays || ""
          });
        }

        const scheduleData = (scheduleRes as any).data?.data || (scheduleRes as any).data || [];
        setSchedules(Array.isArray(scheduleData) ? scheduleData : []);
      } catch (err: any) {
        console.error("Failed to fetch clinic:", err);
        setError("Could not load clinic data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    try {
      setSaving(true);
      setError(null);
      await updateClinic(Number(id), {
        clinicNameEn: formData.clinicNameEn,
        clinicNameAr: formData.clinicNameAr,
        specialization: formData.specialization,
        isActive: formData.isActive,
        workingDays: formData.workingDays
      });
      navigate(`/dashboard/clinics/${id}`);
    } catch (err: any) {
      console.error("Failed to update clinic:", err);
      setError(err.message || "Failed to update clinic.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#1A6FC4]" size={48} />
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-500 font-bold mb-4">Clinic not found.</p>
          <button onClick={() => navigate('/dashboard/clinics')} className="text-blue-600 underline">Back to Clinics</button>
        </div>
      </div>
    );
  }

  // Unique doctors for display
  const uniqueDoctors = Array.from(new Set(schedules.map(s => s.doctorId)))
    .map(docId => {
      const schedule = schedules.find(s => s.doctorId === docId);
      return {
        id: docId,
        name: schedule?.doctorName || `Doctor #${docId}`,
        specialization: clinic.specialization || "Specialist",
        status: "Active"
      };
    });

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen overflow-y-auto font-sans pb-20">
      
      {/* 1. Top Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="text-slate-500 cursor-pointer hover:text-[#1A6FC4] transition-colors" onClick={() => navigate('/dashboard/clinics')}>Clinics Management</span>
          <ChevronRight size={14} />
          <span className="text-slate-500 cursor-pointer hover:text-[#1A6FC4] transition-colors" onClick={() => navigate(`/dashboard/clinics/${id}`)}>Details</span>
          <ChevronRight size={14} />
          <span className="text-blue-600 font-black">Edit Clinic</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="text-slate-400 font-black text-sm hover:text-slate-600 transition-colors uppercase tracking-widest">Cancel</button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1A6FC4] text-white px-10 py-3 rounded-xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      </div>

      <main className="p-8 max-w-[1500px] mx-auto space-y-8">
        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Clinic Details</h1>
          <p className="text-sm text-slate-500 font-medium">
            Modify core information for <span className="text-blue-600 font-bold underline decoration-2 underline-offset-4">{clinic.clinicNameEn || clinic.clinicNameAr}</span>
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-bold">
            {error}
          </div>
        )}

        {/* 2. Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (General Info) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                    <Info size={22} />
                </div>
                <h3 className="font-black text-slate-800 text-lg tracking-tight">General Information</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <InputField 
                    label="Clinic Name EN" 
                    value={formData.clinicNameEn} 
                    onChange={(val: string) => setFormData({...formData, clinicNameEn: val})}
                />
                <InputField 
                    label="Clinic Name AR" 
                    value={formData.clinicNameAr} 
                    onChange={(val: string) => setFormData({...formData, clinicNameAr: val})}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField 
                    label="Specialization" 
                    value={formData.specialization} 
                    onChange={(val: string) => setFormData({...formData, specialization: val})}
                  />
                  <InputField label="Clinic Code" value={clinic.clinicCode || `C-${clinic.id}`} disabled />
                </div>
                <InputField 
                  label="Working Days" 
                  value={formData.workingDays} 
                  onChange={(val: string) => setFormData({...formData, workingDays: val})}
                  placeholder="e.g. Monday, Tuesday, Wednesday"
                />
              </div>
            </div>

            {/* Medical Staff Table */}
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100"><Info size={18}/></div>
                  <h3 className="font-black text-slate-800 text-base">Medical Staff</h3>
                </div>
                <button 
                    onClick={() => navigate(`/dashboard/clinics/assign/${id}`)} 
                    className="text-blue-600 font-bold text-l hover:underline"
                >
                  Assign New
                </button>
              </div>
              
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Doctor Name</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Specialization</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {uniqueDoctors.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-10 text-center text-slate-400 font-bold">No staff assigned.</td>
                    </tr>
                  ) : (
                    uniqueDoctors.map(doc => (
                      <StaffRow key={doc.id} name={doc.name} role="Doctor" spec={doc.specialization} status={doc.status} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (Status) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
                <h3 className="font-black text-slate-800 text-base tracking-tight">Clinic Status</h3>
              </div>
              <div className="space-y-4">
                <StatusOption 
                    label="Active" 
                    desc="Accepting new appointments" 
                    isActive={formData.isActive} 
                    onClick={() => setFormData({...formData, isActive: true})} 
                />
                <StatusOption 
                    label="Inactive" 
                    desc="Hidden from scheduling" 
                    isActive={!formData.isActive} 
                    onClick={() => setFormData({...formData, isActive: false})} 
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-8 leading-relaxed font-bold italic">
                * Inactive clinics retain historical data but cannot be booked by patients.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- المكونات الفرعية (Helper Components) - كاملة التفاصيل ---

const InputField = ({ label, value, onChange, disabled = false }: any) => (
  <div className="w-full group">
    <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-[0.2em] ml-1 group-focus-within:text-blue-600 transition-colors">
        {label}
    </label>
    <div className="relative">
        <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange && onChange(e.target.value)}
            disabled={disabled}
            className={`w-full rounded-2xl px-6 py-4 text-sm font-black outline-none border transition-all shadow-sm
            ${disabled ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed shadow-none' : 'bg-white border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5'}`}
        />
        {disabled && <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20"><Info size={14}/></div>}
    </div>
  </div>
);

const SelectField = ({ label, value, options }: any) => (
  <div className="w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-[0.2em] ml-1">{label}</label>
    <div className="relative">
        <select className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer shadow-sm">
            {options?.map((opt: string) => <option key={opt}>{opt}</option>) || <option>{value}</option>}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronRight size={16} className="rotate-90" />
        </div>
    </div>
  </div>
);

const StatusOption = ({ label, desc, isActive, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`flex items-start gap-4 p-5 rounded-[24px] border-2 transition-all cursor-pointer shadow-sm ${isActive ? 'border-blue-600 bg-blue-50/20' : 'border-slate-50 hover:border-slate-100'}`}
  >
    <div className={`mt-0.5 ${isActive ? 'text-blue-600' : 'text-slate-200'}`}>
      {isActive ? <CheckCircle2 size={22} fill="currentColor" className="text-blue-600 fill-blue-50" /> : <Circle size={22}/>}
    </div>
    <div>
        <span className={`text-sm font-black block ${isActive ? 'text-blue-700' : 'text-slate-400'}`}>{label}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1 block">{desc}</span>
    </div>
  </div>
);

const StaffRow = ({ name, role, spec, status }: any) => (
  <tr className="group hover:bg-slate-50 transition-colors">
    <td className="px-10 py-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs border border-blue-100 shadow-inner group-hover:scale-110 transition-transform">
          {name.split(' ').map((n:any) => n[0]).join('').slice(1)}
        </div>
        <div>
          <p className="text-sm font-black text-slate-800 leading-none mb-1.5">{name}</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{role}</p>
        </div>
      </div>
    </td>
    <td className="px-10 py-6 text-sm font-bold text-slate-600">{spec}</td>
    <td className="px-10 py-6">
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
        status === 'On-Duty' ? 'bg-teal-50 text-teal-600 border-teal-100' : 
        status === 'Emergency' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-100'
      }`}>
        ● {status}
      </span>
    </td>
    <td className="px-10 py-6 text-right">
      <button className="text-red-200 hover:text-red-500 p-2.5 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
    </td>
  </tr>
);

export default EditClinic;