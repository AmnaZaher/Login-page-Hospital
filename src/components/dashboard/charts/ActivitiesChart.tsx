import React from 'react';
import { StandardCard } from '../shared/UIComponents';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', bookings: 4000, payments: 2400, registered: 2400, alerts: 400 },
    { name: 'Feb', bookings: 3000, payments: 1398, registered: 2210, alerts: 300 },
    { name: 'Mar', bookings: 2000, payments: 9800, registered: 2290, alerts: 200 },
    { name: 'Apr', bookings: 2780, payments: 3908, registered: 2000, alerts: 100 },
    { name: 'May', bookings: 1890, payments: 4800, registered: 2181, alerts: 500 },
    { name: 'Jun', bookings: 2390, payments: 3800, registered: 2500, alerts: 600 },
    { name: 'Jul', bookings: 3490, payments: 4300, registered: 2100, alerts: 450 },
    { name: 'Aug', bookings: 4000, payments: 2400, registered: 2400, alerts: 400 },
    { name: 'Sep', bookings: 3000, payments: 1398, registered: 2210, alerts: 300 },
    { name: 'Oct', bookings: 2000, payments: 9800, registered: 2290, alerts: 200 },
    { name: 'Nov', bookings: 2780, payments: 3908, registered: 2000, alerts: 100 },
    { name: 'Dec', bookings: 1890, payments: 4800, registered: 2181, alerts: 500 },
];

const renderLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 pb-2">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                    {entry.value}
                </li>
            ))}
        </ul>
    );
};

interface ActivitiesChartProps { }

const ActivitiesChart: React.FC<ActivitiesChartProps> = () => {
    return (
        <StandardCard className="h-[450px] flex flex-col">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h3 className="text-lg font-extrabold text-slate-900">Activities</h3>

                <div className="flex flex-wrap items-center bg-slate-100/80 p-1 rounded-xl gap-1 md:gap-0">
                    {['12 Months', '6 Months', '30 Days', '7 Days'].map((filter, i) => (
                        <button
                            key={filter}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${i === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors border border-slate-200">
                    Export PDF
                </button>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={32}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                        />
                        <Legend content={renderLegend} verticalAlign="top" wrapperStyle={{ paddingBottom: '30px' }} />
                        <Bar dataKey="bookings" stackId="a" fill="#e0f2fe" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="payments" stackId="a" fill="#7dd3fc" />
                        <Bar dataKey="registered" stackId="a" fill="#0284c7" />
                        <Bar dataKey="alerts" stackId="a" fill="#082f49" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </StandardCard>
    );
};

export default ActivitiesChart;
