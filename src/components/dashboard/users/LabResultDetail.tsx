import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { 
    ArrowLeft, 
    Share2, 
    Download, 
    FileText, 
    Calendar, 
    UserRound, 
    History,
    CalendarPlus,
    Info,
} from 'lucide-react';

interface LabResultDetailProps {
    onMenuClick: () => void;
}

const LabResultDetail: React.FC<LabResultDetailProps> = ({ onMenuClick }) => {
    const { id, labId } = useParams<{ id: string; labId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [id, labId]);

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
        <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
            <TopBar onMenuClick={onMenuClick} title={breadcrumb} />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[1200px] mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-md">
                                    HEMATOLOGY
                                </span>
                                <span className="text-sm font-medium text-slate-500">
                                    Order #LR-882910
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Complete Blood Count</h1>
                            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>Oct 12, 2023 • 09:45 AM</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <UserRound size={16} />
                                    <span>Dr. Sarah Alen</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-xl transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-xl transition-colors">
                                <Share2 size={16} />
                                Share
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors">
                                <Download size={16} />
                                Download PDF
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Column */}
                        <div className="flex-1 space-y-6">
                            {/* Parameters Table */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <h3 className="text-lg font-extrabold text-slate-900">Hematology Parameters</h3>
                                    <p className="text-sm text-slate-500">Automated cellular analysis findings</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-t border-slate-100">
                                                <th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Parameter</th>
                                                <th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Result</th>
                                                <th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Unit</th>
                                                <th className="px-4 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Reference Range</th>
                                                <th className="px-6 md:px-8 py-4 text-left text-[11px] font-black tracking-widest text-slate-400 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                                                <td className="px-6 md:px-8 py-6"><span className="text-sm font-bold text-slate-900">White Blood Cell Count</span></td>
                                                <td className="px-4 py-6"><span className="text-lg font-extrabold text-blue-600">8.4</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">x10³/µL</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">4.0 - 11.0</span></td>
                                                <td className="px-6 md:px-8 py-6"><span className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest rounded-full">Normal</span></td>
                                            </tr>
                                            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                                                <td className="px-6 md:px-8 py-6"><span className="text-sm font-bold text-slate-900">Red Blood Cell Count</span></td>
                                                <td className="px-4 py-6"><span className="text-lg font-extrabold text-slate-900">4.82</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">x10⁶/µL</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">4.50 - 5.90</span></td>
                                                <td className="px-6 md:px-8 py-6"><span className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest rounded-full">Normal</span></td>
                                            </tr>
                                            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                                                <td className="px-6 md:px-8 py-6"><span className="text-sm font-bold text-slate-900">Hemoglobin</span></td>
                                                <td className="px-4 py-6"><span className="text-lg font-extrabold text-red-500">12.1</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">g/dL</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">13.5 - 17.5</span></td>
                                                <td className="px-6 md:px-8 py-6">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-full">
                                                        Low
                                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                                                <td className="px-6 md:px-8 py-6"><span className="text-sm font-bold text-slate-900">Hematocrit</span></td>
                                                <td className="px-4 py-6"><span className="text-lg font-extrabold text-red-500">36.8</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">%</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">41.0 - 53.0</span></td>
                                                <td className="px-6 md:px-8 py-6"><span className="inline-flex px-3 py-1 bg-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-full">Low</span></td>
                                            </tr>
                                            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                                                <td className="px-6 md:px-8 py-6"><span className="text-sm font-bold text-slate-900">Platelet Count</span></td>
                                                <td className="px-4 py-6"><span className="text-lg font-extrabold text-slate-900">214</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">x10³/µL</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">150 - 450</span></td>
                                                <td className="px-6 md:px-8 py-6"><span className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest rounded-full">Normal</span></td>
                                            </tr>
                                            <tr className="border-slate-50 hover:bg-slate-50/50">
                                                <td className="px-6 md:px-8 py-6"><span className="text-sm font-bold text-slate-900">Neutrophils %</span></td>
                                                <td className="px-4 py-6"><span className="text-lg font-extrabold text-blue-600">78.2</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">%</span></td>
                                                <td className="px-4 py-6"><span className="text-sm font-medium text-slate-500">40.0 - 75.0</span></td>
                                                <td className="px-6 md:px-8 py-6"><span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-widest rounded-full">High</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Trend Chart placeholder */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-extrabold text-slate-900">Hemoglobin Trend (6 Months)</h3>
                                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5">
                                        View History
                                    </button>
                                </div>
                                <div className="flex items-end gap-2 h-[200px] border-b border-slate-100 pb-2">
                                    {/* Mocking the bars */}
                                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                                        <div className="w-full bg-[#D0E1F0] rounded-t-sm" style={{ height: '75%' }}></div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                                        <div className="w-full bg-[#D0E1F0] rounded-t-sm" style={{ height: '78%' }}></div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                                        <div className="w-full bg-[#D0E1F0] rounded-t-sm" style={{ height: '70%' }}></div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                                        <div className="w-full bg-[#D0E1F0] rounded-t-sm" style={{ height: '60%' }}></div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                                        <div className="w-full bg-[#A43B3B] rounded-t-sm" style={{ height: '40%' }}></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">MAY</span>
                                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">JUN</span>
                                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">JUL</span>
                                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">AUG</span>
                                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">SEP</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-full lg:w-[350px] shrink-0 space-y-6">
                            {/* Doctor's Interpretation */}
                            <div className="bg-white rounded-2xl border-l-[6px] border-l-blue-600 border-t border-b border-r border-[#e2e8f0] shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText className="text-blue-600" size={20} />
                                    <h3 className="text-base font-extrabold text-slate-900">Doctor's Interpretation</h3>
                                </div>
                                <p className="text-sm font-medium text-slate-600 italic leading-relaxed mb-6">
                                    "The results indicate mild microcytic anemia, likely secondary to iron deficiency. The slightly elevated Neutrophil percentage may suggest a low-grade inflammatory response. Recommend follow-up Serum Ferritin and Iron studies to confirm etiology."
                                </p>
                                <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Dr. Julian Vance" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Dr. Julian Vance</p>
                                        <p className="text-xs text-slate-400">Senior Hematologist</p>
                                    </div>
                                </div>
                            </div>

                            {/* Validation Data */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                <h3 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-5">VALIDATION DATA</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">Status</span>
                                        <span className="inline-flex px-2 py-1 bg-slate-800 text-white text-[10px] font-bold tracking-wider rounded">FINALIZED</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">Finalized Date</span>
                                        <span className="text-sm font-bold text-slate-900">Oct 14, 2023 • 14:20</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">Laboratory</span>
                                        <span className="text-sm font-bold text-slate-900">Central Clinical Lab B</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">Method</span>
                                        <span className="text-sm font-bold text-slate-900">Flow Cytometry</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-xl transition-colors">
                                    <CalendarPlus size={18} />
                                    Schedule Follow-up
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-xl transition-colors">
                                    <History size={18} />
                                    Compare with Previous
                                </button>
                            </div>

                            {/* Protocol */}
                            <div className="bg-[#eff6ff] rounded-2xl p-5 border border-[#bfdbfe]">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 text-blue-600">
                                        <Info size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-1">Clinic Protocol</h4>
                                        <p className="text-[13px] text-slate-600 leading-relaxed">
                                            Patient should avoid strenuous exercise 24 hours prior to follow-up testing.
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

export default LabResultDetail;
