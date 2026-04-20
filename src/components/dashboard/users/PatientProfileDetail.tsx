import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { Badge, Button } from '../../ui';
import {
    ArrowLeft,
    Pencil,
    UserRound,
    Building2,
    Phone,
    Heart,
    AlertTriangle,
    FileText,
    Calendar,
    FlaskConical,
    Radiation,
    Pill,
    ClipboardList,
    Droplets,
    ShieldCheck,
    Languages,
    History,
    Activity,
    Syringe,
    Brain,
    Dumbbell,
    SlidersHorizontal,
    Download,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    ArrowRight,
    Bot,
    Beaker,
    MonitorDot,
    Scan,
    Bone,
    CircleAlert,
} from 'lucide-react';
import type { PatientProfile, Prescription } from '../../../types/patient.types';

// ====================================================================
//                          MOCK DATA HELPERS
// ====================================================================
const createMockVisits = () => [
    { id: 'v1', visitNumber: 'VSX-00892', date: 'Oct 24, 2023', time: '09:15 AM', doctor: { name: 'Dr. Sarah Alen', initials: 'SA', color: 'bg-blue-100 text-blue-600' }, department: 'Oncology', visitType: 'Follow-up', status: 'Completed' as const },
    { id: 'v2', visitNumber: 'VSX-00914', date: 'Nov 12, 2023', time: '02:30 PM', doctor: { name: 'Dr. Michael Khan', initials: 'MK', color: 'bg-emerald-100 text-emerald-600' }, department: 'Radiology', visitType: 'Diagnostic', status: 'In Progress' as const },
    { id: 'v3', visitNumber: 'VSX-00941', date: 'Nov 28, 2023', time: '11:00 AM', doctor: { name: 'Dr. Jean Laurent', initials: 'JL', color: 'bg-purple-100 text-purple-600' }, department: 'Oncology', visitType: 'Consultation', status: 'Waiting' as const },
    { id: 'v4', visitNumber: 'VSX-00755', date: 'Sep 15, 2023', time: '08:00 AM', doctor: { name: 'Dr. Sarah Alen', initials: 'SA', color: 'bg-blue-100 text-blue-600' }, department: 'Oncology', visitType: 'Initial Admit', status: 'Completed' as const },
    { id: 'v5', visitNumber: 'VSX-00612', date: 'Aug 05, 2023', time: '10:00 AM', doctor: { name: 'Dr. Sarah Alen', initials: 'SA', color: 'bg-blue-100 text-blue-600' }, department: 'Oncology', visitType: 'Follow-up', status: 'Completed' as const },
    { id: 'v6', visitNumber: 'VSX-00501', date: 'Jul 20, 2023', time: '03:00 PM', doctor: { name: 'Dr. Michael Khan', initials: 'MK', color: 'bg-emerald-100 text-emerald-600' }, department: 'Radiology', visitType: 'Diagnostic', status: 'Completed' as const },
];

const createMockLabResults = () => [
    { id: 'l1', testName: 'Complete Blood Count', testSubtitle: 'Standard Hematology Panel', date: 'Oct 24, 2023', doctor: { name: 'Dr. Sarah Alen', initials: 'SA', color: 'bg-blue-100 text-blue-600' }, status: 'Finalized' as const, icon: 'blood' as const },
    { id: 'l2', testName: 'Lipid Profile', testSubtitle: 'Cholesterol & Triglycerides', date: 'Sep 15, 2023', doctor: { name: 'Dr. Michael Khan', initials: 'MK', color: 'bg-emerald-100 text-emerald-600' }, status: 'Review Required' as const, icon: 'lipid' as const },
    { id: 'l3', testName: 'HbA1c', testSubtitle: 'Average Blood Glucose', date: 'Sep 15, 2023', doctor: { name: 'Dr. Sarah Alen', initials: 'SA', color: 'bg-blue-100 text-blue-600' }, status: 'Pending' as const, icon: 'glucose' as const },
    { id: 'l4', testName: 'Liver Function Test', testSubtitle: 'Enzymes & Protein Levels', date: 'Aug 22, 2023', doctor: { name: 'Dr. Michael Khan', initials: 'MK', color: 'bg-emerald-100 text-emerald-600' }, status: 'Finalized' as const, icon: 'liver' as const },
];

const createMockRadiology = () => [
    { id: 'r1', scanType: 'Chest X-Ray', date: 'Oct 24, 2023', doctor: 'Dr. Michael Khan', icon: 'xray' as const, isUrgent: false },
    { id: 'r2', scanType: 'Brain MRI', date: 'Sep 15, 2023', doctor: 'Dr. Sarah Alen', icon: 'mri' as const, isUrgent: false },
    { id: 'r3', scanType: 'Abdominal CT', date: 'Aug 30, 2023', doctor: 'Dr. Michael Khan', icon: 'ct' as const, isUrgent: false },
    { id: 'r4', scanType: 'Pelvic Ultrasound', date: 'Jul 22, 2023', doctor: 'Dr. Sarah Alen', icon: 'ultrasound' as const, isUrgent: false },
    { id: 'r5', scanType: 'Emergency Chest CT', date: 'Jun 10, 2023', doctor: 'Dr. Michael Khan', icon: 'emergency' as const, isUrgent: true },
];

const createMockPrescriptions = (): Prescription[] => [
    { id: 'px1', doctor: { name: 'Dr. Michael Khan', specialty: 'Cardiology', initials: 'MK', color: 'bg-blue-100 text-blue-600' }, date: 'Oct 24, 2023', medicationCount: 3, hasAlert: false },
    { id: 'px2', doctor: { name: 'Dr. Sarah Alen', specialty: 'Endocrinology', initials: 'SA', color: 'bg-emerald-100 text-emerald-600' }, date: 'Oct 12, 2023', medicationCount: 1, hasAlert: false },
    { id: 'px3', doctor: { name: 'Dr. James Wong', specialty: 'Internal Medicine', initials: 'JW', color: 'bg-amber-100 text-amber-600' }, date: 'Sep 30, 2023', medicationCount: 4, hasAlert: false },
    { id: 'px4', doctor: { name: 'Dr. Emily Myers', specialty: 'Emergency Unit', initials: 'EM', color: 'bg-red-100 text-red-600' }, date: 'Sep 15, 2023', medicationCount: 2, hasAlert: true },
    { id: 'px5', doctor: { name: 'Dr. Sarah Alen', specialty: 'Endocrinology', initials: 'SA', color: 'bg-emerald-100 text-emerald-600' }, date: 'Aug 20, 2023', medicationCount: 2, hasAlert: false },
    { id: 'px6', doctor: { name: 'Dr. Michael Khan', specialty: 'Cardiology', initials: 'MK', color: 'bg-blue-100 text-blue-600' }, date: 'Jul 10, 2023', medicationCount: 3, hasAlert: false },
];

// ====================================================================
//                          MOCK PATIENT DATA
// ====================================================================
const mockPatientData: Record<string, PatientProfile> = {
    '1': {
        id: '1', name: 'Sara Magdy', nameArabic: 'ساره مجدي محمد', patientId: 'P-88204-X',
        gender: 'Female', age: 42, dateOfBirth: '14 May 1982', nationalId: 'XXX-XX-2343',
        phone: '+1 (555) 334-8726', email: 'A.sara@host.com',
        address: '256 Oah Valley rd, Apartment 12B, Springfield, IL',
        city: 'Muscat', country: 'Oman', bloodType: 'O Positive',
        primaryLanguage: 'Arabic, English', insuranceType: 'Axa Gold Care',
        status: 'Active', lastVisit: '12 Oct 2023', upcomingAppointment: 'Feb 15, 2024',
        nextOfKin: { name: 'Fatima Al-Farsi', relationship: 'Spouse', phone: '+968 9876 5432' },
        allergies: ['Penicillin', 'Dust Mites'],
        chronicDiseases: [
            { name: 'Type 2 Diabetes', diagnosedDate: 'May 2019', status: 'Controlled' },
            { name: 'Hypertension', diagnosedDate: 'Feb 2021', status: 'Managed' },
        ],
        medications: [
            { name: 'Metformin 500mg', dosage: '500mg', frequency: '1 tablet daily', route: 'Oral' },
            { name: 'Lisinopril 10mg', dosage: '10mg', frequency: '1 tablet daily', route: 'Oral' },
        ],
        visits: createMockVisits(), 
        visitStats: { totalVisits: 24, totalVisitsChange: '+12%', departments: 6, departmentsLabel: 'Across Ward 4B', avgVisitTime: '45m', avgVisitTimeLabel: 'Standard Patient Care' },
        labResults: createMockLabResults(), vitals: { heartRate: 74, heartRateStatus: 'Stable', heartRateHistory: [68, 72, 70, 74, 78, 74, 71] },
        radiology: createMockRadiology(), 
        radiologySummary: { totalScans: 12, activeReports: 4, pendingReview: 1, nextScan: { type: 'Chest X-Ray', date: 'Nov 12, 2023 at 09:30 AM' } },
        prescriptions: createMockPrescriptions(),
        prescriptionSummary: { totalPrescriptions: 12, activeTreatmentNote: 'Patient is currently on a monitored hypertension plan. Next follow-up required in 14 days.', recentNote: '"Patient reports improved sleep since dosage adjustment..."' },
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
    '2': {
        id: '2', name: 'Sara Magdy', nameArabic: 'ساره مجدي', patientId: 'P-88205-X',
        gender: 'Female', age: 32, dateOfBirth: '03 Mar 1992', nationalId: 'XXX-XX-3422',
        phone: '+1 (555) 234-5678', email: 'sara.magdy2@email.com', address: '456 Oak Ave',
        city: 'Springfield', country: 'Egypt', bloodType: 'B+', primaryLanguage: 'Arabic', insuranceType: 'Self Pay',
        status: 'Active', lastVisit: 'Jan 12, 2024', upcomingAppointment: '-',
        nextOfKin: { name: 'Mohamed Ali', relationship: 'Father', phone: '+1 (555) 111-2222' },
        allergies: [], chronicDiseases: [], medications: [],
        visits: createMockVisits().slice(0, 2), visitStats: { totalVisits: 5, totalVisitsChange: '+5%', departments: 2, departmentsLabel: 'Across Ward 2A', avgVisitTime: '30m', avgVisitTimeLabel: 'Standard Patient Care' },
        labResults: createMockLabResults().slice(0, 2), vitals: { heartRate: 68, heartRateStatus: 'Stable', heartRateHistory: [65, 68, 66, 68, 70, 68, 67] },
        radiology: createMockRadiology().slice(0, 2), radiologySummary: { totalScans: 3, activeReports: 1, pendingReview: 0, nextScan: { type: 'Brain MRI', date: 'Dec 05, 2023 at 10:00 AM' } },
        prescriptions: createMockPrescriptions().slice(0, 2),
        prescriptionSummary: { totalPrescriptions: 4, activeTreatmentNote: 'Routine monitoring. No active treatment plan.', recentNote: '"Stable condition, continue current medication..."' },
        avatar: 'https://i.pravatar.cc/150?img=9',
    },
    '3': {
        id: '3', name: 'Sara Magdy', nameArabic: 'ساره مجدي', patientId: 'P-88206-X',
        gender: 'Female', age: 32, dateOfBirth: '15 Mar 1992', nationalId: 'XXX-XX-3422',
        phone: '+1 (555) 234-5678', email: 'sara.magdy3@email.com', address: '789 Elm St',
        city: 'Springfield', country: 'Egypt', bloodType: 'O+', primaryLanguage: 'Arabic, French', insuranceType: 'Government Insurance',
        status: 'Disabled', lastVisit: 'Jan 12, 2024', upcomingAppointment: 'Feb 15, 2024',
        nextOfKin: { name: 'Fatma Hassan', relationship: 'Mother', phone: '+1 (555) 333-4444' },
        allergies: ['Sulfa Drugs'],
        chronicDiseases: [{ name: 'Hypertension', diagnosedDate: 'Jan 2020', status: 'Managed' }, { name: 'Asthma', diagnosedDate: 'Mar 2018', status: 'Controlled' }],
        medications: [{ name: 'Lisinopril 10mg', dosage: '10mg', frequency: '1 tablet daily', route: 'Oral' }, { name: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', route: 'Inhalation' }],
        visits: createMockVisits().slice(0, 3), visitStats: { totalVisits: 12, totalVisitsChange: '+8%', departments: 4, departmentsLabel: 'Across Ward 3C', avgVisitTime: '35m', avgVisitTimeLabel: 'Standard Patient Care' },
        labResults: createMockLabResults().slice(0, 3), vitals: { heartRate: 82, heartRateStatus: 'Elevated', heartRateHistory: [78, 80, 82, 85, 82, 80, 78] },
        radiology: createMockRadiology().slice(0, 3), radiologySummary: { totalScans: 8, activeReports: 2, pendingReview: 1, nextScan: { type: 'Chest X-Ray', date: 'Jan 20, 2024 at 11:00 AM' } },
        prescriptions: createMockPrescriptions().slice(0, 3),
        prescriptionSummary: { totalPrescriptions: 8, activeTreatmentNote: 'Asthma management plan active. Review inhaler usage in next visit.', recentNote: '"Breathing improved with adjusted inhaler schedule..."' },
        avatar: 'https://i.pravatar.cc/150?img=10',
    },
    '4': {
        id: '4', name: 'Sara Magdy', nameArabic: 'ساره مجدي', patientId: 'P-88207-X',
        gender: 'Female', age: 32, dateOfBirth: '15 Mar 1992', nationalId: 'XXX-XX-3422',
        phone: '+1 (555) 234-5678', email: 'sara.magdy4@email.com', address: '321 Pine Rd',
        city: 'Springfield', country: 'Egypt', bloodType: 'AB+', primaryLanguage: 'Arabic', insuranceType: 'Private Insurance',
        status: 'Disabled', lastVisit: 'Jan 12, 2024', upcomingAppointment: 'Feb 15, 2024',
        nextOfKin: { name: 'Ali Hassan', relationship: 'Husband', phone: '+1 (555) 555-6666' },
        allergies: ['Latex', 'Aspirin'],
        chronicDiseases: [{ name: 'Rheumatoid Arthritis', diagnosedDate: 'Jun 2022', status: 'Managed' }],
        medications: [{ name: 'Methotrexate 15mg', dosage: '15mg', frequency: '1 tablet weekly', route: 'Oral' }],
        visits: createMockVisits().slice(0, 4), visitStats: { totalVisits: 18, totalVisitsChange: '+6%', departments: 3, departmentsLabel: 'Across Ward 1A', avgVisitTime: '50m', avgVisitTimeLabel: 'Extended Care' },
        labResults: createMockLabResults(), vitals: { heartRate: 70, heartRateStatus: 'Stable', heartRateHistory: [69, 70, 72, 70, 68, 70, 71] },
        radiology: createMockRadiology().slice(0, 4), radiologySummary: { totalScans: 10, activeReports: 3, pendingReview: 0, nextScan: { type: 'Abdominal CT', date: 'Feb 01, 2024 at 02:00 PM' } },
        prescriptions: createMockPrescriptions().slice(0, 4),
        prescriptionSummary: { totalPrescriptions: 10, activeTreatmentNote: 'Rheumatoid arthritis under management. Weekly methotrexate continuing.', recentNote: '"Joint stiffness reduced, maintain current dosage..."' },
        avatar: 'https://i.pravatar.cc/150?img=12',
    },
    '5': {
        id: '5', name: 'Sara Magdy', nameArabic: 'ساره مجدي', patientId: 'P-88208-X',
        gender: 'Female', age: 32, dateOfBirth: '15 Mar 1992', nationalId: 'XXX-XX-3422',
        phone: '+1 (555) 234-5678', email: 'sara.magdy5@email.com', address: '654 Cedar Ln',
        city: 'Springfield', country: 'Egypt', bloodType: 'A-', primaryLanguage: 'English', insuranceType: 'Self Pay',
        status: 'Active', lastVisit: 'Jan 12, 2024', upcomingAppointment: 'Feb 15, 2024',
        nextOfKin: { name: 'Nour Magdy', relationship: 'Sister', phone: '+1 (555) 777-8888' },
        allergies: ['Shellfish'], chronicDiseases: [], medications: [],
        visits: createMockVisits().slice(0, 1), visitStats: { totalVisits: 3, totalVisitsChange: '+2%', departments: 1, departmentsLabel: 'Ward 2B', avgVisitTime: '25m', avgVisitTimeLabel: 'Quick Consultation' },
        labResults: createMockLabResults().slice(0, 1), vitals: { heartRate: 66, heartRateStatus: 'Stable', heartRateHistory: [64, 66, 65, 66, 68, 66, 65] },
        radiology: createMockRadiology().slice(0, 1), radiologySummary: { totalScans: 2, activeReports: 1, pendingReview: 0, nextScan: { type: 'Chest X-Ray', date: 'Mar 10, 2024 at 09:00 AM' } },
        prescriptions: createMockPrescriptions().slice(0, 1),
        prescriptionSummary: { totalPrescriptions: 2, activeTreatmentNote: 'No active treatment plan.', recentNote: '"General check-up, all vitals normal..."' },
        avatar: 'https://i.pravatar.cc/150?img=16',
    },
};

// ====================================================================
//                          TAB CONFIG
// ====================================================================
type TabKey = 'personal' | 'medical' | 'visits' | 'lab' | 'radiology' | 'prescriptions';
const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'personal', label: 'Personal Info', icon: <UserRound size={16} /> },
    { key: 'medical', label: 'Medical Info', icon: <Heart size={16} /> },
    { key: 'visits', label: 'Visits', icon: <Calendar size={16} /> },
    { key: 'lab', label: 'Lab Results', icon: <FlaskConical size={16} /> },
    { key: 'radiology', label: 'Radiology', icon: <Radiation size={16} /> },
    { key: 'prescriptions', label: 'Prescriptions', icon: <Pill size={16} /> },
];

// ====================================================================
//                    SHARED HELPERS
// ====================================================================
const InfoField = ({ label, value, labelColor = 'text-blue-500' }: { label: string; value: string; labelColor?: string }) => (<div><p className={`text-xs font-bold ${labelColor} mb-1.5`}>{label}</p><p className="text-[15px] font-bold text-slate-900">{value}</p></div>);
const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (<div className="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6"><div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">{icon}</div><h3 className="text-lg font-extrabold text-slate-900">{title}</h3></div>);
const BriefRow = ({ label, value, valueColor = 'text-slate-900' }: { label: string; value: string; valueColor?: string }) => (<div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{label}</span><span className={`text-sm font-bold ${valueColor}`}>{value}</span></div>);
const MedicalDataItem = ({ icon, iconBg, iconColor, label, value }: { icon: React.ReactNode; iconBg: string; iconColor: string; label: string; value: string }) => (<div className="flex items-center gap-4"><div className={`w-10 h-10 ${iconBg} ${iconColor} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div><div><p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-0.5">{label}</p><p className="text-sm font-bold text-slate-900">{value}</p></div></div>);
const QuickActionCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => (<button className="flex flex-col items-center justify-center gap-3 bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"><div className="text-slate-400 group-hover:text-blue-500 transition-colors">{icon}</div><span className="text-[10px] font-black tracking-widest text-slate-500 uppercase group-hover:text-blue-600 transition-colors">{label}</span></button>);

// ====================================================================
//                    TAB: PERSONAL INFO
// ====================================================================
const PersonalInfoTab = ({ patient }: { patient: PatientProfile }) => (
    <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                <SectionHeader icon={<ClipboardList size={18} />} title="Personal Identification" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <InfoField label="Full Name" value={patient.name} /><InfoField label="Full Name Arabic" value={patient.nameArabic} />
                    <InfoField label="National ID" value={patient.nationalId} /><InfoField label="Date Of Birth" value={patient.dateOfBirth} />
                    <InfoField label="Gender" value={patient.gender} /><InfoField label="Phone Number" value={patient.phone} />
                    <div className="md:col-span-2"><InfoField label="Email Address" value={patient.email} /></div>
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                <SectionHeader icon={<Building2 size={18} />} title="Contact & Address" />
                <div className="space-y-6"><InfoField label="Address" value={patient.address} /><div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"><InfoField label="City" value={patient.city} /><InfoField label="Country" value={patient.country} /></div></div>
            </div>
        </div>
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
            <div className="bg-[#f5ebe0] rounded-2xl p-6 border border-[#e6d5c3]">
                <div className="flex items-center gap-3 mb-6"><div className="w-9 h-9 bg-[#d4a574] text-white rounded-lg flex items-center justify-center shrink-0"><UserRound size={18} /></div><h3 className="text-lg font-extrabold text-slate-900">Next of Kin</h3></div>
                <div className="space-y-5">
                    <div><p className="text-[11px] font-black tracking-widest text-[#8b7355] uppercase mb-1">CONTACT NAME</p><p className="text-base font-bold text-slate-900">{patient.nextOfKin.name}</p></div>
                    <div><p className="text-[11px] font-black tracking-widest text-[#8b7355] uppercase mb-1">RELATIONSHIP</p><p className="text-base font-bold text-slate-900">{patient.nextOfKin.relationship}</p></div>
                    <div><p className="text-[11px] font-black tracking-widest text-[#8b7355] uppercase mb-1">PHONE NUMBER</p><div className="flex items-center gap-2"><p className="text-base font-bold text-blue-600">{patient.nextOfKin.phone}</p><div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Phone size={14} /></div></div></div>
                </div>
            </div>
            <div className="bg-[#f0f4f8] rounded-2xl p-6 border border-slate-200">
                <h3 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-5">PATIENT BRIEF</h3>
                <div className="space-y-4"><BriefRow label="Blood Type" value={patient.bloodType} valueColor="text-blue-600" /><BriefRow label="Primary Language" value={patient.primaryLanguage} /><BriefRow label="Insurance" value={patient.insuranceType} /><BriefRow label="Last Visit" value={patient.lastVisit} valueColor="text-blue-600" /></div>
            </div>
        </div>
    </div>
);

// ====================================================================
//                    TAB: MEDICAL INFO
// ====================================================================
const MedicalInfoTab = ({ patient }: { patient: PatientProfile }) => (
    <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[280px] shrink-0 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-6">BASIC MEDICAL DATA</h3>
                <div className="space-y-5">
                    <MedicalDataItem icon={<Droplets size={18} />} iconBg="bg-red-50" iconColor="text-red-500" label="BLOOD TYPE" value={patient.bloodType} />
                    <MedicalDataItem icon={<ShieldCheck size={18} />} iconBg="bg-blue-50" iconColor="text-blue-500" label="INSURANCE TYPE" value={patient.insuranceType} />
                    <MedicalDataItem icon={<Languages size={18} />} iconBg="bg-blue-50" iconColor="text-blue-500" label="PRIMARY LANGUAGE" value={patient.primaryLanguage} />
                    <MedicalDataItem icon={<History size={18} />} iconBg="bg-blue-50" iconColor="text-blue-500" label="LAST VISIT" value={patient.lastVisit} />
                </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div><div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full"></div>
                <h4 className="text-base font-extrabold mb-2 relative z-10">Precision Monitoring</h4><p className="text-sm text-emerald-100 font-medium leading-relaxed relative z-10">Next routine check-up suggested for November 2024 based on chronic history.</p>
            </div>
        </div>
        <div className="flex-1"><div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-8"><h3 className="text-lg font-extrabold text-slate-900 tracking-tight">CLINICAL SUMMARY</h3><button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"><History size={14} />View History</button></div>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1"><div className="flex items-center gap-2 mb-4"><Pill size={16} className="text-blue-600" /><h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">CURRENT MEDICATIONS</h4></div><div className="space-y-3">{patient.medications.length > 0 ? patient.medications.map((m, i) => (<div key={i} className="bg-slate-800 rounded-xl px-5 py-4 text-white"><p className="text-sm font-bold mb-1">{m.name}</p><p className="text-xs text-slate-400 font-medium">{m.frequency} • {m.route}</p></div>)) : (<div className="bg-slate-50 rounded-xl px-5 py-4 border border-slate-100"><p className="text-sm text-slate-400">No current medications</p></div>)}</div></div>
                <div className="md:w-[200px] shrink-0"><div className="flex items-center gap-2 mb-4"><AlertTriangle size={16} className="text-red-500" /><h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">ALLERGIES</h4></div>{patient.allergies.length > 0 ? (<div className="flex flex-wrap gap-2">{patient.allergies.map((a, i) => (<span key={i} className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3.5 py-2 rounded-full text-sm font-bold border border-red-100"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>{a}</span>))}</div>) : (<p className="text-sm text-slate-400">No known allergies</p>)}</div>
            </div>
            <div className="mb-8"><h4 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-4">CHRONIC DISEASES</h4>{patient.chronicDiseases.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{patient.chronicDiseases.map((d, i) => (<div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 hover:border-blue-200 transition-colors"><div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><Activity size={18} /></div><div><p className="text-sm font-bold text-slate-900 mb-1">{d.name}</p><p className="text-xs text-slate-400 font-medium">Diagnosed {d.diagnosedDate} • <span className={`font-bold ${d.status === 'Controlled' ? 'text-emerald-500' : d.status === 'Managed' ? 'text-blue-500' : 'text-red-500'}`}>{d.status}</span></p></div></div>))}</div>) : (<div className="bg-slate-50 rounded-xl px-5 py-4 border border-slate-100"><p className="text-sm text-slate-400">No chronic diseases</p></div>)}</div>
            <div className="grid grid-cols-3 gap-4"><QuickActionCard icon={<Syringe size={22} />} label="IMMUNIZATION" /><QuickActionCard icon={<Brain size={22} />} label="MENTAL HEALTH" /><QuickActionCard icon={<Dumbbell size={22} />} label="LIFESTYLE" /></div>
        </div></div>
    </div>
);

// ====================================================================
//                    TAB: VISITS
// ====================================================================
const VISITS_PER_PAGE = 4;
const visitStatusStyles: Record<string, string> = { 'Completed': 'bg-emerald-50 text-emerald-600 border-emerald-200', 'In Progress': 'bg-blue-50 text-blue-600 border-blue-200', 'Waiting': 'bg-amber-50 text-amber-600 border-amber-200', 'Cancelled': 'bg-red-50 text-red-600 border-red-200' };

const VisitsTab = ({ patient }: { patient: PatientProfile }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(patient.visits.length / VISITS_PER_PAGE);
    const paged = patient.visits.slice((currentPage - 1) * VISITS_PER_PAGE, currentPage * VISITS_PER_PAGE);
    return (<div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-slate-100"><h3 className="text-lg font-extrabold text-slate-900">Visit History</h3><div className="flex items-center gap-2"><button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><SlidersHorizontal size={18} /></button><button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><Download size={18} /></button></div></div>
            <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-slate-100"><th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Visit Number</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Visit Date</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Doctor</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Department</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Visit Type</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Status</th><th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Actions</th></tr></thead>
            <tbody>{paged.map((v) => (<tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"><td className="px-6 md:px-8 py-5"><span className="text-sm font-bold text-blue-600">{v.visitNumber}</span></td><td className="px-4 py-5"><p className="text-sm font-bold text-slate-900">{v.date}</p><p className="text-xs text-slate-400">{v.time}</p></td><td className="px-4 py-5"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${v.doctor.color}`}>{v.doctor.initials}</div><span className="text-sm font-bold text-slate-900 whitespace-nowrap">{v.doctor.name}</span></div></td><td className="px-4 py-5"><span className="text-sm font-medium text-slate-600">{v.department}</span></td><td className="px-4 py-5"><span className="text-sm font-medium text-slate-600">{v.visitType}</span></td><td className="px-4 py-5"><span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${visitStatusStyles[v.status] || ''}`}>{v.status}</span></td><td className="px-6 md:px-8 py-5"><button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700">View Details<ExternalLink size={14} /></button></td></tr>))}</tbody></table></div>
            <div className="px-6 md:px-8 py-4 flex items-center justify-between border-t border-slate-100"><p className="text-sm text-slate-500">Showing {paged.length} of {patient.visitStats.totalVisits} visits</p><div className="flex items-center gap-1.5"><button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30"><ChevronLeft size={16} /></button>{Array.from({ length: Math.max(totalPages, 3) }, (_, i) => i + 1).slice(0, 3).map(p => (<button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${currentPage === p ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{p}</button>))}<button onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30"><ChevronRight size={16} /></button></div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between"><div><p className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-2">TOTAL VISITS</p><p className="text-3xl font-extrabold text-slate-900">{String(patient.visitStats.totalVisits).padStart(2, '0')}</p></div><div className="flex items-center gap-1.5 text-emerald-500"><TrendingUp size={16} /><span className="text-sm font-bold">{patient.visitStats.totalVisitsChange}</span></div></div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between"><div><p className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-2">DEPARTMENTS</p><p className="text-3xl font-extrabold text-slate-900">{String(patient.visitStats.departments).padStart(2, '0')}</p></div><p className="text-xs font-bold text-slate-400 text-right max-w-[100px]">{patient.visitStats.departmentsLabel}</p></div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between"><div><p className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-2">AVG. VISIT TIME</p><p className="text-3xl font-extrabold text-slate-900">{patient.visitStats.avgVisitTime}</p></div><p className="text-xs font-bold text-slate-400 text-right max-w-[120px]">{patient.visitStats.avgVisitTimeLabel}</p></div>
        </div>
    </div>);
};

// ====================================================================
//                    TAB: LAB RESULTS
// ====================================================================
const labStatusStyles: Record<string, string> = { 'Finalized': 'bg-emerald-50 text-emerald-700 border-emerald-200', 'Review Required': 'bg-red-50 text-red-600 border-red-200', 'Pending': 'bg-slate-100 text-slate-600 border-slate-200' };
const labIconMap: Record<string, React.ReactNode> = { blood: <Droplets size={18} />, lipid: <Activity size={18} />, glucose: <FlaskConical size={18} />, liver: <Beaker size={18} /> };

const LabResultsTab = ({ patient }: { patient: PatientProfile }) => {
    const v = patient.vitals; const maxHR = Math.max(...v.heartRateHistory);
    return (<div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-slate-100"><h3 className="text-lg font-extrabold text-slate-900">Laboratory Results</h3><div className="flex items-center gap-3"><button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50"><SlidersHorizontal size={16} />Filter</button><button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700"><Download size={16} />Export All</button></div></div>
            <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-slate-100"><th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Test Name</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Date</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Doctor</th><th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Status</th><th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Action</th></tr></thead>
            <tbody>{patient.labResults.map(l => (<tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50/50"><td className="px-6 md:px-8 py-5"><div className="flex items-center gap-4"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">{labIconMap[l.icon] || <FlaskConical size={18} />}</div><div><p className="text-sm font-bold text-slate-900">{l.testName}</p><p className="text-xs text-slate-400">{l.testSubtitle}</p></div></div></td><td className="px-4 py-5"><span className="text-sm font-medium text-slate-600">{l.date}</span></td><td className="px-4 py-5"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${l.doctor.color}`}>{l.doctor.initials}</div><span className="text-sm font-bold text-slate-900 whitespace-nowrap">{l.doctor.name}</span></div></td><td className="px-4 py-5"><span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black tracking-wider uppercase border ${labStatusStyles[l.status] || ''}`}>{l.status === 'Review Required' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}{l.status}</span></td><td className="px-6 md:px-8 py-5"><button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700">View<ArrowRight size={14} /></button></td></tr>))}{patient.labResults.length === 0 && <tr><td colSpan={5} className="px-8 py-12 text-center"><p className="text-sm text-slate-400">No lab results</p></td></tr>}</tbody></table></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"><div className="flex items-center justify-between mb-4"><h4 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">PATIENT VITALS</h4><div className="flex items-center gap-1.5"><TrendingUp size={14} className="text-emerald-500" /><span className="text-xs font-bold text-emerald-500">{v.heartRateStatus}</span></div></div><div className="mb-5"><span className="text-4xl font-extrabold text-slate-900">{v.heartRate}</span><span className="text-lg font-bold text-slate-400 ml-2">BPM</span></div><div className="flex items-end gap-2 h-12">{v.heartRateHistory.map((hr, i) => (<div key={i} className={`flex-1 rounded-full ${hr === v.heartRate ? 'bg-blue-600' : 'bg-blue-200'}`} style={{ height: `${Math.max((hr / maxHR) * 48, 16)}px` }}></div>))}</div></div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden flex items-center"><div className="flex-1 relative z-10"><h4 className="text-lg font-extrabold mb-2">Automated Analysis</h4><p className="text-sm text-blue-200 font-medium leading-relaxed">AI-driven insight suggests a slight upward trend in lipid levels over the last 6 months. Recommend dietary review.</p></div><div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 ml-4 relative z-10"><Bot size={28} /></div><div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full"></div></div>
        </div>
    </div>);
};

// ====================================================================
//                    TAB: RADIOLOGY
// ====================================================================
const RADIOLOGY_PER_PAGE = 5;

const radiologyIconMap: Record<string, React.ReactNode> = {
    xray: <Bone size={18} />,
    mri: <Brain size={18} />,
    ct: <Scan size={18} />,
    ultrasound: <MonitorDot size={18} />,
    emergency: <CircleAlert size={18} />,
};

const radiologyIconBg: Record<string, string> = {
    xray: 'bg-blue-50 text-blue-600',
    mri: 'bg-purple-50 text-purple-600',
    ct: 'bg-emerald-50 text-emerald-600',
    ultrasound: 'bg-amber-50 text-amber-600',
    emergency: 'bg-red-50 text-red-600',
};

const RadiologyTab = ({ patient }: { patient: PatientProfile }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const summary = patient.radiologySummary;
    const totalPages = Math.ceil(patient.radiology.length / RADIOLOGY_PER_PAGE);
    const paged = patient.radiology.slice(
        (currentPage - 1) * RADIOLOGY_PER_PAGE,
        currentPage * RADIOLOGY_PER_PAGE
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* ===== Left Sidebar ===== */}
            <div className="w-full lg:w-[320px] shrink-0 space-y-6">
                {/* Next Scheduled Scan */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <p className="text-[11px] font-black tracking-widest text-blue-600 uppercase mb-4">
                        NEXT SCHEDULED SCAN
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <Bone size={20} />
                        </div>
                        <div>
                            <p className="text-base font-bold text-slate-900">
                                {summary.nextScan.type}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">
                                {summary.nextScan.date}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Radiology Summary */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-5">
                        RADIOLOGY SUMMARY
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Total Scans</span>
                            <span className="text-sm font-bold text-slate-900">{summary.totalScans}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Active Reports</span>
                            <span className="text-sm font-bold text-slate-900">{summary.activeReports}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Pending Review</span>
                            <span className={`text-sm font-bold ${summary.pendingReview > 0 ? 'text-red-500' : 'text-slate-900'}`}>
                                {summary.pendingReview}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Browse PACS Archive */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden cursor-pointer hover:from-slate-600 hover:to-slate-700 transition-all">
                    {/* Background image effect */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(100,150,255,0.3),transparent_70%)]"></div>
                    <div className="relative z-10 flex flex-col items-center text-center pt-4 pb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                            <MonitorDot size={24} />
                        </div>
                        <p className="text-base font-extrabold">Browse PACS Archive</p>
                    </div>
                </div>
            </div>

            {/* ===== Right Content — Radiology Reports Table ===== */}
            <div className="flex-1">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-slate-100">
                        <h3 className="text-lg font-extrabold text-slate-900">Radiology Reports</h3>
                        <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            <SlidersHorizontal size={16} />
                            FILTER
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                        Scan Type
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                        Date
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                        Doctor
                                    </th>
                                    <th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paged.map((scan) => (
                                    <tr
                                        key={scan.id}
                                        className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                                    >
                                        {/* Scan Type */}
                                        <td className="px-6 md:px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                        radiologyIconBg[scan.icon] || 'bg-slate-100 text-slate-600'
                                                    }`}
                                                >
                                                    {radiologyIconMap[scan.icon] || <Radiation size={18} />}
                                                </div>
                                                <span className="text-sm font-bold text-slate-900">
                                                    {scan.scanType}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-5">
                                            <span className="text-sm font-medium text-slate-600">
                                                {scan.date}
                                            </span>
                                        </td>

                                        {/* Doctor */}
                                        <td className="px-4 py-5">
                                            <span className="text-sm font-medium text-slate-600">
                                                {scan.doctor}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-6 md:px-8 py-5">
                                            {scan.isUrgent ? (
                                                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors">
                                                    Urgent Review
                                                </button>
                                            ) : (
                                                <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl border border-blue-200 transition-colors">
                                                    View Report
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {patient.radiology.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-12 text-center">
                                            <p className="text-sm text-slate-400 font-medium">
                                                No radiology records available
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 md:px-8 py-4 flex items-center justify-between border-t border-slate-100">
                        <p className="text-sm text-slate-500 font-medium">
                            Showing {paged.length} of {summary.totalScans} records
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            {Array.from({ length: Math.max(totalPages, 3) }, (_, i) => i + 1)
                                .slice(0, 3)
                                .map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages || 1, p + 1))}
                                disabled={currentPage >= totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// ====================================================================
//                    TAB: PRESCRIPTIONS
// ====================================================================
const PRESCRIPTIONS_PER_PAGE = 4;

const PrescriptionsTab = ({ patient }: { patient: PatientProfile }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const summary = patient.prescriptionSummary;
    const totalPages = Math.ceil(patient.prescriptions.length / PRESCRIPTIONS_PER_PAGE);
    const paged = patient.prescriptions.slice(
        (currentPage - 1) * PRESCRIPTIONS_PER_PAGE,
        currentPage * PRESCRIPTIONS_PER_PAGE
    );

    return (
        <div className="space-y-6">
            {/* ===== Prescription History Table ===== */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-slate-100">
                    <h3 className="text-lg font-extrabold text-slate-900">
                        Prescription History
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                        <span className="text-lg leading-none">+</span>
                        New Prescription
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                    Doctor
                                </th>
                                <th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                    Date
                                </th>
                                <th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                    Medications
                                </th>
                                <th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map((rx) => (
                                <tr
                                    key={rx.id}
                                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                                >
                                    {/* Doctor */}
                                    <td className="px-6 md:px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${rx.doctor.color}`}
                                            >
                                                {rx.doctor.initials}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">
                                                    {rx.doctor.name}
                                                </p>
                                                <p className="text-xs text-slate-400 font-medium">
                                                    {rx.doctor.specialty}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="px-4 py-5">
                                        <span className="text-sm font-medium text-slate-600">
                                            {rx.date}
                                        </span>
                                    </td>

                                    {/* Medications */}
                                    <td className="px-4 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">
                                                {rx.medicationCount} Medication{rx.medicationCount !== 1 ? 's' : ''}
                                            </span>
                                            {rx.hasAlert && (
                                                <span className="w-2 h-2 bg-red-500 rounded-full shrink-0"></span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 md:px-8 py-5">
                                        <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                            View Details
                                            <ExternalLink size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {patient.prescriptions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center">
                                        <p className="text-sm text-slate-400 font-medium">
                                            No prescriptions available
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 md:px-8 py-4 flex items-center justify-between border-t border-slate-100">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing {paged.length} of {summary.totalPrescriptions} historical prescriptions
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {Array.from({ length: Math.max(totalPages, 3) }, (_, i) => i + 1)
                            .slice(0, 3)
                            .map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages || 1, p + 1))}
                            disabled={currentPage >= totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Bottom Info Cards ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Active Treatment */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <h4 className="text-sm font-extrabold text-emerald-600">
                            Active Treatment
                        </h4>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        {summary.activeTreatmentNote}
                    </p>
                </div>

                {/* Drug Allergies */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle size={14} className="text-red-500" />
                        <h4 className="text-sm font-extrabold text-slate-900">
                            Drug Allergies
                        </h4>
                    </div>
                    {patient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {patient.allergies.map((allergy, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 uppercase tracking-wide"
                                >
                                    {allergy}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400 font-medium">
                            No known drug allergies
                        </p>
                    )}
                </div>

                {/* Recent Notes */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText size={14} className="text-slate-500" />
                        <h4 className="text-sm font-extrabold text-slate-900">
                            Recent Notes
                        </h4>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                        {summary.recentNote}
                    </p>
                </div>
            </div>
        </div>
    );
};

// ====================================================================
//                    TAB: PLACEHOLDER
// ====================================================================
//const PlaceholderTab = ({ title }: { title: string }) => (<div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center"><div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-slate-400" /></div><h3 className="text-xl font-extrabold text-slate-900 mb-2">{title}</h3><p className="text-slate-400 font-medium">This section is coming soon.</p></div>);

// ====================================================================
//                    MAIN COMPONENT
// ====================================================================
const PatientProfileDetail = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [patient, setPatient] = useState<PatientProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabKey>('personal');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (id && mockPatientData[id]) setPatient(mockPatientData[id]);
            else setPatient(mockPatientData['1']);
            setLoading(false);
        }, 400);

            }, [id]);

    const breadcrumb: React.ReactNode = (
        <span className="text-slate-400">
            <span
                className="cursor-pointer hover:text-slate-600 transition-colors"
                onClick={() => navigate('/dashboard/users')}
            >
                User Management
            </span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-slate-900">Profile Detail</span>
        </span>
    );

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
                <div className="max-w-[1200px] mx-auto space-y-6 pb-10">
                    {/* ===== Header Card ===== */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-slate-100">
                                    <img
                                        src={patient.avatar}
                                        alt={patient.name}
                                        className="w-full h-full object-cover bg-slate-100"
                                    />
                                </div>
                                {patient.status === 'Active' && (
                                    <div className="absolute bottom-1 left-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                        {patient.name}
                                    </h1>
                                    <Badge
                                        variant={patient.status === 'Active' ? 'success' : 'default'}
                                        className="uppercase text-xs font-black tracking-wider"
                                    >
                                        {patient.status}
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-1">
                                        <span className="text-blue-500">●</span> {patient.patientId}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="text-slate-300">△</span> {patient.age} Years Old
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="text-slate-300">◎</span> {patient.city}, {patient.country}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 shrink-0">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={<ArrowLeft size={16} />}
                                    onClick={() => navigate('/dashboard/users')}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={<Pencil size={14} />}
                                    onClick={() => {
                                        // TODO: navigate to edit patient page
                                        console.log('Edit patient', patient.id);
                                    }}
                                >
                                    Edit Patient
                                </Button>
                            </div>
                        </div>

                        {/* ===== Tabs ===== */}
                        <div className="mt-6 border-t border-slate-100 pt-4">
                            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                                            activeTab === tab.key
                                                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== Tab Content ===== */}
                    {activeTab === 'personal' && <PersonalInfoTab patient={patient} />}
                    {activeTab === 'medical' && <MedicalInfoTab patient={patient} />}
                    {activeTab === 'visits' && <VisitsTab patient={patient} />}
                    {activeTab === 'lab' && <LabResultsTab patient={patient} />}
                    {activeTab === 'radiology' && <RadiologyTab patient={patient} />}
                    {activeTab === 'prescriptions' && <PrescriptionsTab patient={patient} />}
                </div>
            </div>
        </div>
    );
};

export default PatientProfileDetail;