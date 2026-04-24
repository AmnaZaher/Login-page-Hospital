import React from 'react';
import { ChevronDown } from 'lucide-react';

// ==================== PatientFeed ====================
interface Patient {
    name: string;
    email: string;
    avatar: string;
}

const recentPatients: Patient[] = [
    { name: 'Jenny Wilson',  email: 'w.lawson@example.com',   avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Devon Lane',   email: 'dat.roberts@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Jane Cooper',  email: 'jgraham@example.com',     avatar: 'https://i.pravatar.cc/150?img=5' },
];

export const PatientFeed: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <h3 className="text-base font-bold text-slate-900 mb-6">Recent Patients</h3>
            <div className="space-y-5 flex-1">
                {recentPatients.map((patient, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-pointer">
                        <img
                            src={patient.avatar}
                            alt={patient.name}
                            className="w-10 h-10 rounded-full object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {patient.name}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">{patient.email}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-6 text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 transition-colors">
                see all <ChevronDown size={14} />
            </button>
        </div>
    );
};

// Keep AlertStack and AppointmentSummary exported as no-ops so old imports don't break
export const AlertStack: React.FC = () => null;
export const AppointmentSummary: React.FC = () => null;