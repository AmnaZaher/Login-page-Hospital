import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterConfig {
    key: string;
    label: string;
    type: 'select' | 'date';
    options?: { value: string; label: string }[];
    placeholder?: string;
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
                <div key={filter.key} className="flex flex-col gap-2">
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
                                <option value="">
                                    {filter.placeholder || `All ${filter.label}`}
                                </option>
                                {filter.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="text"
                                value={values[filter.key] || ''}
                                onChange={(e) => onChange(filter.key, e.target.value)}
                                placeholder={filter.placeholder || 'mm / dd / yy'}
                                className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                            />
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TableFilters;