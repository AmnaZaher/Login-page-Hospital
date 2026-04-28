import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Info, MapPin, Trash2, CheckCircle2, Circle, ChevronRight, Loader2, AlertCircle
} from 'lucide-react';
import { getClinicById, updateClinic } from '../../../api/clinics';
import type { Clinic, UpdateClinicDto } from '../../../types/clinics.types';

const EditClinic: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalClinic, setOriginalClinic] = useState<Clinic | null>(null);

  const [formData, setFormData] = useState({
    clinicNameEn: "",
    clinicNameAr: "",
    specialization: "",
    isActive: true,
    clinicCode: "",
    // The building/floor fields aren't in the standard API yet but we'll keep them in state for UI
    building: "Main Campus - North Wing",
    floorRoom: "Floor 4, Suite 402",
  });

  useEffect(() => {
    const fetchClinic = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await getClinicById(Number(id));
        
        // Handle different response formats
        const clinicData = (response as any)?.data?.data || (response as any)?.data || (response as any)?.clinic || response;
        
        if (clinicData && (clinicData.id !== undefined || clinicData.Id !== undefined)) {
          const c = clinicData;
          setOriginalClinic(c);
          setFormData({
            clinicNameEn: c.clinicNameEn || c.ClinicNameEn || "",
            clinicNameAr: c.clinicNameAr || c.ClinicNameAr || "",
            specialization: c.specialization || c.Specialization || "",
            isActive: c.isActive !== undefined ? c.isActive : (c.IsActive !== undefined ? c.IsActive : true),
            clinicCode: c.clinicCode || c.ClinicCode || "",
            building: "Main Campus - North Wing",
            floorRoom: "Floor 4, Suite 402",
          });
          setError(null);
        } else {
          setError("Failed to find clinic data in response.");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch clinic details");
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    try {
      setSaving(true);
      setError(null);
      
      const updateData: UpdateClinicDto = {
        clinicNameEn: formData.clinicNameEn,
        clinicNameAr: formData.clinicNameAr,
        specialization: formData.specialization,
        isActive: formData.isActive,
        clinicCode: formData.clinicCode,
      };

      const res = await updateClinic(Number(id), updateData);
      
      if (res.isSuccess !== false) {
        navigate(`/dashboard/clinics/${id}`);
      } else {
        setError(res.message || "Failed to update clinic");
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Loading Clinic...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen overflow-y-auto font-sans pb-20">
      
      {/* 1. الترويسة العلوية (Top Header) */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="text-slate-500 cursor-pointer hover:text-[#1A6FC4] transition-colors" onClick={() => navigate('/dashboard/clinics')}>Clinics Management</span>
          <ChevronRight size={14} />
          <span className="text-slate-500 cursor-pointer hover:text-[#1A6FC4] transition-colors" onClick={() => navigate(-1)}>Details</span>
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
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <main className="p-8 max-w-[1500px] mx-auto space-y-8">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-4">
            <AlertCircle className="text-red-500" />
            <p className="text-red-700 font-bold text-sm">{error}</p>
          </div>
        )}

        {/* عنوان الصفحة */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Clinic Details</h1>
          <p className="text-sm text-slate-500 font-medium">
            Modify core information for <span className="text-blue-600 font-bold underline decoration-2 underline-offset-4">{formData.clinicNameEn || "Clinic"}</span>
          </p>
        </div>

        {/* 2. توزيع المحتوى (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* العمود الأيسر (البيانات الأساسية) */}
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
                  <SelectField 
                    label="Specialization" 
                    value={formData.specialization} 
                    onChange={(val: string) => setFormData({...formData, specialization: val})}
                    options={['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Orthopedics']}
                  />
                  <InputField label="Clinic Code" value={formData.clinicCode} disabled />
                </div>
                <InputField label="ID" value={id} disabled />
              </div>
            </div>

            {/* Medical Staff (Placeholder for now) */}
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100"><Info size={18}/></div>
                  <h3 className="font-black text-slate-800 text-base">Medical Staff</h3>
                </div>
                <button className="text-blue-600 font-bold text-l hover:underline">Assign New</button>
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
                <tbody className="divide-y divide-slate-100 text-slate-400">
                  <tr>
                    <td colSpan={4} className="px-10 py-8 text-center font-bold text-sm">Staff management is handled in User Management</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* العمود الأيمن (الحالة والموقع) */}
          <div className="lg:col-span-4 space-y-8">
            {/* بطاقة الحالة (Clinic Status) */}
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
            </div>

            {/* بطاقة الموقع (Location) */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <MapPin size={22} className="text-blue-600" />
                <h3 className="font-black text-slate-800 text-base">Location & Contact</h3>
              </div>
              <InputField label="Building/Wing" value={formData.building} onChange={(v: string) => setFormData({...formData, building: v})} />
              <InputField label="Floor & Room" value={formData.floorRoom} onChange={(v: string) => setFormData({...formData, floorRoom: v})} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

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
    </div>
  </div>
);

const SelectField = ({ label, value, options, onChange }: any) => (
  <div className="w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block tracking-[0.2em] ml-1">{label}</label>
    <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer shadow-sm"
        >
            {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
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

export default EditClinic;