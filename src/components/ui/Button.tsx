import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-blue-600 text-white hover:bg-blue-700 shadow-[0_8px_30px_rgb(37,99,235,0.2)] active:scale-[0.98]',
    secondary:
        'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]',
    outline:
        'bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300',
    danger:
        'bg-white text-red-500 border-2 border-red-100 hover:bg-red-50',
    ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs font-bold rounded-lg',
    md: 'px-4 py-2.5 text-sm font-bold rounded-xl',
    lg: 'px-6 py-4 text-sm font-bold rounded-xl',
};

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    children,
    disabled,
    className = '',
    ...props
}) => {
    return (
        <button
            disabled={disabled || isLoading}
            className={`
                inline-flex items-center justify-center gap-2
                transition-all duration-200
                disabled:opacity-70 disabled:cursor-not-allowed
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <span className="shrink-0">{icon}</span>
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <span className="shrink-0">{icon}</span>
                    )}
                </>
            )}
        </button>
    );
};

export default Button;

//زرار موحد في كل الموقع