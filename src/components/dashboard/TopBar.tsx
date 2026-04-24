import React from 'react';
import { Menu } from 'lucide-react';
import { AddUserButton } from './shared/AddUserButton';

interface TopBarProps {
    title?: React.ReactNode;
    onMenuClick: () => void;
    onAddUserClick?: (type: 'patient' | 'staff', role?: string) => void;
    onSearch?: (query: string) => void;         // kept for compatibility
    searchPlaceholder?: string;                  // kept for compatibility
    showAddUser?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
    title = 'Dashboard',
    onMenuClick,
    onAddUserClick,
    showAddUser = true,
}) => {
    return (
        <header className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10 w-full overflow-visible">
            {/* Left Side */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Mobile Menu Button */}
                <button
                    className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden shrink-0"
                    onClick={onMenuClick}
                >
                    <Menu size={24} />
                </button>

                {/* Title */}
                <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight shrink-0 truncate">
                    {title}
                </h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
                {/* Add User Button */}
                {showAddUser && onAddUserClick && (
                    <AddUserButton
                        onClick={(type, role) => {
                            onAddUserClick(type, role);
                        }}
                    />
                )}
            </div>
        </header>
    );
};

export default TopBar;