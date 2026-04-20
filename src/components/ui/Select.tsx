import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
    label,
    error,
    options,
    placeholder = 'Select...',
    onChange,
    className = '',
    id,
    ...props
}) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-bold text-slate-700 ml-1"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <select
                    id={selectId}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={`
                        w-full appearance-none bg-white border
                        text-slate-500 py-3 px-4 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                        cursor-pointer font-medium transition-all
                        ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200'}
                        ${className}
                    `}
                    {...props}
                >
                    {placeholder && (
                        <option value="">{placeholder}</option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
            </div>

            {error && (
                <p className="text-xs font-medium text-red-500 ml-1">{error}</p>
            )}
        </div>
    );
};

export default Select;

//قائمة منسدلة موحدة في كل الموقع
//Dropdown موحد