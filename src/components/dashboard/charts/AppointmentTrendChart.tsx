import { StandardCard } from '../shared/UIComponents';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Feb', value: 400 },
    { name: 'Mar', value: 300 },
    { name: 'Apr', value: 500 },
    { name: 'May', value: 200 },
    { name: 'Jun', value: 600 },
    { name: 'Jul', value: 500 },
    { name: 'Aug', value: 450 },
    { name: 'Sep', value: 650 },
    { name: 'Oct', value: 500 },
    { name: 'Nov', value: 400 },
    { name: 'Dec', value: 700 },
    { name: 'Jan', value: 600 },
];

const AppointmentTrendChart = () => {
    return (
        <StandardCard className="h-[300px] flex flex-col">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h3 className="text-lg font-extrabold text-slate-900">Monthly appointments</h3>

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

            <div className="flex-1 w-full min-h-0 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#eff6ff" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#eff6ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#334155"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </StandardCard>
    );
};

export default AppointmentTrendChart;
