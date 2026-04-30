import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Plus,
  Users,
  Clock,
  Info,
  MapPin,
  ChevronRight,
  Loader2,
} from "lucide-react";
import DeleteModal from "./DeleteModal";
import { getClinicById, deleteClinic } from "../../../api/clinics";
import { scheduleApi } from "../../../api/schedules";
import type { Clinic } from "../../../types/clinics.types";
import type { DoctorSchedule } from "../../../api/schedules";

const ClinicDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const [clinicRes, scheduleRes] = await Promise.all([
        getClinicById(Number(id)),
        scheduleApi.getSchedules({ ClinicId: Number(id), PageSize: 50 })
      ]);

      if (clinicRes.data) {
        const data = clinicRes.data as any;
        setClinic({
          ...data,
          id: data.id || data.Id || Number(id)
        });
      } else {
        throw new Error("Clinic not found");
      }

      const scheduleData = (scheduleRes as any).data?.data || (scheduleRes as any).data || [];
      setSchedules(Array.isArray(scheduleData) ? scheduleData : []);

    } catch (err: any) {
      console.error("Error fetching clinic details:", err);
      setError(err.message || "Failed to load clinic details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteConfirm = async () => {
    const idToDelete = clinic?.id || id;
    if (!idToDelete) return;
    
    try {
      await deleteClinic(idToDelete);
      setIsDeleteModalOpen(false);
      navigate("/dashboard/clinics");
    } catch (err: any) {
      console.error("Failed to delete clinic:", err);
      alert(`Failed to delete clinic: ${err.message || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto text-[#1A6FC4] mb-4" size={48} />
          <p className="text-slate-600 font-bold">Loading clinic details...</p>
        </div>
      </div>
    );
  }

  if (error || !clinic) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
          <div className="text-red-500 mb-4">
            <Info size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Error Occurred</h2>
          <p className="text-slate-500 mb-6">{error || "Clinic data could not be retrieved."}</p>
          <button 
            onClick={() => navigate("/dashboard/clinics")}
            className="px-6 py-2 bg-[#1A6FC4] text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            Back to Clinics
          </button>
        </div>
      </div>
    );
  }

  // Get unique doctors from schedules
  const uniqueDoctors = Array.from(new Set(schedules.map(s => s.doctorId)))
    .map(docId => {
      const schedule = schedules.find(s => s.doctorId === docId);
      return {
        id: docId,
        name: schedule?.doctorName || `Doctor #${docId}`,
        specialization: clinic.specialization || "Medical Specialist",
        status: "Active" // Mock status for now
      };
    });

  return (
    <div className="relative w-full h-screen overflow-y-auto bg-slate-50 font-sans scroll-smooth">
      <div
        className={`flex flex-col min-h-full transition-all duration-300 ${
          isDeleteModalOpen ? "blur-sm scale-[0.99] pointer-events-none" : ""
        }`}
      >
        {/* Header Area - Sticky */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 text-sm">
              <span
                className="text-slate-500 cursor-pointer hover:text-[#1A6FC4] font-medium"
                onClick={() => navigate("/dashboard/clinics")}
              >
                CLINICS MANAGEMENT
              </span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-[#1A6FC4] font-bold uppercase tracking-wider">
                Details
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="p-8 w-full space-y-8 flex-1">
          
          {/* Title & Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {clinic.clinicNameEn || clinic.clinicNameAr || "Unnamed Clinic"}
              </h1>
              <span className={`px-3 py-1 text-[10px] font-black rounded-full border flex items-center gap-1 shadow-sm ${
                clinic.isActive 
                ? "bg-blue-50 text-blue-600 border-blue-100" 
                : "bg-slate-50 text-slate-500 border-slate-100"
              }`}>
                <span className="text-[8px]">●</span> {clinic.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setIsDeleteModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all border border-red-100">
                <Trash2 size={16} /> Delete
              </button>
              <button onClick={() => navigate("/dashboard/clinics")} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => navigate(`/dashboard/clinics/edit/${id}`)} className="flex items-center gap-2 px-6 py-2 bg-[#1A6FC4] text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
                <Edit2 size={16} /> Edit Clinic
              </button>
              <button onClick={() => navigate(`/dashboard/clinics/AddClinic`)} className="p-2 bg-[#1A6FC4] text-white rounded-xl shadow-lg shadow-blue-100 hover:scale-105 transition-all">
                <Plus size={24} />
              </button>
            </div>
          </div>

          {/* Top Section: Info & Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Basic Info */}
            <div className="xl:col-span-3 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-10 text-slate-800 font-bold">
                <div className="p-2.5 bg-blue-50 rounded-xl"><Info size={22} className="text-[#1A6FC4]" /></div>
                <h3 className="text-xl">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6">
                <InfoItem label="CLINIC NAME EN" value={clinic.clinicNameEn || "N/A"} />
                <InfoItem label="CLINIC NAME AR" value={clinic.clinicNameAr || "N/A"} />
                <InfoItem label="CLINIC CODE" value={clinic.clinicCode || `C-${clinic.id}`} />
                <InfoItem label="SPECIALIZATION" value={clinic.specialization || "General"} />
                <InfoItem label="STATUS" value={clinic.isActive ? "Active" : "Inactive"} highlight />
                <InfoItem label="WORKING DAYS" value={clinic.workingDays || "Not Set"} />
              </div>
            </div>

            {/* Side Stats */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-[#1A6FC4] p-8 rounded-3xl text-white relative overflow-hidden h-[160px] flex flex-col justify-center shadow-xl shadow-blue-100">
                <p className="text-blue-100 text-[10px] font-black mb-2 tracking-[0.2em]">DOCTORS ASSIGNED</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{uniqueDoctors.length}</span>
                </div>
                <Users className="absolute bottom-[-20px] right-[-20px] opacity-10" size={140} />
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-[160px] flex flex-col justify-center">
                <p className="text-slate-400 text-[10px] font-black mb-2 tracking-[0.2em]">SCHEDULED SLOTS</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">{schedules.length}</span>
                  <span className="text-emerald-500 text-xs font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Staff & Hours */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Medical Staff Table */}
            <div className="xl:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b border-slate-50">
                <div className="flex items-center gap-3 font-bold text-slate-800">
                  <div className="p-2 bg-blue-50 rounded-xl"><Users size={22} className="text-[#1A6FC4]" /></div>
                  <h3 className="text-xl">Medical Staff</h3>
                </div>
                <button onClick={() => navigate(`/dashboard/clinics/assign/${id}`)} className="text-[#1A6FC4] text-sm font-black hover:underline tracking-tight">Assign New</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                    <tr>
                      <th className="px-8 py-5">Staff Name</th>
                      <th className="px-8 py-5">Specialization</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {uniqueDoctors.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-medium">
                          No staff assigned to this clinic yet.
                        </td>
                      </tr>
                    ) : (
                      uniqueDoctors.map(doc => (
                          <StaffRow 
                            key={doc.id}
                            name={doc.name} 
                            role="Medical Staff" 
                            spec={doc.specialization} 
                          status={doc.status} 
                          statusColor="text-blue-600 bg-blue-50" 
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="xl:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
               <div className="p-6 border-b border-slate-50 flex items-center gap-3 font-bold text-slate-800">
                  <div className="p-2 bg-blue-50 rounded-xl"><Clock size={22} className="text-[#1A6FC4]" /></div>
                  <h3 className="text-xl">Working Hours</h3>
               </div>
               <div className="p-8 flex-1">
                  <div className="space-y-5">
                    {schedules.length === 0 ? (
                       <p className="text-slate-400 text-sm italic">No schedules set for this clinic.</p>
                    ) : (
                      schedules.slice(0, 7).map((s, idx) => (
                        <HourRow 
                          key={idx}
                          day={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][s.dayOfWeek]} 
                          from={s.startTime} 
                          to={s.endTime} 
                        />
                      ))
                    )}
                  </div>
                  {clinic.workingDays && (
                    <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex flex-col gap-2 border border-blue-100/50">
                      <span className="text-blue-700 font-black text-xs uppercase tracking-widest">Active Days</span>
                      <span className="text-blue-600 text-[11px] font-bold uppercase">{clinic.workingDays}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Location Banner */}
          <div className="relative h-[280px] rounded-[2rem] overflow-hidden group shadow-xl mb-12">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover duration-1000"
              alt="Clinic Building"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-10">
              <div className="text-white flex items-center gap-6">
                <div className="p-4 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl">
                  <MapPin size={28} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-black text-2xl tracking-tight mb-1">Clinic Location</p>
                  <p className="text-slate-300 font-medium text-lg">Hospital Main Campus - {clinic.specialization || "General"} Department</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-4"></div>
        </main>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={clinic.clinicNameEn || clinic.clinicNameAr || "Clinic"}
        itemId={clinic.id?.toString() || id || ""}
      />
    </div>
  );
};


// --- المكونات المساعدة ---

const InfoItem = ({ label, value, highlight = false }: any) => (
  <div className="space-y-2.5">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
      {label}
    </p>
    <p className={`text-[15px] font-bold tracking-tight ${highlight ? "text-[#1A6FC4]" : "text-slate-800"}`}>
      {highlight && <span className="mr-2 text-[8px] inline-block animate-pulse">●</span>}
      {value}
    </p>
  </div>
);

const StaffRow = ({ name, role, spec, status, statusColor }: any) => (
  <tr className="hover:bg-slate-50/50 transition-all group">
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden group-hover:border-blue-100 transition-all">
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=random&font-size=0.4`}
            alt={name}
          />
        </div>
        <div>
          <p className="text-sm font-black text-slate-900 leading-tight group-hover:text-[#1A6FC4] transition-colors">
            {name}
          </p>
          <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-wider">
            {role}
          </p>
        </div>
      </div>
    </td>
    <td className="px-8 py-5 text-xs font-bold text-slate-600">{spec}</td>
    <td className="px-8 py-5">
      <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-current opacity-90 ${statusColor}`}>
        ● {status}
      </span>
    </td>
    <td className="px-8 py-5 text-center">
      <button className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
);

const HourRow = ({ day, from, to }: any) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 hover:px-1 transition-all">
    <span className="font-bold text-slate-700 text-sm tracking-tight">{day}</span>
    <div className="flex gap-4 text-slate-400 font-black text-[11px]">
      <span className="bg-slate-50 px-2 py-1 rounded-lg">{from}</span>
      <span className="text-slate-200 self-center">—</span>
      <span className="bg-slate-50 px-2 py-1 rounded-lg">{to}</span>
    </div>
  </div>
);

export default ClinicDetails;