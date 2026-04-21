import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterConfig {
    key: string;
    label: string;
    type: 'select' | 'date' | 'dateRange';
    options?: { value: string; label: string }[];
    placeholder?: string;
    hidePlaceholder?: boolean;
}

interface TableFiltersProps {
    filters: FilterConfig[];
    values: Record<string, string>;
    onChange: (key: string, value: string) => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({
    filters,
    values,
    onChange,
}) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(filters.length, 4)} gap-4 md:gap-8`}>
            {filters.map((filter) => (
                <div key={filter.key} className={`flex flex-col gap-2 ${filter.type === 'dateRange' ? 'col-span-1 md:col-span-2' : ''}`}>
                    <label className="text-slate-500 font-bold text-sm">
                        {filter.label}
                    </label>

                    {filter.type === 'select' ? (
                        <div className="relative">
                            <select
                                value={values[filter.key] || ''}
                                onChange={(e) => onChange(filter.key, e.target.value)}
                                className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                            >
                                {!filter.hidePlaceholder && (
                                    <option value="">
                                        {filter.placeholder || `All ${filter.label}`}
                                    </option>
                                )}
                                {filter.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                        </div>
                    ) : filter.type === 'dateRange' ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={values[`${filter.key}From`] || ''}
                                onChange={(e) => onChange(`${filter.key}From`, e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                            />
                            <span className="text-slate-400 font-bold">-</span>
                            <input
                                type="date"
                                value={values[`${filter.key}To`] || ''}
                                onChange={(e) => onChange(`${filter.key}To`, e.target.value)}
                                min={values[`${filter.key}From`] || ''}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                            />
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="date"
                                value={values[filter.key] || ''}
                                onChange={(e) => onChange(filter.key, e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TableFilters;