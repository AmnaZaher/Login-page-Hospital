import { StandardCard } from '../shared/UIComponents';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'General Surgery', bookings: 65 },
    { name: 'ICU', bookings: 45 },
    { name: 'Oncology', bookings: 35 },
    { name: 'Pediatrics', bookings: 85 },
    { name: 'Urology', bookings: 55 },
    { name: 'Pulmonology', bookings: 40 },
    { name: 'Ophthalmology', bookings: 75 },
];

const DepartmentUsageChart = () => {
    return (
        <StandardCard className="h-[350px] flex flex-col">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 w-full">
                <h3 className="text-lg font-extrabold text-slate-900 md:pl-6">Most booked departments</h3>

                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors border border-slate-200">
                    Export PDF
                </button>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <BarChart data={data} margin={{ top: 0, right: 20, left: 20, bottom: 10 }} barSize={32}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={15} />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="bookings" fill="#020617" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </StandardCard>
    );
};

export default DepartmentUsageChart;
