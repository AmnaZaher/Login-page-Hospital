import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Droplets,
  AlertCircle,
} from 'lucide-react';

interface PatientProfile {
  id: string;
  name: string;
  patientId: string;
  gender: string;
  age: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  lastVisit: string;
  upcomingAppointment: string;
  status: 'Active' | 'Disabled';
  avatar: string;
}

const mockPatientData: Record<string, PatientProfile> = {
  '1': {
    id: '1',
    name: 'Sara Magdy',
    patientId: '#P-45',
    gender: 'Female',
    age: '32',
    bloodGroup: 'A+',
    phone: '+1 (555) 334-8726',
    email: 'sara.magdy@email.com',
    address: '256 Oak Valley rd, Apartment 12B, Springfield, IL',
    nationalId: '1232-3422',
    emergencyContactName: 'Ahmed Magdy',
    emergencyContactPhone: '+1 (555) 900-1234',
    lastVisit: 'Jan 12, 2024',
    upcomingAppointment: 'Feb 15, 2024',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  '2': {
    id: '2',
    name: 'Sara Magdy',
    patientId: '#P-45',
    gender: 'Female',
    age: '32',
    bloodGroup: 'B+',
    phone: '+1 (555) 442-1299',
    email: 'sara2.magdy@email.com',
    address: '112 North Ave, Springfield, IL',
    nationalId: '1232-3422',
    emergencyContactName: 'Mohamed Ali',
    emergencyContactPhone: '+1 (555) 800-5678',
    lastVisit: 'Jan 12, 2024',
    upcomingAppointment: '-',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  '3': {
    id: '3',
    name: 'Sara Magdy',
    patientId: '#P-45',
    gender: 'Female',
    age: '32',
    bloodGroup: 'O-',
    phone: '+1 (555) 112-3344',
    email: 'sara3.magdy@email.com',
    address: '78 Elm Street, Chicago, IL',
    nationalId: '1232-3422',
    emergencyContactName: 'Layla Hassan',
    emergencyContactPhone: '+1 (555) 700-9012',
    lastVisit: 'Jan 12, 2024',
    upcomingAppointment: 'Feb 15, 2024',
    status: 'Disabled',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  '4': {
    id: '4',
    name: 'Sara Magdy',
    patientId: '#P-45',
    gender: 'Female',
    age: '32',
    bloodGroup: 'AB+',
    phone: '+1 (555) 223-4455',
    email: 'sara4.magdy@email.com',
    address: '45 Maple Ave, Evanston, IL',
    nationalId: '1232-3422',
    emergencyContactName: 'Omar Said',
    emergencyContactPhone: '+1 (555) 600-3456',
    lastVisit: 'Jan 12, 2024',
    upcomingAppointment: 'Feb 15, 2024',
    status: 'Disabled',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  '5': {
    id: '5',
    name: 'Sara Magdy',
    patientId: '#P-45',
    gender: 'Female',
    age: '32',
    bloodGroup: 'A-',
    phone: '+1 (555) 334-6677',
    email: 'sara5.magdy@email.com',
    address: '99 Pine Street, Oak Park, IL',
    nationalId: '1232-3422',
    emergencyContactName: 'Nour Khalil',
    emergencyContactPhone: '+1 (555) 500-7890',
    lastVisit: 'Jan 12, 2024',
    upcomingAppointment: 'Feb 15, 2024',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=16',
  },
};

const PatientProfileDetail = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (id && mockPatientData[id]) {
        setPatient(mockPatientData[id]);
      } else {
        setPatient(mockPatientData['1']);
      }
      setLoading(false);
    }, 400);
  }, [id]);

  const breadcrumb = (
    <span className="text-slate-400">
      <span
        className="cursor-pointer hover:text-slate-600 transition-colors"
        onClick={() => navigate('/users')}
      >
        User Management
      </span>{' '}
      <span className="mx-2">›</span>{' '}
      <span className="text-slate-900">Patient Profile</span>
    </span>
  ) as any;

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-slate-50 relative font-sans w-full">
        <TopBar title={breadcrumb} onMenuClick={onMenuClick} onAddUserClick={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!patient) return null;

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-50 relative font-sans overflow-hidden">
      <TopBar title={breadcrumb} onMenuClick={onMenuClick} onAddUserClick={() => {}} />

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 md:space-y-8 pb-10">

          {/* Header Card */}
          <div className="bg-white rounded-[24px] p-6 lg:p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
            <button className="absolute top-6 right-6 flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>

            <div className="relative shrink-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-2 border-2 border-blue-50">
                <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover rounded-full bg-slate-100" />
              </div>
              {patient.status === 'Active' && (
                <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left pt-2 md:pt-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{patient.name}</h1>
                <span className="bg-[#eff6ff] text-blue-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider">
                  Patient
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider ${patient.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {patient.status}
                </span>
              </div>

              <p className="text-base text-slate-400 font-bold mb-6">
                Patient ID: {patient.patientId} <span className="mx-2">•</span> {patient.gender}, {patient.age} yrs
              </p>

              <div className="flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-sm font-bold text-slate-600 truncate">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-sm font-bold text-slate-600 truncate">{patient.address.split(',')[0]}</span>
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
                  <p className="text-base font-bold text-slate-900">{patient.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#b0bec5] mb-1">National ID</p>
                  <p className="text-base font-bold text-slate-900">{patient.nationalId}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#b0bec5] mb-1">Gender</p>
                  <p className="text-base font-bold text-slate-900">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#b0bec5] mb-1">Phone Number</p>
                  <p className="text-base font-bold text-slate-900">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#b0bec5] mb-1">Email Address</p>
                  <p className="text-base font-bold text-slate-900 break-all">{patient.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#b0bec5] mb-1">Address</p>
                  <p className="text-base font-bold text-slate-900">{patient.address}</p>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-slate-100/60">
                <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight">Medical Information</h2>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#b0bec5] mb-0.5">Blood Group</p>
                    <p className="text-base font-extrabold text-slate-900">{patient.bloodGroup}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#b0bec5] mb-1">Patient ID</p>
                  <span className="inline-block mt-1 bg-[#eff6ff] text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold">
                    {patient.patientId}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#b0bec5] mb-1">Age</p>
                  <p className="text-base font-bold text-slate-900">{patient.age} years</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <p className="text-xs font-black text-amber-600 tracking-widest uppercase">Emergency Contact</p>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900">{patient.emergencyContactName}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm font-bold text-slate-500">{patient.emergencyContactPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit & Account Info */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-slate-100/60">
                <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight">Visit & Account Info</h2>
              </div>
              <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col">

                {/* Last Visit */}
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black tracking-widest text-[#b0bec5] uppercase mb-0.5">LAST VISIT</p>
                    <p className="text-sm font-extrabold text-slate-900">{patient.lastVisit}</p>
                  </div>
                </div>

                {/* Upcoming Appointment */}
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black tracking-widest text-[#b0bec5] uppercase mb-0.5">UPCOMING APPOINTMENT</p>
                    <p className={`text-sm font-extrabold ${patient.upcomingAppointment !== '-' ? 'text-blue-600' : 'text-slate-400'}`}>
                      {patient.upcomingAppointment}
                    </p>
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
                      <span className="text-sm font-extrabold text-slate-900">{patient.status}</span>
                      <div className={`w-2 h-2 rounded-full ${patient.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 hidden md:block"></div>
                <div className="mt-auto md:mt-0 pb-2">
                  <button className="w-full py-4 rounded-[14px] border-2 border-red-100 text-red-500 font-extrabold hover:bg-red-50 transition-colors uppercase tracking-wide text-sm">
                    DEACTIVATE ACCOUNT
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

export default PatientProfileDetail;
