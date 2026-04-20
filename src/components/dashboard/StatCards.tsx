import React from 'react';
import { Users, UserRoundCog, FileText, Calendar, FlaskConical } from 'lucide-react';
import { Card } from '../ui';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

const stats: StatItem[] = [
    { label: 'Total Patients', value: '1629', icon: Users, color: 'text-blue-600' },
    { label: 'Total Doctors', value: '278', icon: UserRoundCog, color: 'text-indigo-600' },
    { label: 'New Invoices', value: '39', icon: FileText, color: 'text-emerald-600' },
    { label: "Today's Appointments", value: '55', icon: Calendar, color: 'text-amber-500' },
    { label: 'Pending Lab / Radiology Requests', value: '100', icon: FlaskConical, color: 'text-rose-500' },
];

const StatCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, i) => (
                <Card
                    key={i}
                    className="flex flex-col relative overflow-hidden group hover:border-blue-200 transition-colors"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-bold text-slate-700 leading-tight pr-4">
                            {stat.label}
                        </h3>
                        <stat.icon size={20} strokeWidth={2.5} className={`${stat.color} opacity-80`} />
                    </div>
                    <p className="text-4xl font-extrabold text-slate-900 tracking-tight mt-auto">
                        {stat.value}
                    </p>
                    <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                        <stat.icon size={100} />
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StatCards;