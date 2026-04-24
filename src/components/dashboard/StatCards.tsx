import React from 'react';
import { Users, UserRoundCog, Calendar, FlaskConical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
    label: string;
    value: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    trend: string;
    trendUp: boolean;
}

const stats: StatItem[] = [
    {
        label: 'Total Patients',
        value: '1.456',
        icon: Users,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        trend: '+6.5% Since last week',
        trendUp: true,
    },
    {
        label: 'Total Doctors',
        value: '276',
        icon: UserRoundCog,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        trend: '+0.5% Since last week',
        trendUp: true,
    },
    {
        label: "Today's Appointments",
        value: '55',
        icon: Calendar,
        iconBg: 'bg-pink-100',
        iconColor: 'text-pink-600',
        trend: '+6.5% Since last week',
        trendUp: true,
    },
    {
        label: 'Pending Lab / Radiology Requests',
        value: '100',
        icon: FlaskConical,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        trend: '-1% Since last week',
        trendUp: false,
    },
];

const StatCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500 leading-snug">{stat.label}</p>
                        <div className={`w-10 h-10 ${stat.iconBg} ${stat.iconColor} rounded-xl flex items-center justify-center shrink-0`}>
                            <stat.icon size={20} strokeWidth={2} />
                        </div>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                    <p className={`text-xs font-semibold flex items-center gap-1 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                        <span>{stat.trendUp ? '↑' : '↓'}</span>
                        {stat.trend}
                    </p>
                </div>
            ))}
        </div>
    );
};



export default StatCards;