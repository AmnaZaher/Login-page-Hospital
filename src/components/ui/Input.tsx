import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    isPassword?: boolean;
    helperText?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    isPassword = false,
    helperText,
    className = '',
    id,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-bold text-slate-700 ml-1"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative group">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
                    className={`
                        w-full bg-slate-50 rounded-xl border
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white
                        transition-all font-medium text-slate-900
                        ${icon ? 'pl-11' : 'pl-4'}
                        ${isPassword ? 'pr-12' : 'pr-4'}
                        py-3.5
                        ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200'}
                        ${className}
                    `}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-xs font-medium text-red-500 ml-1">{error}</p>
            )}

            {helperText && !error && (
                <p className="text-xs font-medium text-slate-400 ml-1">{helperText}</p>
            )}
        </div>
    );
};

export default Input;

//حقل إدخال موحد في كل الموقع