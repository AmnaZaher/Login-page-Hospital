import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const dataByRange: Record<string, { name: string; value: number }[]> = {
    '12 Months': [
        { name: 'Feb', value: 400 },
        { name: 'Mar', value: 300 },
        { name: 'Apr', value: 500 },
        { name: 'May', value: 200 },
        { name: 'Jun', value: 590 },
        { name: 'Jul', value: 480 },
        { name: 'Aug', value: 440 },
        { name: 'Sep', value: 650 },
        { name: 'Oct', value: 530 },
        { name: 'Nov', value: 420 },
        { name: 'Dec', value: 700 },
        { name: 'Jan', value: 600 },
    ],
    '6 Months': [
        { name: 'Aug', value: 430 },
        { name: 'Sep', value: 620 },
        { name: 'Oct', value: 510 },
        { name: 'Nov', value: 400 },
        { name: 'Dec', value: 680 },
        { name: 'Jan', value: 590 },
    ],
    '30 Days': [
        { name: 'W1', value: 120 },
        { name: 'W2', value: 200 },
        { name: 'W3', value: 150 },
        { name: 'W4', value: 220 },
    ],
    '7 Days': [
        { name: 'Mon', value: 40 },
        { name: 'Tue', value: 70 },
        { name: 'Wed', value: 55 },
        { name: 'Thu', value: 90 },
        { name: 'Fri', value: 60 },
        { name: 'Sat', value: 30 },
        { name: 'Sun', value: 50 },
    ],
};

const filters = ['12 Months', '6 Months', '30 Days', '7 Days'];

const AppointmentTrendChart: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('12 Months');
    const data = dataByRange[activeFilter];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900">Monthly appointments</h3>
                <div className="flex items-center gap-2 flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                activeFilter === f
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                        <Download size={13} />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[240px] w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="apptGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#bfdbfe" stopOpacity={0.7} />
                                <stop offset="95%" stopColor="#bfdbfe" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                fontWeight: 'bold',
                                fontSize: '13px',
                            }}
                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#apptGradient)"
                            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: '#2563eb' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AppointmentTrendChart;