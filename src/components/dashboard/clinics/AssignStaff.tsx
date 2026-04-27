import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Plus, Search, Trash2, Info, 
  ChevronRight, CheckCircle2 
} from 'lucide-react';

const AssignStaff: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Doctors' | 'Nurses'>('Doctors');

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen overflow-y-auto font-sans pb-10">
      
      {/* 1. Header العلوي (ثابت عند التمرير) */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="text-[#1A6FC4] cursor-pointer hover:text-blue-600" onClick={() => navigate('/ClinicsList')}>Clinics Management</span>
          <ChevronRight size={14} />
          <span className="text-[#1A6FC4] cursor-pointer hover:text-blue-600" onClick={() => navigate(-1)}>Details</span>
          <ChevronRight size={14} />
          <span className="text-[#1A6FC4]">Assign New</span>
        </div>
      </div>

      <main className="p-8 max-w-[1400px] mx-auto space-y-8">
        {/* 2. عنوان الصفحة */}
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Assign Staff to Clinic</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Allocate medical personnel to specialized clinical units.</p>
        </div>

        {/* 3. اختيار العيادة */}
        <div className="max-w-md space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Select Target Clinic</label>
          <select 
            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all cursor-pointer"
            defaultValue={id || "Cardiology Outpatient - West Wing"}
          >
            <option value="WWD-482">{id === "WWD-482" ? "Metropolitan Cardiac Center" : "Cardiology Outpatient - West Wing"}</option>
            <option>Neurology Lab - East Wing</option>
            {id && id !== "WWD-482" && <option value={id}>Clinic ID: {id}</option>}
          </select>
        </div>

        {/* 4. البطاقة الرئيسية (التبويبات والجدول) */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          {/* التبويبات */}
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
            {/* البحث والإضافة */}
            <div className="space-y-3">
              <label className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Search & Select Doctor</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Type doctor name or ID..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <button className="bg-[#1A6FC4] text-white px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-lg hover:scale-[1.02] transition-all">
                  <Plus size={20} /> Assign Doctor
                </button>
              </div>
            </div>

            {/* تنبيه باللون الأزرق */}
            <div className="flex items-center gap-4 text-blue-600 bg-blue-50/50 p-5 rounded-[24px] border border-blue-100">
              <Info size={18} />
              <p className="text-xs font-bold tracking-wide">One doctor can be assigned to multiple clinics simultaneously.</p>
            </div>

            {/* الجدول */}
            <div className="border border-slate-100 rounded-[24px] overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Doctor Name</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialization</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <StaffRow name="Dr. Sarah Mitchell" id="DOC-8842" spec="Senior Cardiologist" status="On-Duty" />
                  <StaffRow name="Dr. James Chen" id="DOC-1290" spec="Interventional Specialist" status="On-Duty" />
                  <StaffRow name="Dr. Elena Petrov" id="DOC-5541" spec="Cardiovascular Resident" status="Available" />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 5. الفوتر السفلي (الذي كان مختفياً) */}
        <div className="flex items-center justify-between pb-10 pt-4">
          <div className="flex items-center gap-3 text-slate-400">
            <CheckCircle2 size={16} className="text-teal-500" />
            <p className="text-[10px] font-black uppercase tracking-widest">All changes are logged for auditing purposes</p>
          </div>
          <div className="flex gap-6 items-center">
            <button onClick={() => navigate(-1)} className="text-slate-500 font-black text-sm hover:text-slate-800 transition-colors uppercase tracking-widest">Cancel</button>
            <button className="px-12 py-4 bg-[#1A6FC4] text-white rounded-[20px] font-black text-sm shadow-2xl shadow-blue-200/60 hover:shadow-blue-300/80 transition-all uppercase tracking-widest">
              Save Assignments
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// مكون سطر الموظف
const StaffRow = ({ name, id, spec, status }: any) => (
  <tr className="group hover:bg-slate-50/50 transition-colors">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs border border-slate-200 group-hover:text-blue-600 transition-all">
          {name.split(' ').map((n:any) => n[0]).join('').slice(1)}
        </div>
        <div>
          <p className="text-sm font-black text-slate-800 mb-1">{name}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-xs">ID: {id}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-6 text-sm font-bold text-slate-600">{spec}</td>
    <td className="px-8 py-6 text-center">
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${status === 'On-Duty' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
        ● {status}
      </span>
    </td>
    <td className="px-8 py-6 text-right">
      <button className="text-red-200 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
    </td>
  </tr>
);

export default AssignStaff;