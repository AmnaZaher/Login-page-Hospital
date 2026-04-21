import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import {
    ArrowLeft,
    Share2,
    Download,
    Pill,
    Syringe,
    FlaskConical,
    Store,
    ClipboardCheck,
} from 'lucide-react';
import { Badge, Button } from '../../ui';

interface PrescriptionDetailProps {
    onMenuClick: () => void;
}

const PrescriptionDetail: React.FC<PrescriptionDetailProps> = ({ onMenuClick }) => {
    const { id, prescriptionId } = useParams<{ id: string; prescriptionId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [id, prescriptionId]);

    const breadcrumb = (
        <span className="text-slate-400">
            <span
                className="cursor-pointer hover:text-slate-600 transition-colors"
                onClick={() => navigate('/dashboard/users')}
            >
                User Management
            </span>
            <span className="mx-2">&rsaquo;</span>
            <span
                className="cursor-pointer hover:text-slate-600 transition-colors"
                onClick={() => navigate(`/dashboard/users/patient/${id}`)}
            >
                Profile Detail
            </span>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-slate-900">Lab Results</span>
        </span>
    );

    if (loading) {
        return (
            <div className="flex-1 flex flex-col h-full bg-slate-50">
                <TopBar onMenuClick={onMenuClick} title={breadcrumb} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">
            <TopBar onMenuClick={onMenuClick} title={breadcrumb} />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="info" className="bg-blue-100 text-blue-700 px-2.5 py-1 text-xs font-bold rounded-md">
                                    3 Medications
                                </Badge>
                                <span className="text-sm font-medium text-slate-500">
                                    Order #LR-882910
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Prescribed Medications</h1>
                            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    Oct 12, 2023 • 09:45 AM
                                </span>
                                <span>&nbsp;</span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    Dr. Michael Khan
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={() => navigate(-1)}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-0 font-bold shadow-none h-[42px] px-4 rounded-xl"
                            >
                                <ArrowLeft size={16} className="mr-1" />
                                Back
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-0 font-bold shadow-none h-[42px] px-4 rounded-xl"
                            >
                                <Share2 size={16} className="mr-1" />
                                Share
                            </Button>
                            <Button
                                variant="primary"
                                className="font-bold shadow-sm bg-blue-700 hover:bg-blue-800 border-0 h-[42px] px-4 rounded-xl"
                            >
                                <Download size={16} className="mr-1" />
                                Download PDF
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Middle Content - Medications */}
                        <div className="flex-1 space-y-6">

                            {/* Medication 1 */}
                            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                            <Pill size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-extrabold text-slate-900">Amoxicillin</h3>
                                            <p className="text-sm font-medium text-slate-500">Antibiotic / Penicillin | roup</p>
                                        </div>
                                    </div>
                                    <Badge variant="default" className="bg-slate-100 text-slate-500 uppercase tracking-widest text-[10px] font-black px-3 py-1.5 rounded-lg border-0">
                                        ACTIVE
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">DOSAGE</div>
                                        <div className="font-bold text-slate-900">500mg</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">FREQUENCY</div>
                                        <div className="font-bold text-slate-900">Twice daily</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">DURATION</div>
                                        <div className="font-bold text-slate-900">7 Days</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">ROUTE</div>
                                        <div className="font-bold text-slate-900">Oral</div>
                                    </div>
                                </div>
                            </div>

                            {/* Medication 2 */}
                            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                                            <Syringe size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-extrabold text-slate-900">Lisinopril</h3>
                                            <p className="text-sm font-medium text-slate-500">ACE Inhibitor / Blood Pressure</p>
                                        </div>
                                    </div>
                                    <Badge variant="default" className="bg-slate-200 text-slate-600 uppercase tracking-widest text-[10px] font-black px-3 py-1.5 rounded-lg border-0">
                                        RECURRING
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">DOSAGE</div>
                                        <div className="font-bold text-slate-900">10mg</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">FREQUENCY</div>
                                        <div className="font-bold text-slate-900">Once daily</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">DURATION</div>
                                        <div className="font-bold text-slate-900">30 Days</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">ROUTE</div>
                                        <div className="font-bold text-slate-900">Oral</div>
                                    </div>
                                </div>
                            </div>

                            {/* Medication 3 */}
                            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                            <FlaskConical size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-extrabold text-slate-900">Ibuprofen</h3>
                                            <p className="text-sm font-medium text-slate-500">NSAID / Pain Relief</p>
                                        </div>
                                    </div>
                                    <Badge variant="default" className="bg-slate-200 text-slate-600 uppercase tracking-widest text-[10px] font-black px-3 py-1.5 rounded-lg border-0">
                                        AS NEEDED
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">DOSAGE</div>
                                        <div className="font-bold text-slate-900">400mg</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">FREQUENCY</div>
                                        <div className="font-bold text-slate-900">Q6H PRN</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">DURATION</div>
                                        <div className="font-bold text-slate-900">5 Days</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">ROUTE</div>
                                        <div className="font-bold text-slate-900">Oral</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar */}
                        <div className="w-full lg:w-[350px] shrink-0 space-y-6">

                            {/* Pharmacy Instructions */}
                            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
                                <div className="flex items-center gap-2 mb-4 text-slate-800">
                                    <Store size={20} className="text-blue-600" />
                                    <h3 className="font-extrabold text-[17px]">Pharmacy Instructions</h3>
                                </div>
                                <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-6">
                                    Dispense generic substitution for Amoxicillin if requested by patient. Ensure patient is advised to take full course even if symptoms subside.
                                </p>
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                    <h4 className="text-[10px] font-black tracking-widest text-blue-600 uppercase mb-2">REFILL INFORMATION</h4>
                                    <p className="text-sm font-bold text-slate-800">
                                        2 Refills allowed for Lisinopril. Expires in 6 months.
                                    </p>
                                </div>
                            </div>

                            {/* Dispensing Status */}
                            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50">
                                <div className="flex items-center gap-2 mb-6 text-slate-800">
                                    <ClipboardCheck size={20} className="text-blue-600" />
                                    <h3 className="font-extrabold text-[17px]">Dispensing Status</h3>
                                </div>

                                <div className="relative pl-6 space-y-8">
                                    {/* Timeline line */}
                                    <div className="absolute top-2.5 bottom-2.5 left-2 w-0.5 bg-slate-100"></div>

                                    {/* Step 1 */}
                                    <div className="relative">
                                        <div className="absolute -left-[27px] top-1.5 w-3 h-3 bg-blue-600 rounded-full border-4 border-white z-10 box-content"></div>
                                        <div>
                                            <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">PRESCRIBED</p>
                                            <p className="text-sm font-bold text-slate-900">Oct 24, 09:15 AM</p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative">
                                        <div className="absolute -left-[27px] top-1.5 w-3 h-3 bg-blue-600 rounded-full border-4 border-white z-10 box-content"></div>
                                        <div>
                                            <p className="text-[11px] font-black tracking-widest text-slate-500 uppercase">VERIFIED BY DR.</p>
                                            <p className="text-sm font-bold text-slate-900">Oct 24, 10:30 AM</p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[27px] top-1.5 w-3 h-3 bg-slate-200 rounded-full border-4 border-white z-10 box-content"></div>
                                        <div>
                                            <p className="text-[11px] font-black tracking-widest text-slate-400 uppercase">SENT TO PHARMACY</p>
                                            <p className="text-sm font-bold text-slate-500">Pending...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Interaction Alert */}
                            <div className="bg-[#fef2f2] rounded-[24px] p-6 border border-[#fee2e2]">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-black">!</span>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black tracking-widest text-red-900 uppercase mb-2 mt-0.5">INTERACTION ALERT</h4>
                                        <p className="text-sm font-medium text-red-900 leading-relaxed">
                                            No known contraindications with patient's existing allergy profile (Shellfish).
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionDetail;
