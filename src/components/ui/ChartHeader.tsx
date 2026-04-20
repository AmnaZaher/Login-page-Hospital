import React from 'react';
import { DownloadCloud } from 'lucide-react';

interface TimeFilter {
    label: string;
    value: string;
}

interface ChartHeaderProps {
    title: string;
    showExport?: boolean;
    onExport?: () => void;
    timeFilters?: TimeFilter[];
    activeFilter?: string;
    onFilterChange?: (value: string) => void;
}

const DEFAULT_FILTERS: TimeFilter[] = [
    { label: '12 Months', value: '12m' },
    { label: '6 Months', value: '6m' },
    { label: '30 Days', value: '30d' },
    { label: '7 Days', value: '7d' },
];

const ChartHeader: React.FC<ChartHeaderProps> = ({
    title,
    showExport = true,
    onExport,
    timeFilters = DEFAULT_FILTERS,
    activeFilter = '12m',
    onFilterChange,
}) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>

            {timeFilters.length > 0 && (
                <div className="flex flex-wrap items-center bg-slate-100/80 p-1 rounded-xl gap-1 md:gap-0">
                    {timeFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => onFilterChange?.(filter.value)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                activeFilter === filter.value
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            )}

            {showExport && (
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors border border-slate-200"
                >
                    <DownloadCloud size={14} />
                    Export PDF
                </button>
            )}
        </div>
    );
};

export default ChartHeader;

//component واحد لكل الهيدرات ✅