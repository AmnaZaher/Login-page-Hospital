import React, { useState } from 'react';
import { Card, ChartHeader } from '../../ui';
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

const AppointmentTrendChart: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('12m');

    return (
        <Card className="h-[300px] flex flex-col">
            <ChartHeader
                title="Monthly appointments"
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            <div className="flex-1 w-full min-h-0 -ml-2">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
        </Card>
    );
};

export default AppointmentTrendChart;