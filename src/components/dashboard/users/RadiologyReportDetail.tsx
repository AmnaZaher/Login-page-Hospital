import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { 
    Download, 
    Share2, 
    ArrowLeft,
    Camera,
    Scan
} from 'lucide-react';
import { Badge, Button } from '../../ui';

interface RadiologyReportDetailProps {
    onMenuClick: () => void;
}

const RadiologyReportDetail: React.FC<RadiologyReportDetailProps> = ({ onMenuClick }) => {
    const { id, radiologyId } = useParams<{ id: string; radiologyId: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [id, radiologyId]);

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
                <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="success" className="uppercase px-2.5 py-1 text-[10px] font-black tracking-widest rounded-md">
                                    COMPLETED
                                </Badge>
                                <span className="text-sm font-medium text-slate-500">
                                    Order #LR-882910
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Chest X-Ray</h1>
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
                                <span>|</span>
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
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-0 font-extrabold shadow-none h-[42px] px-4 rounded-xl"
                            >
                                <ArrowLeft size={16} className="mr-1" />
                                Back
                            </Button>
                            <Button 
                                variant="outline" 
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 border-0 font-extrabold shadow-none h-[42px] px-4 rounded-xl"
                            >
                                <Share2 size={16} className="mr-1" />
                                Share
                            </Button>
                            <Button 
                                variant="primary" 
                                className="font-extrabold shadow-sm bg-blue-700 hover:bg-blue-800 border-0 h-[42px] px-4 rounded-xl"
                            >
                                <Download size={16} className="mr-1" />
                                Download PDF
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 mt-6">
                        {/* Left Side - Imaging viewer */}
                        <div className="lg:w-[500px] xl:w-[600px] shrink-0 space-y-4">
                            {/* Main Image */}
                            <div className="relative bg-slate-900 rounded-[32px] overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] shadow-sm">
                                <img 
                                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop" 
                                    alt="Chest X-Ray" 
                                    className="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100"
                                />
                                
                                {/* Image Overlay Tags */}
                                <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                                    <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white/90 text-[10px] font-black tracking-widest uppercase">
                                        MAIN VIEW: AP/LATERAL
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 lg:top-6 lg:left-0 lg:right-0 lg:flex lg:justify-center hidden">
                                   <div className="flex flex-col gap-2 opacity-50">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <div key={i} className="flex justify-center gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                                                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                                                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                                            </div>
                                        ))}
                                   </div>
                                </div>

                                {/* Viewer Controls Overlay (bottom area) */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                                    <button className="text-white hover:text-blue-200 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </button>
                                    <button className="text-white hover:text-blue-200 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </button>
                                    <div className="w-px h-4 bg-white/30 mx-1"></div>
                                    <button className="text-white hover:text-blue-200 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                                    </button>
                                    <button className="text-white hover:text-blue-200 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                                    </button>
                                    <div className="w-px h-4 bg-white/30 mx-1"></div>
                                    <button className="text-white hover:text-blue-200 transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-4 h-[100px]">
                                <div className="rounded-2xl overflow-hidden border-2 border-blue-600 bg-slate-900 cursor-pointer shadow-sm relative group">
                                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=200&auto=format&fit=crop" alt="Thumbnail AP" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="rounded-2xl overflow-hidden border-2 border-transparent hover:border-slate-300 bg-slate-900 cursor-pointer transition-colors relative group">
                                    <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=200&auto=format&fit=crop" alt="Thumbnail LAT" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="rounded-2xl bg-[#e2e8f0] border-2 border-transparent flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors text-slate-500">
                                    <Camera size={24} />
                                </div>
                                <div className="rounded-2xl bg-[#e2e8f0] border-2 border-transparent flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors text-slate-500">
                                    <Scan size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Report Information */}
                        <div className="flex-1 bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 h-fit">
                            
                            {/* Clinical Indication */}
                            <div className="mb-10">
                                <h3 className="text-[11px] font-black tracking-widest text-[#2563eb] uppercase mb-4">
                                    CLINICAL INDICATION
                                </h3>
                                <p className="text-slate-600 text-[15px] font-medium leading-[1.8]">
                                    Persistent productive cough for 3 weeks, low-grade fever, and mild shortness of breath. History of smoking. Evaluate for pneumonia or pulmonary congestion.
                                </p>
                            </div>

                            {/* Technique */}
                            <div className="mb-10">
                                <h3 className="text-[11px] font-black tracking-widest text-[#2563eb] uppercase mb-4">
                                    TECHNIQUE
                                </h3>
                                <p className="text-slate-600 text-[15px] font-medium leading-[1.8]">
                                    Posteroanterior and lateral views of the chest were obtained in the standing position using standard digital radiography protocol. No prior studies available for comparison.
                                </p>
                            </div>

                            {/* Findings */}
                            <div className="mb-10">
                                <h3 className="text-[11px] font-black tracking-widest text-[#2563eb] uppercase mb-4">
                                    FINDINGS
                                </h3>
                                <ul className="space-y-4 text-slate-600 text-[15px] font-medium leading-[1.8]">
                                    <li className="flex items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 mr-4 shrink-0"></span>
                                        <span><strong className="text-slate-800">Lungs:</strong> There is a faint patch of increased opacity in the right lower lobe, which may represent an early focal pneumonia or atelectasis.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 mr-4 shrink-0"></span>
                                        <span><strong className="text-slate-800">Heart:</strong> The cardiomediastinal silhouette is within normal limits for size and configuration. No sign of congestive failure.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 mr-4 shrink-0"></span>
                                        <span><strong className="text-slate-800">Pleural Space:</strong> No pleural effusions or pneumothorax identified. Costophrenic angles remain sharp.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Impression */}
                            <div className="bg-[#f4f8fc] rounded-2xl p-6 border-l-[3px] border-[#0284c7]">
                                <h3 className="text-[11px] font-black tracking-widest text-[#0284c7] uppercase mb-3">
                                    IMPRESSION
                                </h3>
                                <p className="text-[#0369a1] text-base font-bold leading-relaxed">
                                    Subtle right lower lobe opacity, suspicious for early-stage community-acquired pneumonia. Clinical correlation with inflammatory markers is recommended. Follow-up imaging in 4-6 weeks after antibiotic therapy to ensure resolution.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RadiologyReportDetail;
