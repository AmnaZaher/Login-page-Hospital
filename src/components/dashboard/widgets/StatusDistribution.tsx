import React from 'react';

const data = [
    { name: 'Scheduled', value: 45, color: '#0061BC' },
    { name: 'Completed', value: 35, color: '#ADCFFF' },
    { name: 'Cancelled', value: 12, color: '#5C6B89' },
    { name: 'No-Show', value: 8, color: '#D1DBE8' },
];

const StatusDistribution: React.FC = () => {
    const total = 142;
    const size = 180;
    const strokeWidth = 14;
    const radius = 20; 
    
    const halfStroke = strokeWidth / 2;
    const straightLength = size - strokeWidth - 2 * radius;
    const arcLength = (Math.PI * radius) / 2;
    const totalLength = 4 * straightLength + 4 * arcLength;
    
    let currentOffset = 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-8">Status Distribution</h3>
            
            <div className="flex items-center justify-between gap-6">
                {/* Legend */}
                <div className="space-y-4">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                            <div 
                                className="w-4 h-4 rounded-full flex-shrink-0" 
                                style={{ backgroundColor: item.color }}
                            />
                            <div>
                                <p className="text-xs font-bold text-slate-400 leading-tight">{item.name}</p>
                                <p className="text-base font-black text-slate-800">{item.value}%</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rounded Square Chart */}
                <div className="relative flex items-center justify-center shrink-0">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                        {/* Background / Track could be here if needed */}
                        
                        {/* Segments */}
                        {data.map((item, index) => {
                            const segmentLength = (item.value / 100) * totalLength;
                            const dashArray = `${segmentLength} ${totalLength - segmentLength}`;
                            const dashOffset = -currentOffset;
                            currentOffset += segmentLength;

                            return (
                                <rect
                                    key={index}
                                    x={halfStroke}
                                    y={halfStroke}
                                    width={size - strokeWidth}
                                    height={size - strokeWidth}
                                    rx={radius}
                                    ry={radius}
                                    fill="none"
                                    stroke={item.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={dashArray}
                                    strokeDashoffset={dashOffset}
                                    strokeLinecap="butt"
                                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                />
                            );
                        })}
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-5xl font-black text-slate-900 leading-none">{total}</span>
                        <span className="text-sm font-bold text-slate-500 tracking-[0.2em] mt-3">TOTAL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDistribution;
