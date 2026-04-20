import React from 'react';
import { 
    Download, 
    Share2, 
    ArrowLeft, 
    Activity,
    Thermometer,
    Wind,
    ChevronRight,
    FlaskConical,
    Radiation,
    Pill
} from 'lucide-react';
import { Button, Badge } from '../../ui';

interface VisitDetailsViewProps {
    visit: any;
    onBack: () => void;
}

const VisitDetailsView: React.FC<VisitDetailsViewProps> = ({ visit, onBack }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant={visit.status === 'Completed' ? 'success' : 'default'} className="uppercase">
                            {visit.status}
                        </Badge>
                        <span className="text-sm font-medium text-slate-500">Order #LR-882910</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {visit.visitType}
                    </h2>
                    <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 bg-slate-200 rounded-sm inline-block"></span>
                            {visit.date} • {visit.time}
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1.5 font-bold text-slate-700">
                            Dr. {visit.doctor.name.replace('Dr. ', '')}
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onBack} className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 font-extrabold shadow-none">
                        <ArrowLeft size={16} className="mr-1" />
                        Back
                    </Button>
                    <Button variant="outline" className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 font-extrabold shadow-none">
                        <Share2 size={16} className="mr-1" />
                        Share
                    </Button>
                    <Button variant="primary" className="font-extrabold shadow-sm bg-blue-700 hover:bg-blue-800 border-0">
                        <Download size={16} className="mr-1" />
                        Download PDF
                    </Button>
                </div>
            </div>

            {/* Vitals Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Blood Pressure */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[11px] font-black tracking-widest text-slate-400 uppercase">BLOOD PRESSURE</p>
                        <Activity className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-3xl font-extrabold text-slate-900">120/80</span>
                        <span className="text-sm font-bold text-slate-400 mb-1">mmHg</span>
                    </div>
                    <div className="flex gap-1 h-2">
                        <div className="flex-1 bg-blue-100 rounded-l-full rounded-r-sm"></div>
                        <div className="flex-1 bg-blue-200 rounded-sm"></div>
                        <div className="flex-1 bg-blue-600 rounded-sm scale-y-110 shadow-sm relative z-10 transition-transform"></div>
                        <div className="flex-1 bg-blue-100 rounded-r-full rounded-l-sm"></div>
                    </div>
                </div>

                {/* Heart Rate */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[11px] font-black tracking-widest text-slate-400 uppercase">HEART RATE</p>
                        <Activity className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-3xl font-extrabold text-slate-900">72</span>
                        <span className="text-sm font-bold text-slate-400 mb-1">bpm</span>
                    </div>
                    <div className="flex gap-1 h-2">
                        <div className="flex-1 bg-red-100 rounded-l-full rounded-r-sm"></div>
                        <div className="flex-1 bg-red-700 rounded-sm scale-y-110 shadow-sm relative z-10"></div>
                        <div className="flex-1 bg-red-100 rounded-sm"></div>
                        <div className="flex-1 bg-red-100 rounded-r-full rounded-l-sm"></div>
                    </div>
                </div>

                {/* Temperature */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[11px] font-black tracking-widest text-slate-400 uppercase">TEMPERATURE</p>
                        <Thermometer className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-3xl font-extrabold text-slate-900">36.8</span>
                        <span className="text-sm font-bold text-slate-400 mb-1">°C</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 italic">Normal range</p>
                </div>

                {/* SPO2 */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[11px] font-black tracking-widest text-slate-400 uppercase">SPO2</p>
                        <Wind className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-3xl font-extrabold text-slate-900">98</span>
                        <span className="text-sm font-bold text-slate-400 mb-1">%</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 italic">On room air</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Clinical Documentation */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                        <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="18" x2="14" y2="18"></line>
                        </svg>
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Clinical Documentation (SOAP)</h3>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[11px] font-black tracking-widest text-blue-600 uppercase mb-3">SUBJECTIVE</h4>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                Patient presents with mild persistent cough for the past 3 days. 
                                Reports occasional shortness of breath when climbing stairs. Denies 
                                fever, chills, or chest pain. Noted "scratchy throat" began after 
                                environmental exposure to dust during home renovation.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black tracking-widest text-blue-600 uppercase mb-3">OBJECTIVE</h4>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                General: Patient appears comfortable, in no acute distress. Respiratory:
                                Lungs clear to auscultation bilaterally. No wheezing, rales, or rhonchi.
                                ENT: Oropharynx mildly erythematous. No exudates.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black tracking-widest text-blue-600 uppercase mb-3">ASSESSMENT</h4>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                1. Acute Upper Respiratory Infection, unspecified. 2. Mild allergic
                                rhinitis exacerbated by environmental triggers.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black tracking-widest text-blue-600 uppercase mb-3">PLAN</h4>
                            <ul className="list-none space-y-3 text-slate-600 font-medium">
                                <li className="flex items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 shrink-0"></span>
                                    <span>Prescription: Amoxicillin 500mg, 1 tablet twice daily for 7 days.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 shrink-0"></span>
                                    <span>Laboratory: Order CBC to rule out elevated WBC.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 shrink-0"></span>
                                    <span>Radiology: Chest X-ray (PA & Lateral) to assess lung fields.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 shrink-0"></span>
                                    <span>Follow up in 10 days or earlier if symptoms worsen.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[360px] shrink-0 space-y-6">
                    {/* Orders & Records */}
                    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                        <h3 className="text-base font-extrabold text-slate-900 mb-5">Orders & Records</h3>
                        <div className="space-y-3">
                            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-200 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                        <FlaskConical size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">CBC with Differential</p>
                                        <p className="text-xs font-medium text-slate-400">Lab Order #4421</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500" />
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-200 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                                        <Radiation size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Chest X-Ray (PA/Lat)</p>
                                        <p className="text-xs font-medium text-slate-400">Imaging Order #5590</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-purple-500" />
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-200 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                        <Pill size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Amoxicillin 500mg</p>
                                        <p className="text-xs font-medium text-slate-400">e-Prescription Sent</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500" />
                            </div>
                        </div>
                    </div>

                    {/* Administration */}
                    <div className="bg-white rounded-2xl p-6 border-l-4 border-blue-600 shadow-sm">
                        <h3 className="text-base font-extrabold text-slate-900 mb-6">Administration</h3>
                        <div className="space-y-5">
                            <div>
                                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">ATTENDING PHYSICIAN</p>
                                <p className="text-sm font-bold text-slate-900">{visit.doctor.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">DEPARTMENT</p>
                                <p className="text-sm font-bold text-slate-900">{visit.department}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">BOOKED BY</p>
                                <p className="text-sm font-bold text-slate-900">Registration Staff (Nurse 04)</p>
                            </div>
                        </div>
                    </div>

                    {/* Next Visit Scheduled */}
                    <div className="bg-gradient-to-br from-[#0c4a6e] to-[#0284c7] rounded-2xl p-6 overflow-hidden relative shadow-md">
                        {/* Abstract background shapes */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#38bdf8]/20 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10 text-center">
                            <h4 className="text-white font-extrabold text-lg mb-1 tracking-tight">Next Visit Scheduled</h4>
                            <p className="text-[#bae6fd] text-sm font-medium mb-5">Nov 05, 2023 at 09:00 AM</p>
                            <button className="bg-white text-[#0369a1] px-5 py-2.5 rounded-xl text-sm font-black w-full hover:bg-slate-50 transition-colors shadow-sm">
                                Manage Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitDetailsView;
